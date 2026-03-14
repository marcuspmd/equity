import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const IMAGEMAP_FILE = path.join(ROOT, 'src', 'data', 'imageMap.ts');
const ACCESS_FILE = path.join(ROOT, 'src', 'data', 'imageAccessibility.ts');

function getExtFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.(\w+)$/);
    if (!match) return 'jpg';
    const ext = match[1].toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
  } catch (e) {
    return 'jpg';
  }
}

async function getWikipediaImageUrl(wikiSearchName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiSearchName)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query && data.query.pages;
  if (!pages) return null;
  const pageId = Object.keys(pages)[0];
  if (pageId !== '-1' && pages[pageId].thumbnail) {
    return { url: pages[pageId].thumbnail.source, source: 'wikipedia' };
  }
  return null;
}

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${imageUrl}`);
  const buffer = await res.arrayBuffer();
  await writeFile(destPath, Buffer.from(buffer));
}

async function main() {
  if (!existsSync(IMAGES_DIR)) await mkdir(IMAGES_DIR, { recursive: true });

  const accessRaw = await readFile(ACCESS_FILE, 'utf-8');

  // Extract entries with incorrect: true and capture id + name
  const entryRegex = /"([^"]+)":\s*\{([\s\S]*?)\n\s*\},/g;
  const toRefresh = [];
  let m;
  while ((m = entryRegex.exec(accessRaw)) !== null) {
    const id = m[1];
    const body = m[2];
    if (/incorrect:\s*true/.test(body)) {
      const nameMatch = body.match(/name:\s*"([^"]+)"/);
      const wikiName = nameMatch ? nameMatch[1] : id.replace(/-/g, ' ');
      toRefresh.push({ id, wikiName });
    }
  }

  if (toRefresh.length === 0) {
    console.log('No incorrect images found in', ACCESS_FILE);
    return;
  }

  console.log(`Found ${toRefresh.length} incorrect images; refreshing...`);

  let imageMapRaw = await readFile(IMAGEMAP_FILE, 'utf-8');

  for (const person of toRefresh) {
    process.stdout.write(`${person.wikiName}... `);
    try {
      // Try several authoritative sources in order: Wikipedia -> Wikimedia Commons -> DuckDuckGo image search
      let imageResult = await getWikipediaImageUrl(person.wikiName);
      let filename;

      if (!imageResult) {
        // Try Commons
        async function getCommonsImageUrl(wikiSearchName) {
          try {
            const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(wikiSearchName)}&prop=imageinfo&iiprop=url&format=json`;
            const res = await fetch(commonsUrl);
            if (!res.ok) return null;
            const data = await res.json();
            const pages = data.query && data.query.pages;
            if (!pages) return null;
            const pageId = Object.keys(pages)[0];
            if (pageId !== '-1' && pages[pageId].imageinfo) {
              return { url: pages[pageId].imageinfo[0].url, source: 'commons' };
            }
          } catch (e) {
            // ignore and continue
          }
          return null;
        }

        imageResult = await getCommonsImageUrl(person.wikiName);
      }

      if (!imageResult) {
        // Try DuckDuckGo unofficial image JSON endpoint
        async function getDuckDuckGoImageUrl(query) {
          try {
            const url = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}`;
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) return null;
            const data = await res.json();
            if (Array.isArray(data.results) && data.results.length > 0) {
              // results have "image" field with direct URL
              const first = data.results[0];
              if (first && first.image) return { url: first.image, source: 'duckduckgo' };
            }
          } catch (e) {
            // rate limit or blocked — ignore and continue
          }
          return null;
        }

        imageResult = await getDuckDuckGoImageUrl(person.wikiName);
      }

      if (imageResult) {
        const ext = getExtFromUrl(imageResult.url);
        filename = `${person.id}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImage(imageResult.url, destPath);
        console.log(`✓ (${imageResult.source})`);
      } else {
        // No fallback to placeholder services like picsum — leave entry for manual review
        console.log('✗ (no image found — manual review required)');
        continue; // skip updating imageMap for this person
      }

      // Update imageMap.ts entry for this id
      const entryRegexSingle = new RegExp(`(['\\"]${person.id}['\\"]:\s*['\\"][^'\\"]+['\\"])`);
      if (entryRegexSingle.test(imageMapRaw)) {
        imageMapRaw = imageMapRaw.replace(entryRegexSingle, `'${person.id}': '/images/${filename}'`);
      } else {
        // Insert new entry before closing brace
        imageMapRaw = imageMapRaw.replace(/\n};\s*$/, `,\n  '${person.id}': '/images/${filename}'\n};\n`);
      }

    } catch (err) {
      console.log(`✗ ERROR: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 150));
  }

  // Write back imageMap.ts
  await writeFile(IMAGEMAP_FILE, imageMapRaw, 'utf-8');
  console.log('\nUpdated', IMAGEMAP_FILE);
  console.log('Images saved to', IMAGES_DIR);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
