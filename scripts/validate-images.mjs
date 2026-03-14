import { mkdir, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

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

    console.log(`📊 Found ${imageFiles.length} image files\n`);

    let validCount = 0;
    let invalidCount = 0;
    const issues = [];
    let totalSize = 0;

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      const validation = await validateImage(filePath);

      if (validation.isValid) {
        console.log(`✅ ${file}: ${validation.format} (${(validation.size / 1024).toFixed(1)}KB)`);
        validCount++;
        totalSize += validation.size;
      } else {
        console.log(`❌ ${file}: ${validation.reason}`);
        invalidCount++;
        issues.push({ file, ...validation });
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Valid: ${validCount}`);
    console.log(`❌ Invalid: ${invalidCount}`);
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

  } catch (error) {
    console.error('❌ Error reading images directory:', error.message);
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
    console.log('  all        - Run both validate and stats');
}
