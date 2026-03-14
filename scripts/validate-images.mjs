import { mkdir, readdir, stat, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OLLAMA_API = 'http://ai-server:11434/api/generate';
const VISION_MODEL = 'llava:latest';

// Load accessibility metadata
async function loadAccessibilityMetadata() {
  try {
    const accessibilityFile = path.join(ROOT, 'src', 'data', 'imageAccessibility.ts');
    const content = await readFile(accessibilityFile, 'utf-8');

    // Extract the metadata object using regex
    const metadataMatch = content.match(/export const imageAccessibilityMetadata[\s\S]*?= \{([\s\S]*?)\n\};/);

    if (!metadataMatch) {
      console.warn('⚠️  Could not parse accessibility metadata');
      return {};
    }

    const metadata = {};
    const entries = content.match(/"([^"]+)":\s*\{[^}]*altText:\s*"([^"]*)"[^}]*\}/g) || [];

    entries.forEach(entry => {
      const idMatch = entry.match(/"([^"]+)"/);
      const altMatch = entry.match(/altText:\s*"([^"]*)"/);
      if (idMatch && altMatch) {
        metadata[idMatch[1]] = {
          altText: altMatch[1]
        };
      }
    });

    return metadata;
  } catch (error) {
    console.warn('⚠️  Error loading accessibility metadata:', error.message);
    return {};
  }
}

// Analyze image with AI
async function analyzeImageWithAI(imagePath, imageName) {
  try {
    const imageBuffer = await readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VISION_MODEL,
        prompt: 'Describe what you see in this image in 2-3 sentences. Focus on people, objects, and context.',
        images: [base64Image],
        stream: false,
        timeout: 60000
      })
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }

    const data = await response.json();
    return {
      success: true,
      description: data.response || data.message || 'No description generated'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Validate image file integrity
async function validateImage(filePath) {
  try {
    const stats = await stat(filePath);

    // Check file size (images should be > 1KB)
    if (stats.size < 1024) {
      return {
        isValid: false,
        reason: 'File too small',
        size: stats.size
      };
    }

    // Read first few bytes to check magic numbers (file signature)
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 12);
    fs.closeSync(fd);

    const hex = buffer.toString('hex').substring(0, 8);

    // Check for common image formats
    const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
    const isPng = buffer.toString('hex').startsWith('89504e47');
    const isWebp = buffer.toString('ascii', 0, 4) === 'RIFF' &&
                   buffer.toString('ascii', 8, 12) === 'WEBP';
    const isGif = buffer.toString('ascii', 0, 3) === 'GIF';

    if (!isJpeg && !isPng && !isWebp && !isGif) {
      return {
        isValid: false,
        reason: 'Invalid image format (magic bytes)',
        detected: hex
      };
    }

    return {
      isValid: true,
      size: stats.size,
      format: isJpeg ? 'JPEG' : isPng ? 'PNG' : isWebp ? 'WebP' : 'GIF',
      modified: stats.mtime
    };
  } catch (error) {
    return {
      isValid: false,
      reason: error.message
    };
  }
}

// Validate all images
async function validateAllImages() {
  console.log('🔍 Validating images...\n');

  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
    const metadata = await loadAccessibilityMetadata();

    console.log(`📊 Found ${imageFiles.length} image files\n`);

    let validCount = 0;
    let invalidCount = 0;
    let aiAnalysisCount = 0;
    const issues = [];
    let totalSize = 0;

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const validation = await validateImage(filePath);

      // Get image ID (filename without extension)
      const imageId = path.parse(file).name;
      const expectedAltText = metadata[imageId]?.altText;

      if (validation.isValid) {
        console.log(`✅ ${file}: ${validation.format} (${(validation.size / 1024).toFixed(1)}KB)`);
        validCount++;
        totalSize += validation.size;

        // Analyze with AI if alt text exists
        if (expectedAltText && process.argv.includes('--analyze')) {
          console.log(`   🤖 Analyzing with AI...`);
          const analysis = await analyzeImageWithAI(filePath, file);

          if (analysis.success) {
            aiAnalysisCount++;
            console.log(`   📝 AI Description: ${analysis.description.substring(0, 100)}...`);
            console.log(`   📌 Expected Alt: ${expectedAltText.substring(0, 100)}...`);
          } else {
            console.log(`   ⚠️  AI Analysis failed: ${analysis.error}`);
          }
        }
      } else {
        console.log(`❌ ${file}: ${validation.reason}`);
        invalidCount++;
        issues.push({ file, ...validation });
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Valid: ${validCount}`);
    console.log(`❌ Invalid: ${invalidCount}`);
    console.log(`🤖 AI Analysis: ${aiAnalysisCount} images`);
    console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

    if (issues.length > 0) {
      console.log('\n⚠️  Issues found:');
      issues.forEach(({ file, reason, size, detected }) => {
        console.log(`\n  File: ${file}`);
        console.log(`  Reason: ${reason}`);
        if (size !== undefined) console.log(`  Size: ${size} bytes`);
        if (detected) console.log(`  Magic bytes: ${detected}`);
      });

      console.log('\n🔄 To re-download problematic images:');
      console.log('   node scripts/download-images-duckduckgo.mjs --force');
    }

    if (process.argv.includes('--analyze')) {
      console.log('\n💡 To analyze all images with AI:');
      console.log('   node scripts/validate-images.mjs analyze');
    }

  } catch (error) {
    console.error('❌ Error reading images directory:', error.message);
  }
}

// Analyze images with AI
async function analyzeImagesWithAI() {
  console.log('🤖 Analyzing images with AI Vision Model...\n');
  console.log(`📡 Connecting to: ${OLLAMA_API}`);
  console.log(`🔍 Using model: ${VISION_MODEL}\n`);

  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
    const metadata = await loadAccessibilityMetadata();

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const imageId = path.parse(file).name;
      const expectedAltText = metadata[imageId]?.altText;

      console.log(`\n📸 Analyzing: ${file}`);
      const analysis = await analyzeImageWithAI(filePath, file);

      if (analysis.success) {
        console.log(`✅ AI Description:\n   ${analysis.description}`);

        if (expectedAltText) {
          console.log(`\n📌 Expected Alt Text:\n   ${expectedAltText}`);
          console.log('\n---');
        }
      } else {
        console.log(`❌ Analysis failed: ${analysis.error}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Get image statistics
async function getImageStats() {
  console.log('📈 Image Statistics\n');

  try {
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

    const formatCount = {};
    let totalSize = 0;
    const largestImage = { name: '', size: 0 };
    const smallestImage = { name: imageFiles[0] || '', size: Infinity };

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const stats = await stat(filePath);

      const ext = path.extname(file).substring(1).toUpperCase();
      formatCount[ext] = (formatCount[ext] || 0) + 1;
      totalSize += stats.size;

      if (stats.size > largestImage.size) {
        largestImage.name = file;
        largestImage.size = stats.size;
      }

      if (stats.size < smallestImage.size) {
        smallestImage.name = file;
        smallestImage.size = stats.size;
      }
    }

    console.log(`📁 Total images: ${imageFiles.length}`);
    console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📊 Average size: ${(totalSize / imageFiles.length / 1024).toFixed(1)}KB\n`);

    console.log('📋 Format breakdown:');
    Object.entries(formatCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([format, count]) => {
        console.log(`   ${format}: ${count} files`);
      });

    console.log(`\n📏 Size comparison:`);
    console.log(`   Largest: ${largestImage.name} (${(largestImage.size / 1024).toFixed(1)}KB)`);
    console.log(`   Smallest: ${smallestImage.name} (${(smallestImage.size / 1024).toFixed(1)}KB)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// CLI
const args = process.argv.slice(2);
const command = args[0] || 'validate';

switch (command) {
  case 'validate':
    validateAllImages();
    break;
  case 'stats':
    getImageStats();
    break;
  case 'analyze':
    analyzeImagesWithAI();
    break;
  case 'all':
    (async () => {
      await validateAllImages();
      console.log('\n' + '='.repeat(50) + '\n');
      await getImageStats();
    })();
    break;
  default:
    console.log('Usage: node validate-images.mjs [command]');
    console.log('Commands:');
    console.log('  validate   - Validate image integrity (default)');
    console.log('  stats      - Show image statistics');
    console.log('  analyze    - Analyze images with AI Vision Model');
    console.log('  all        - Run validate and stats');
}
