import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

// Parse images.md to extract person names and image filenames
async function parseImagesMarkdown() {
  const fs = await import('fs/promises');
  const mdPath = path.join(IMAGES_DIR, 'images.md');

  try {
    const content = await fs.readFile(mdPath, 'utf-8');
    const lines = content.split('\n');

    const images = [];
    for (const line of lines) {
      // Match pattern: ![Name](./filename.jpg) Name
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

// Search for image using DuckDuckGo Instant Answer API
async function searchImage(query) {
  try {
    // Use unofficial DuckDuckGo image search
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://duckduckgo.com/?q=${encodedQuery}&iax=images&ia=images`;

    // Try to get image from Wikipedia first
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedQuery}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

    const res = await fetch(wikiUrl);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }

    // Fallback: Try Wikimedia Commons
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodedQuery}&prop=imageinfo&iiprop=url&format=json`;
    const commonsRes = await fetch(commonsUrl);
    const commonsData = await commonsRes.json();
    const commonsPages = commonsData.query.pages;
    const commonsPageId = Object.keys(commonsPages)[0];

    if (commonsPageId !== '-1' && commonsPages[commonsPageId].imageinfo) {
      return commonsPages[commonsPageId].imageinfo[0].url;
    }

    return null;
  } catch (error) {
    console.error(`Search error for "${query}":`, error.message);
    return null;
  }
}

// Download image from URL
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

// Get file extension from URL or default to jpg
function getExtFromUrl(url) {
  const urlPath = new URL(url).pathname;
  const match = urlPath.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : 'jpg';
}

// Main function
async function main() {
  console.log('🖼️  Starting image download process...\n');

  // Create images directory if not exists
  if (!existsSync(IMAGES_DIR)) {
    await mkdir(IMAGES_DIR, { recursive: true });
    console.log(`✅ Created directory: ${IMAGES_DIR}\n`);
  }

  // Parse images.md
  const images = await parseImagesMarkdown();
  console.log(`📋 Found ${images.length} images to download from images.md\n`);

  if (images.length === 0) {
    console.log('❌ No images found in images.md');
    process.exit(1);
  }

  let successful = 0;
  let failed = 0;
  const failedImages = [];

  for (const { name, filename, searchQuery } of images) {
    try {
      const destPath = path.join(IMAGES_DIR, filename);

      // Skip if already exists
      if (existsSync(destPath)) {
        console.log(`⏭️  ${name}: Already exists`);
        successful++;
        continue;
      }

      console.log(`🔍 ${name}: Searching...`);

      const imageUrl = await searchImage(searchQuery);

      if (!imageUrl) {
        console.log(`❌ ${name}: Image not found`);
        failed++;
        failedImages.push({ name, filename, searchQuery });
        continue;
      }

      console.log(`⬇️  ${name}: Downloading from ${new URL(imageUrl).hostname}...`);

      const imageBuffer = await downloadImage(imageUrl);

      await writeFile(destPath, imageBuffer);
      console.log(`✅ ${name}: Downloaded successfully (${(imageBuffer.length / 1024).toFixed(1)}KB)\n`);
      successful++;

    } catch (error) {
      console.error(`❌ ${name}: ${error.message}\n`);
      failed++;
      failedImages.push({ name, filename, searchQuery });
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Total: ${images.length}`);

  if (failedImages.length > 0) {
    console.log('\n⚠️  Failed downloads:');
    failedImages.forEach(({ name, searchQuery }) => {
      console.log(`  - ${name} (search: "${searchQuery}")`);
    });
    console.log('\nTip: You can manually add images to public/images/ and rerun the script.');
  }
}

main().catch(console.error);
