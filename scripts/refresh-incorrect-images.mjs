import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const IMAGEMAP_FILE = path.join(ROOT, 'src', 'data', 'imageMap.ts');
const ACCESS_FILE = path.join(ROOT, 'src', 'data', 'imageAccessibility.ts');

// Override map for IDs where the name in imageAccessibility.ts differs from Wikipedia article title
const WIKI_NAME_OVERRIDES = {
  'jane-hughes': 'Jane Fawcett',
  'klara-dan-von-neumann': 'Klára Dán von Neumann',
  // Disambiguation fixes — these Wikipedia articles are disambiguation pages without these suffixes
  'margaret-hamilton': 'Margaret Hamilton (software engineer)',
  'mary-jackson': 'Mary Jackson (engineer)',
  'adele-goldberg': 'Adele Goldberg (computer scientist)',
  // Different article title than the display name
  'poppy-northcutt': 'Frances Northcutt',
  'gloria-gordon-bolotsky': 'Gloria Bolotsky',
  'ruth-briggs': 'Ruth M. Briggs',
};

// For people with no Wikipedia thumbnail, use a direct Wikimedia Commons URL
const COMMONS_DIRECT_URLS = {
  'mary-gray': 'https://commons.wikimedia.org/wiki/Special:FilePath/Dr._Mary_Gray_presenting.jpg',
};

const FETCH_TIMEOUT_MS = 10000;

function fetchWithTimeout(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

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

// Uses Wikipedia REST API v1 (more reliable than Action API for thumbnails)
async function getWikipediaImageUrl(wikiSearchName) {
  try {
    const slug = wikiSearchName.replace(/ /g, '_');
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.thumbnail && data.thumbnail.source) {
      // Prefer originalimage if available (better quality)
      const src = (data.originalimage && data.originalimage.source) || data.thumbnail.source;
      return { url: src, source: 'wikipedia' };
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Scans all images in the Wikipedia article, finds the best portrait candidate
async function getWikipediaArticleImage(wikiSearchName) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiSearchName)}&prop=images&format=json&imlimit=30`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;
    const pid = Object.keys(pages)[0];
    const page = pages[pid];
    if (pid === '-1' || !page.images) return null;

    // Keep only JPG/PNG images, exclude logos/flags/maps/icons
    const skipKeywords = ['flag', 'logo', 'icon', 'map', 'badge', 'seal', 'stamp', 'coat', 'commons-logo'];
    const images = page.images.filter(img => {
      const t = img.title.toLowerCase();
      return /\.(jpg|jpeg|png)$/i.test(t) && !skipKeywords.some(k => t.includes(k));
    });
    if (images.length === 0) return null;

    // Prefer images where the person's name appears in the filename
    const nameParts = wikiSearchName.toLowerCase().split(' ').filter(p => p.length > 3);
    const byName = images.find(img => {
      const t = img.title.toLowerCase();
      return nameParts.some(part => t.includes(part));
    });
    const chosen = byName || images[0];

    // Fetch the direct download URL for the chosen file
    const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(chosen.title)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = await fetchWithTimeout(infoUrl);
    if (!infoRes.ok) return null;
    const infoData = await infoRes.json();
    const infoPages = infoData.query?.pages;
    if (!infoPages) return null;
    const infoPid = Object.keys(infoPages)[0];
    if (infoPid === '-1') return null;
    const imageinfo = infoPages[infoPid].imageinfo;
    if (!imageinfo?.[0]?.url) return null;
    return { url: imageinfo[0].url, source: 'wikipedia-article' };
  } catch (e) {
    return null;
  }
}

async function downloadImage(imageUrl, destPath) {
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 5000 * attempt));
    try {
      const res = await fetch(imageUrl, { signal: AbortSignal.timeout(30000) });
      if (res.status === 429) { lastErr = new Error(`HTTP 429 (rate limited)`); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${imageUrl}`);
      const buffer = await res.arrayBuffer();
      await writeFile(destPath, Buffer.from(buffer));
      return;
    } catch (e) {
      lastErr = e;
      if (e.message && e.message.includes('429')) continue;
    }
  }
  throw lastErr;
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
    // Use override wiki name if defined (handles cases where display name ≠ Wikipedia article title)
    const searchName = WIKI_NAME_OVERRIDES[person.id] || person.wikiName;
    const displayName = searchName !== person.wikiName ? `${person.wikiName} [→${searchName}]` : person.wikiName;
    process.stdout.write(`${displayName}... `);
    try {
      // Check for a hard-coded Commons direct URL first (for people with no Wikipedia thumbnail)
      if (COMMONS_DIRECT_URLS[person.id]) {
        const commonsUrl = COMMONS_DIRECT_URLS[person.id];
        const ext = getExtFromUrl(commonsUrl);
        const filename = `${person.id}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImage(commonsUrl, destPath);
        console.log('✓ (commons-direct)');
        const escapedId = person.id.replace(/-/g, '\\-');
        const entryRe = new RegExp(`(['"](${escapedId})['"]:\\s*['"][^'"]+['"])`, 'g');
        if (entryRe.test(imageMapRaw)) {
          imageMapRaw = imageMapRaw.replace(
            new RegExp(`(['"](${escapedId})['"]:\\s*['"][^'"]+['"])`, 'g'),
            `"${person.id}": "/images/${filename}"`
          );
        } else {
          imageMapRaw = imageMapRaw.replace(/\n};\s*$/, `,\n  "${person.id}": "/images/${filename}"\n};\n`);
        }
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      // Try: Wikipedia REST v1 → article images list
      let imageResult = await getWikipediaImageUrl(searchName);
      let filename;

      if (!imageResult) {
        imageResult = await getWikipediaArticleImage(searchName);
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

      // Update imageMap.ts entry for this id (handles both single and double quotes, any extension)
      const escapedId = person.id.replace(/-/g, '\\-');
      const entryRegexSingle = new RegExp(`(['"](${escapedId})['"]:\\s*['"][^'"]+['"])`, 'g');
      if (entryRegexSingle.test(imageMapRaw)) {
        const escapedId2 = person.id.replace(/-/g, '\\-');
        imageMapRaw = imageMapRaw.replace(
          new RegExp(`(['"](${escapedId2})['"]:\\s*['"][^'"]+['"])`, 'g'),
          `"${person.id}": "/images/${filename}"`
        );
      } else {
        // Insert new entry before closing brace
        imageMapRaw = imageMapRaw.replace(/\n};\s*$/, `,\n  "${person.id}": "/images/${filename}"\n};\n`);
      }

    } catch (err) {
      console.log(`✗ ERROR: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
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
