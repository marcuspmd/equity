/**
 * Retry script for images that failed with HTTP 429.
 * Uses longer delays and adds retry logic per image.
 * Run after download-images.mjs to fill in missing images.
 */
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const IMAGEMAP_FILE = path.join(ROOT, 'src', 'data', 'imageMap.ts');

// Only the ones that failed with HTTP 429
const FAILED_PEOPLE = [
  { id: 'grace-hopper', wikiSearchName: 'Grace Hopper' },
  { id: 'mary-kenneth-keller', wikiSearchName: 'Mary Kenneth Keller' },
  { id: 'kateryna-yushchenko', wikiSearchName: 'Kateryna Yushchenko' },
  { id: 'ida-rhodes', wikiSearchName: 'Ida Rhodes' },
  { id: 'betty-holberton', wikiSearchName: 'Betty Holberton' },
  { id: 'ruth-teitelbaum', wikiSearchName: 'Ruth Teitelbaum' },
  { id: 'marlyn-meltzer', wikiSearchName: 'Marlyn Meltzer' },
  { id: 'krystyna-skarbek', wikiSearchName: 'Krystyna Skarbek' },
  { id: 'virginia-hall', wikiSearchName: 'Virginia Hall' },
  { id: 'katherine-johnson', wikiSearchName: 'Katherine Johnson' },
  { id: 'christine-darden', wikiSearchName: 'Christine Darden' },
  { id: 'annie-easley', wikiSearchName: 'Annie Easley' },
  { id: 'melba-roy-mouton', wikiSearchName: 'Melba Roy Mouton' },
  { id: 'valerie-thomas', wikiSearchName: 'Valerie Thomas' },
  { id: 'sally-ride', wikiSearchName: 'Sally Ride' },
  { id: 'ellen-ochoa', wikiSearchName: 'Ellen Ochoa' },
  { id: 'kalpana-chawla', wikiSearchName: 'Kalpana Chawla' },
  { id: 'peggy-whitson', wikiSearchName: 'Peggy Whitson' },
  { id: 'eileen-collins', wikiSearchName: 'Eileen Collins' },
  { id: 'eula-bingham', wikiSearchName: 'Eula Bingham' },
  { id: 'dottie-metcalf-lindenburger', wikiSearchName: 'Dorothy Metcalf-Lindenburger' },
  { id: 'carol-shaw', wikiSearchName: 'Carol Shaw' },
  { id: 'lynn-conway', wikiSearchName: 'Lynn Conway' },
  { id: 'sophie-wilson', wikiSearchName: 'Sophie Wilson' },
  { id: 'roberta-williams', wikiSearchName: 'Roberta Williams' },
  { id: 'susan-kare', wikiSearchName: 'Susan Kare' },
  { id: 'mitchell-baker', wikiSearchName: 'Mitchell Baker' },
  { id: 'sheryl-sandberg', wikiSearchName: 'Sheryl Sandberg' },
  { id: 'susan-wojcicki', wikiSearchName: 'Susan Wojcicki' },
  { id: 'meg-whitman', wikiSearchName: 'Meg Whitman' },
  { id: 'ginni-rometty', wikiSearchName: 'Ginni Rometty' },
  { id: 'ursula-burns', wikiSearchName: 'Ursula Burns' },
  { id: 'joy-buolamwini', wikiSearchName: 'Joy Buolamwini' },
  { id: 'timnit-gebru', wikiSearchName: 'Timnit Gebru' },
  { id: 'safiya-noble', wikiSearchName: 'Safiya Noble' },
  { id: 'ruha-benjamin', wikiSearchName: 'Ruha Benjamin' },
  { id: 'cathy-oneil', wikiSearchName: "Cathy O'Neil" },
  { id: 'latanya-sweeney', wikiSearchName: 'Latanya Sweeney' },
  { id: 'meredith-broussard', wikiSearchName: 'Meredith Broussard' },
  { id: 'virginia-eubanks', wikiSearchName: 'Virginia Eubanks' },
  { id: 'margaret-mitchell', wikiSearchName: 'Margaret Mitchell (scientist)' },
  { id: 'rumman-chowdhury', wikiSearchName: 'Rumman Chowdhury' },
  { id: 'rediet-abebe', wikiSearchName: 'Rediet Abebe' },
  { id: 'inioluwa-deborah-raji', wikiSearchName: 'Deborah Raji' },
  { id: 'sasha-costanza-chock', wikiSearchName: 'Sasha Costanza-Chock' },
  { id: 'mutale-nkonde', wikiSearchName: 'Mutale Nkonde' },
  { id: 'emily-m-bender', wikiSearchName: 'Emily M. Bender' },
  { id: 'cynthia-dwork', wikiSearchName: 'Cynthia Dwork' },
  { id: 'reshma-saujani', wikiSearchName: 'Reshma Saujani' },
  { id: 'megan-smith', wikiSearchName: 'Megan Smith' },
  { id: 'ellen-pao', wikiSearchName: 'Ellen Pao' },
  { id: 'erica-joy-baker', wikiSearchName: 'Erica Baker' },
  { id: 'freada-kapor-klein', wikiSearchName: 'Freada Kapor Klein' },
  { id: 'kathryn-finney', wikiSearchName: 'Kathryn Finney' },
  { id: 'ayah-bdeir', wikiSearchName: 'Ayah Bdeir' },
  { id: 'limor-fried', wikiSearchName: 'Limor Fried' },
  { id: 'linda-liukas', wikiSearchName: 'Linda Liukas' },
  { id: 'ruthe-farmer', wikiSearchName: 'Ruthe Farmer' },
  { id: 'maria-klawe', wikiSearchName: 'Maria Klawe' },
];

const delay = ms => new Promise(r => setTimeout(r, ms));

async function getWikipediaImageUrl(wikiSearchName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiSearchName)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Wikipedia API: HTTP ${res.status}`);
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId !== '-1' && pages[pageId].thumbnail) {
    return pages[pageId].thumbnail.source;
  }
  return null;
}

async function downloadImageWithRetry(imageUrl, destPath, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch(imageUrl);
    if (res.status === 429) {
      const waitMs = attempt * 4000;
      process.stdout.write(` [429, waiting ${waitMs / 1000}s]`);
      await delay(waitMs);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    await writeFile(destPath, Buffer.from(buffer));
    return true;
  }
  throw new Error(`Failed after ${maxRetries} retries (persistent 429)`);
}

function getExtFromUrl(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.(\w+)$/);
  if (!match) return 'jpg';
  const ext = match[1].toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
}

async function main() {
  console.log(`Retrying ${FAILED_PEOPLE.length} failed images with longer delays...\n`);

  const newEntries = {};
  const stillFailed = [];

  for (let i = 0; i < FAILED_PEOPLE.length; i++) {
    const person = FAILED_PEOPLE[i];
    process.stdout.write(`[${i + 1}/${FAILED_PEOPLE.length}] ${person.wikiSearchName}... `);

    try {
      const imageUrl = await getWikipediaImageUrl(person.wikiSearchName);

      if (imageUrl) {
        const ext = getExtFromUrl(imageUrl);
        const filename = `${person.id}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImageWithRetry(imageUrl, destPath);
        newEntries[person.id] = `/images/${filename}`;
        console.log('✓ (wikipedia)');
      } else {
        // Fallback picsum
        const seed = person.wikiSearchName.replace(/\s+/g, '');
        const fallbackUrl = `https://picsum.photos/seed/${seed}/800/800`;
        const filename = `${person.id}.jpg`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImageWithRetry(fallbackUrl, destPath);
        newEntries[person.id] = `/images/${filename}`;
        console.log('⚠ (no wikipedia image, used picsum)');
        stillFailed.push({ id: person.id, name: person.wikiSearchName, reason: 'No Wikipedia image' });
      }
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
      stillFailed.push({ id: person.id, name: person.wikiSearchName, reason: err.message });
    }

    // Polite delay: 1.5 seconds between requests
    await delay(1500);
  }

  // Read existing imageMap.ts and merge new entries
  const existing = await readFile(IMAGEMAP_FILE, 'utf-8');

  // Extract existing entries using regex
  const existingEntries = {};
  const entryRegex = /'([^']+)':\s*'([^']+)'/g;
  let match;
  while ((match = entryRegex.exec(existing)) !== null) {
    existingEntries[match[1]] = match[2];
  }

  // Merge: new entries override existing nulls
  const merged = { ...existingEntries, ...newEntries };
  const mapEntries = Object.entries(merged)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, p]) => `  '${id}': '${p}'`)
    .join(',\n');

  const tsContent = `// Auto-generated by scripts/download-images.mjs + retry-failed-images.mjs
// Do not edit manually — re-run the scripts to update

export const imageMap: Record<string, string> = {
${mapEntries},
};
`;

  await writeFile(IMAGEMAP_FILE, tsContent, 'utf-8');

  console.log('\n--- RETRY SUMMARY ---');
  console.log(`Retried: ${FAILED_PEOPLE.length}`);
  console.log(`Recovered: ${FAILED_PEOPLE.length - stillFailed.length}`);
  console.log(`Still failed: ${stillFailed.filter(e => e.reason !== 'No Wikipedia image').length}`);
  console.log(`No Wikipedia image (picsum): ${stillFailed.filter(e => e.reason === 'No Wikipedia image').length}`);

  if (stillFailed.length > 0) {
    console.log('\n--- STILL FAILED ---');
    for (const e of stillFailed) {
      console.log(`  [${e.id}] ${e.name}: ${e.reason}`);
    }
  }

  console.log('\nimageMap.ts updated.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
