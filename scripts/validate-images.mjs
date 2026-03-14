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
const EVAL_MODEL = 'glm-4.7-flash:latest';
const GEMMA_MODEL = 'gemma3:latest';

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
        // ask model to return strict JSON with description and isPerson
        prompt: 'Describe what you see in this image in 2-3 sentences. Focus on people, objects, and context. Return ONLY a JSON object with two fields: description (string) and isPerson (true/false). Example: {"description": "a man sitting on a bench in a park with a dog", "isPerson": true}. If the image does NOT contain a person, set isPerson to false and description should describe what is visible.',
        images: [base64Image],
        stream: false,
        timeout: 60000
      })
    });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    const raw = data.response || data.message || '';

    // try parse JSON from model output
    try {
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
        const parsed = JSON.parse(jsonStr);
        return { success: true, description: parsed.description || '', isPerson: !!parsed.isPerson };
      }
    } catch (e) {
      // fallthrough to return raw as description
    }

    return { success: true, description: raw, isPerson: null };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Update the altText in src/data/imageAccessibility.ts for a given imageId
function updateAccessibilityAlt(imageId, newAlt) {
  try {
    const accessibilityFile = path.join(ROOT, 'src', 'data', 'imageAccessibility.ts');
    let content = fs.readFileSync(accessibilityFile, 'utf8');

    // Attempt to replace existing altText for the imageId
    const keyRegex = new RegExp(`("${imageId}"\s*:\s*\{[\s\S]*?altText:\s*")([^"]*)("[\s\S]*?\})`);
    if (keyRegex.test(content)) {
      content = content.replace(keyRegex, (m, p1, p2, p3) => `${p1}${newAlt.replace(/"/g, '\\"')}${p3}`);
      fs.writeFileSync(accessibilityFile, content, 'utf8');
      return true;
    }

    // If key not found, try to insert it before the closing of the exported object
    const insertPoint = content.lastIndexOf('\n};');
    if (insertPoint !== -1) {
      const insertion = `  "${imageId}": {\n    altText: "${newAlt.replace(/"/g, '\\"')}"\n  },\n`;
      content = content.slice(0, insertPoint) + insertion + content.slice(insertPoint);
      fs.writeFileSync(accessibilityFile, content, 'utf8');
      return true;
    }

    return false;
  } catch (err) {
    console.warn('⚠️ Could not update accessibility file:', err.message);
    return false;
  }
}

// Ask a text model to evaluate whether expected alt text matches the image description
async function evaluateAltWithAI(description, expectedAlt) {
  try {
    const prompt = `You are given an image description and an expected alt text. Respond ONLY with a JSON object with two fields: accurate (true/false) and reason (short string).\n\nImage description:\n"""${description.replace(/"/g, '\\"')}"""\n\nExpected alt text:\n"""${expectedAlt.replace(/"/g, '\\"')}"""\n\nDetermine if the expected alt text accurately describes the image description. Be conservative and use "accurate": true only when the alt clearly matches the description.`;

    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: GEMMA_MODEL, prompt, stream: false, timeout: 60000 })
    });

    if (!response.ok) return { success: false, error: `HTTP ${response.status}` };
    const data = await response.json();
    const raw = data.response || data.message || '';

    // Try parse JSON from model output
    let parsed = null;
    try {
      // Find first JSON substring
      const jsonStart = raw.indexOf('{');
      const jsonEnd = raw.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
        parsed = JSON.parse(jsonStr);
      }
    } catch (e) {
      parsed = null;
    }

    if (parsed && typeof parsed.accurate !== 'undefined') {
      return { success: true, accurate: !!parsed.accurate, reason: parsed.reason || '' };
    }

    // Fallback: simple heuristic
    const lower = raw.toLowerCase();
    if (lower.includes('true') || lower.includes('accurate') || lower.includes('yes')) {
      return { success: true, accurate: true, reason: raw.substring(0, 300) };
    }
    if (lower.includes('false') || lower.includes('inaccurate') || lower.includes('no')) {
      return { success: true, accurate: false, reason: raw.substring(0, 300) };
    }

    return { success: false, error: 'Could not parse model response', raw };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Simple Jaccard similarity on word sets to compare expected alt text with AI description
function isAltMatching(description, expectedAlt) {
  if (!description || !expectedAlt) return false;
  const tokenize = s => (s || '')
    .toLowerCase()
    .replace(/[\W_]+/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  const a = new Set(tokenize(description));
  const b = new Set(tokenize(expectedAlt));
  if (a.size === 0 || b.size === 0) return false;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  const union = new Set([...a, ...b]).size;
  const jaccard = intersection / union;
  return jaccard >= 0.25; // threshold
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
    const report = [];

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const validation = await validateImage(filePath);

      // Get image ID (filename without extension)
      const imageId = path.parse(file).name;
      const expectedAltText = metadata[imageId]?.altText;

      const entry = {
        file,
        imageId,
        isValid: !!validation.isValid,
        size: validation.size || 0,
        format: validation.format || null,
        reason: validation.isValid ? null : validation.reason,
        expectedAltText: expectedAltText || null,
        aiDescription: null,
        incorrect: null
      };

      if (validation.isValid) {
        console.log(`✅ ${file}: ${validation.format} (${(validation.size / 1024).toFixed(1)}KB)`);
        validCount++;
        totalSize += validation.size;

        if (expectedAltText) {
          console.log(`   🤖 Analyzing with AI to compare alt text...`);
          const analysis = await analyzeImageWithAI(filePath, file);

          if (analysis.success) {
            aiAnalysisCount++;
            entry.aiDescription = analysis.description;
            // If the vision model says the image contains a person, accept it as correct and update alt
            if (analysis.isPerson === true) {
              entry.incorrect = false;
              const updated = updateAccessibilityAlt(imageId, analysis.description);
              console.log(`   📝 AI Description: ${analysis.description.substring(0,200)}`);
              console.log(`   📌 Image detected as person — marked CORRECT` + (updated ? ' and alt updated' : ' but alt update failed'));
            } else if (analysis.isPerson === false) {
              entry.incorrect = true;
              console.log(`   📝 AI Description: ${analysis.description.substring(0,200)}`);
              console.log(`   📌 Image detected as NOT a person — marked INCORRECT`);
            } else {
              // fallback: use textual evaluation & token overlap
              const match = isAltMatching(analysis.description, expectedAltText);
              const evalRes = await evaluateAltWithAI(analysis.description, expectedAltText);
              entry.aiJudgement = evalRes.success ? { accurate: !!evalRes.accurate, reason: evalRes.reason || null } : null;
              if (entry.aiJudgement && typeof entry.aiJudgement.accurate === 'boolean') {
                entry.incorrect = !entry.aiJudgement.accurate;
              } else {
                entry.incorrect = !match;
              }
              console.log(`   📝 AI Description: ${analysis.description.substring(0,200)}`);
              if (entry.aiJudgement) console.log(`   🧠 Model judgement: accurate=${entry.aiJudgement.accurate} reason=${entry.aiJudgement.reason}`);
              console.log(`   ❗ Incorrect: ${entry.incorrect ? 'YES' : 'NO'}`);
            }
          } else {
            entry.aiDescription = null;
            entry.incorrect = null;
            console.log(`   ⚠️  AI Analysis failed: ${analysis.error}`);
          }
        } else {
          entry.incorrect = null; // no expected alt to compare
        }
      } else {
        console.log(`❌ ${file}: ${validation.reason}`);
        invalidCount++;
        issues.push({ file, ...validation });
        entry.incorrect = true;
      }

      report.push(entry);
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

    // Write report JSON
    try {
      const outPath = path.join(IMAGES_DIR, 'validation-report.json');
      fs.writeFileSync(outPath, JSON.stringify({ summary: { validCount, invalidCount, aiAnalysisCount, totalSize }, report }, null, 2));
      console.log(`\n📝 Validation report written to: ${outPath}`);
    } catch (err) {
      console.warn('⚠️ Could not write validation report:', err.message);
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

// Check a single image (by filename or imageId) and print analysis + incorrect flag
async function checkSingleImage(target) {
  try {
    const files = await readdir(IMAGES_DIR);

    // Resolve target to an actual filename in images dir
    let file;
    if (/\.(jpg|jpeg|png|webp|gif)$/i.test(target)) {
      file = files.find(f => f === target);
    } else {
      file = files.find(f => path.parse(f).name === target);
    }

    if (!file) {
      console.error(`❌ Image not found for target: ${target}`);
      return;
    }

    const filePath = path.join(IMAGES_DIR, file);
    const validation = await validateImage(filePath);
    if (!validation.isValid) {
      console.log(`❌ ${file}: ${validation.reason}`);
      return;
    }

    const imageId = path.parse(file).name;
    const metadata = await loadAccessibilityMetadata();
    const expectedAltText = metadata[imageId]?.altText;

    console.log(`\n📸 Checking: ${file}`);
    console.log(`   format: ${validation.format}  size: ${(validation.size/1024).toFixed(1)}KB`);

    const analysis = await analyzeImageWithAI(filePath, file);
    if (!analysis.success) {
      console.log(`   ⚠️  AI analysis failed: ${analysis.error}`);
      return;
    }

    console.log(`   📝 AI Description: ${analysis.description}`);

    if (expectedAltText) {
      // If vision model indicates a person, accept and update alt
      if (analysis.isPerson === true) {
        const updated = updateAccessibilityAlt(imageId, analysis.description);
        console.log(`   📌 Expected Alt: ${expectedAltText}`);
        console.log(`   📝 Image detected as person — marked CORRECT` + (updated ? ' and alt updated' : ' but alt update failed'));
      } else if (analysis.isPerson === false) {
        console.log(`   📌 Expected Alt: ${expectedAltText}`);
        console.log(`   📝 Image detected as NOT a person — marked INCORRECT`);
      } else {
        const match = isAltMatching(analysis.description, expectedAltText);
        const evalRes = await evaluateAltWithAI(analysis.description, expectedAltText);
        if (evalRes.success) {
          console.log(`   📌 Expected Alt: ${expectedAltText}`);
          console.log(`   🧠 Model judgement: accurate=${evalRes.accurate} reason=${evalRes.reason}`);
          console.log(`   ❗ Incorrect: ${!evalRes.accurate ? 'YES' : 'NO'}`);
        } else {
          console.log(`   📌 Expected Alt: ${expectedAltText}`);
          console.log(`   ❗ Incorrect: ${!match ? 'YES' : 'NO'}`);
        }
      }
    } else {
      console.log('   ⚠️  No expected altText for this image to compare.');
    }

  } catch (err) {
    console.error('❌ Error checking image:', err.message);
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
  case 'check':
    (async () => {
      const target = args[1];
      if (!target) {
        console.log('Usage: node scripts/validate-images.mjs check <filename|imageId>');
        return;
      }
      await checkSingleImage(target);
    })();
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
