#!/usr/bin/env node

import { mkdir, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

/**
 * Download image from URL with robust error handling
 */
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;

    protocol.get(imageUrl, { redirect: 'follow' }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Search Wikipedia for image URL
 */
async function searchWikipediaImage(query) {
  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

    const res = await fetch(wikiUrl);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (error) {
    console.error(`  Wikipedia search error: ${error.message}`);
  }
  return null;
}

/**
 * Search WikiCommons for image URL
 */
async function searchWikiCommonsImage(query) {
  try {
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(query)}&prop=imageinfo&iiprop=url&format=json`;

    const res = await fetch(commonsUrl);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId !== '-1' && pages[pageId].imageinfo) {
      return pages[pageId].imageinfo[0].url;
    }
  } catch (error) {
    console.error(`  WikiCommons search error: ${error.message}`);
  }
  return null;
}

/**
 * Use Google Nano Banana API if available
 * Requires NANO_BANANA_API_KEY environment variable
 */
async function searchNanoBananaImage(query) {
  const apiKey = process.env.NANO_BANANA_API_KEY;

  if (!apiKey) {
    console.log('  💡 Tip: Set NANO_BANANA_API_KEY env variable to use Nano Banana API');
    return null;
  }

  try {
    console.log('  🔗 Using Nano Banana API...');

    // Nano Banana API endpoint for image search
    const response = await fetch('https://api.banana.dev/v1/image-search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: query,
        num_results: 1,
        model: 'image-search'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].url;
    }
  } catch (error) {
    console.error(`  Nano Banana API error: ${error.message}`);
  }

  return null;
}

/**
 * Parse images.md to extract person names and image filenames
 */
async function parseImagesMarkdown() {
  const fs = await import('fs/promises');
  const mdPath = path.join(IMAGES_DIR, 'images.md');

  try {
    const content = await fs.readFile(mdPath, 'utf-8');
    const lines = content.split('\n');

    const images = [];
    for (const line of lines) {
      const match = line.match(/!\[([^\]]+)\]\(\.\/([^\)]+)\)\s*(.+)?/);
      if (match) {
        const [, altText, filename, displayName] = match;
        images.push({
          name: altText || displayName,
          filename,
          searchQuery: altText || displayName
        });
      }
    }

    return images;
  } catch (error) {
    console.error('Error parsing images.md:', error.message);
    return [];
  }
}

/**
 * Main download function with fallback sources
 */
async function downloadPersonImage(name, filename, searchQuery, forceRedownload = false) {
  const destPath = path.join(IMAGES_DIR, filename);

  // Skip if already exists and not forcing redownload
  if (existsSync(destPath) && !forceRedownload) {
    return { status: 'skipped', name };
  }

  try {
    console.log(`🔍 ${name}: Searching...`);

    let imageUrl = null;

    // Try sources in order: Nano Banana → Wikipedia → WikiCommons
    imageUrl = await searchNanoBananaImage(searchQuery);

    if (!imageUrl) {
      imageUrl = await searchWikipediaImage(searchQuery);
    }

    if (!imageUrl) {
      imageUrl = await searchWikiCommonsImage(searchQuery);
    }

    if (!imageUrl) {
      console.log(`❌ ${name}: Image not found in any source\n`);
      return { status: 'failed', name, reason: 'Not found' };
    }

    console.log(`⬇️  ${name}: Downloading...`);
    const imageBuffer = await downloadImage(imageUrl);

    // Delete old file if re-downloading
    if (existsSync(destPath) && forceRedownload) {
      await unlink(destPath);
    }

    await writeFile(destPath, imageBuffer);
    console.log(`✅ ${name}: Downloaded successfully (${(imageBuffer.length / 1024).toFixed(1)}KB)\n`);

    return {
      status: 'success',
      name,
      size: imageBuffer.length,
      source: imageUrl.includes('wikipedia') ? 'Wikipedia' :
              imageUrl.includes('commons') ? 'WikiCommons' : 'Nano Banana'
    };

  } catch (error) {
    console.error(`❌ ${name}: ${error.message}\n`);
    return { status: 'failed', name, reason: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const forceRedownload = args.includes('--force');
  const listOnly = args.includes('--list');

  console.log('🖼️  Image Download Manager\n');
  console.log('📝 Environment Setup:');

  if (process.env.NANO_BANANA_API_KEY) {
    console.log('   ✅ NANO_BANANA_API_KEY: Configured');
  } else {
    console.log('   ⚠️  NANO_BANANA_API_KEY: Not configured (fallback to Wikipedia)');
  }

  console.log(`   📁 Images directory: ${IMAGES_DIR}`);
  console.log(`   🔄 Force redownload: ${forceRedownload ? 'Yes' : 'No'}\n`);

  // Create images directory if not exists
  if (!existsSync(IMAGES_DIR)) {
    await mkdir(IMAGES_DIR, { recursive: true });
    console.log(`✅ Created directory: ${IMAGES_DIR}\n`);
  }

  // Parse images.md
  const images = await parseImagesMarkdown();
  console.log(`📋 Found ${images.length} images to manage\n`);

  if (images.length === 0) {
    console.log('❌ No images found in images.md');
    process.exit(1);
  }

  if (listOnly) {
    console.log('📋 Images list:');
    images.forEach((img, i) => {
      const exists = existsSync(path.join(IMAGES_DIR, img.filename));
      console.log(`   ${i + 1}. ${img.name} (${img.filename}) ${exists ? '✅' : '❌'}`);
    });
    return;
  }

  // Download images
  const results = [];
  for (const { name, filename, searchQuery } of images) {
    const result = await downloadPersonImage(name, filename, searchQuery, forceRedownload);
    results.push(result);

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Summary
  const successful = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;
  const skipped = results.filter(r => r.status === 'skipped').length;

  console.log('\n' + '='.repeat(50));
  console.log('📊 Download Summary:');
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped (already exist): ${skipped}`);
  console.log(`📁 Total: ${images.length}`);

  if (failed > 0) {
    console.log('\n⚠️  Failed downloads:');
    results
      .filter(r => r.status === 'failed')
      .forEach(({ name, reason }) => {
        console.log(`   - ${name}: ${reason}`);
      });

    console.log('\n💡 Tips:');
    console.log('   • Check your internet connection');
    console.log('   • Some images may not exist online');
    console.log('   • Try: NANO_BANANA_API_KEY=your_key node scripts/manage-images.mjs');
  }
}

// CLI help
if (process.argv.includes('--help')) {
  console.log(`
Usage: node manage-images.mjs [options]

Options:
  --force        Re-download all images (overwrite existing)
  --list         List all images without downloading
  --help         Show this help message

Environment Variables:
  NANO_BANANA_API_KEY    Use Nano Banana API for image search (optional)

Examples:
  node manage-images.mjs                          # Download missing images
  node manage-images.mjs --list                   # List all images
  node manage-images.mjs --force                  # Re-download all images
  NANO_BANANA_API_KEY=abc123 node manage-images.mjs   # Use Nano Banana API

Image Sources (fallback order):
  1. Nano Banana API (if NANO_BANANA_API_KEY is set)
  2. Wikipedia API
  3. WikiCommons API
`);
  process.exit(0);
}

main().catch(console.error);
