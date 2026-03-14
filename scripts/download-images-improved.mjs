import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const IMAGEMAP_FILE = path.join(ROOT, 'src', 'data', 'imageMap.ts');

const PEOPLE = [
  // The Pioneers
  { id: 'ada-lovelace', wikiSearchName: 'Ada Lovelace' },
  { id: 'mary-somerville', wikiSearchName: 'Mary Somerville' },
  { id: 'edith-clarke', wikiSearchName: 'Edith Clarke' },
  { id: 'grete-hermann', wikiSearchName: 'Grete Hermann' },
  { id: 'mary-cartwright', wikiSearchName: 'Mary Cartwright' },
  { id: 'rozsa-peter', wikiSearchName: 'Rózsa Péter' },
  { id: 'hedy-lamarr', wikiSearchName: 'Hedy Lamarr' },
  { id: 'grace-hopper', wikiSearchName: 'Grace Hopper' },
  { id: 'mary-kenneth-keller', wikiSearchName: 'Mary Kenneth Keller' },
  { id: 'beatrice-worsley', wikiSearchName: 'Beatrice Worsley' },
  { id: 'kateryna-yushchenko', wikiSearchName: 'Kateryna Yushchenko' },
  { id: 'thelma-estrin', wikiSearchName: 'Thelma Estrin' },
  { id: 'evelyn-boyd-granville', wikiSearchName: 'Evelyn Boyd Granville' },
  { id: 'ida-rhodes', wikiSearchName: 'Ida Rhodes' },
  { id: 'kathleen-booth', wikiSearchName: 'Kathleen Booth' },
  { id: 'klara-dan-von-neumann', wikiSearchName: 'Klára Dán von Neumann' },
  { id: 'joan-clarke', wikiSearchName: 'Joan Clarke' },
  { id: 'margaret-rock', wikiSearchName: 'Margaret Rock' },
  { id: 'mavis-batey', wikiSearchName: 'Mavis Batey' },
  { id: 'dorothy-du-boisson', wikiSearchName: 'Dorothy Du Boisson' },

  // Early Coders & Cryptographers
  { id: 'jean-bartik', wikiSearchName: 'Jean Bartik' },
  { id: 'betty-holberton', wikiSearchName: 'Betty Holberton' },
  { id: 'frances-spence', wikiSearchName: 'Frances Spence' },
  { id: 'ruth-teitelbaum', wikiSearchName: 'Ruth Teitelbaum' },
  { id: 'marlyn-meltzer', wikiSearchName: 'Marlyn Meltzer' },
  { id: 'kathleen-antonelli', wikiSearchName: 'Kathleen Antonelli' },
  { id: 'adele-goldstine', wikiSearchName: 'Adele Goldstine' },
  { id: 'gloria-gordon-bolotsky', wikiSearchName: 'Gloria Gordon Bolotsky' },
  { id: 'ester-gerston', wikiSearchName: 'Ester Gerston' },
  { id: 'ruth-briggs', wikiSearchName: 'Ruth Briggs' },
  { id: 'agnes-meyer-driscoll', wikiSearchName: 'Agnes Meyer Driscoll' },
  { id: 'genevieve-grotjan-feinstein', wikiSearchName: 'Genevieve Grotjan Feinstein' },
  { id: 'elizebeth-smith-friedman', wikiSearchName: 'Elizebeth Smith Friedman' },
  { id: 'ann-mitchell', wikiSearchName: 'Ann Mitchell' },
  { id: 'sarah-baring', wikiSearchName: 'Sarah Baring' },
  { id: 'jane-hughes', wikiSearchName: 'Jane Fawcett' },
  { id: 'krystyna-skarbek', wikiSearchName: 'Krystyna Skarbek' },
  { id: 'virginia-hall', wikiSearchName: 'Virginia Hall' },
  { id: 'aileen-clarke', wikiSearchName: 'Aileen Clarke' },
  { id: 'mary-gray', wikiSearchName: 'Mary Gray' },

  // Space & Apollo
  { id: 'dorothy-vaughan', wikiSearchName: 'Dorothy Vaughan' },
  { id: 'mary-jackson', wikiSearchName: 'Mary Jackson' },
  { id: 'katherine-johnson', wikiSearchName: 'Katherine Johnson' },
  { id: 'margaret-hamilton', wikiSearchName: 'Margaret Hamilton' },
  { id: 'christine-darden', wikiSearchName: 'Christine Darden' },
  { id: 'annie-easley', wikiSearchName: 'Annie Easley' },
  { id: 'melba-roy-mouton', wikiSearchName: 'Melba Roy Mouton' },
  { id: 'valerie-thomas', wikiSearchName: 'Valerie Thomas' },
  { id: 'sally-ride', wikiSearchName: 'Sally Ride' },
  { id: 'mae-jemison', wikiSearchName: 'Mae Jemison' },
  { id: 'ellen-ochoa', wikiSearchName: 'Ellen Ochoa' },
  { id: 'kalpana-chawla', wikiSearchName: 'Kalpana Chawla' },
  { id: 'peggy-whitson', wikiSearchName: 'Peggy Whitson' },
  { id: 'eileen-collins', wikiSearchName: 'Eileen Collins' },
  { id: 'nancy-grace-roman', wikiSearchName: 'Nancy Grace Roman' },
  { id: 'joann-morgan', wikiSearchName: 'JoAnn Morgan' },
  { id: 'poppy-northcutt', wikiSearchName: 'Poppy Northcutt' },
  { id: 'judy-sullivan', wikiSearchName: 'Judy Sullivan' },
  { id: 'eula-bingham', wikiSearchName: 'Eula Bingham' },
  { id: 'dottie-metcalf-lindenburger', wikiSearchName: 'Dorothy Metcalf-Lindenburger' },

  // Modern Innovators
  { id: 'evelyn-berezin', wikiSearchName: 'Evelyn Berezin' },
  { id: 'carol-shaw', wikiSearchName: 'Carol Shaw' },
  { id: 'adele-goldberg', wikiSearchName: 'Adele Goldberg' },
  { id: 'radia-perlman', wikiSearchName: 'Radia Perlman' },
  { id: 'lynn-conway', wikiSearchName: 'Lynn Conway' },
  { id: 'sophie-wilson', wikiSearchName: 'Sophie Wilson' },
  { id: 'roberta-williams', wikiSearchName: 'Roberta Williams' },
  { id: 'donna-dubinsky', wikiSearchName: 'Donna Dubinsky' },
  { id: 'susan-kare', wikiSearchName: 'Susan Kare' },
  { id: 'stacy-horn', wikiSearchName: 'Stacy Horn' },
  { id: 'elizabeth-feinler', wikiSearchName: 'Elizabeth Feinler' },
  { id: 'sandy-lerner', wikiSearchName: 'Sandy Lerner' },
  { id: 'mitchell-baker', wikiSearchName: 'Mitchell Baker' },
  { id: 'marissa-mayer', wikiSearchName: 'Marissa Mayer' },
  { id: 'sheryl-sandberg', wikiSearchName: 'Sheryl Sandberg' },
  { id: 'susan-wojcicki', wikiSearchName: 'Susan Wojcicki' },
  { id: 'meg-whitman', wikiSearchName: 'Meg Whitman' },
  { id: 'safra-catz', wikiSearchName: 'Safra Catz' },
  { id: 'ginni-rometty', wikiSearchName: 'Ginni Rometty' },
  { id: 'ursula-burns', wikiSearchName: 'Ursula Burns' },

  // Algorithmic Justice
  { id: 'joy-buolamwini', wikiSearchName: 'Joy Buolamwini' },
  { id: 'timnit-gebru', wikiSearchName: 'Timnit Gebru' },
  { id: 'safiya-noble', wikiSearchName: 'Safiya Noble' },
  { id: 'ruha-benjamin', wikiSearchName: 'Ruha Benjamin' },
  { id: 'cathy-oneil', wikiSearchName: "Cathy O'Neill" },
  { id: 'latanya-sweeney', wikiSearchName: 'Latanya Sweeney' },
  { id: 'meredith-broussard', wikiSearchName: 'Meredith Broussard' },
  { id: 'virginia-eubanks', wikiSearchName: 'Virginia Eubanks' },
  { id: 'kate-crawford', wikiSearchName: 'Kate Crawford' },
  { id: 'margaret-mitchell', wikiSearchName: 'Margaret Mitchell (scientist)' },
  { id: 'rumman-chowdhury', wikiSearchName: 'Rumman Chowdhury' },
  { id: 'rediet-abebe', wikiSearchName: 'Rediet Abebe' },
  { id: 'inioluwa-deborah-raji', wikiSearchName: 'Deborah Raji' },
  { id: 'sasha-costanza-chock', wikiSearchName: 'Sasha Costanza-Chock' },
  { id: 'mutale-nkonde', wikiSearchName: 'Mutale Nkonde' },
  { id: 'yeshimabeit-milner', wikiSearchName: 'Yeshimabeit Milner' },
  { id: 'sarah-myers-west', wikiSearchName: 'Sarah Myers West' },
  { id: 'alex-hanna', wikiSearchName: 'Alex Hanna' },
  { id: 'emily-m-bender', wikiSearchName: 'Emily M. Bender' },
  { id: 'cynthia-dwork', wikiSearchName: 'Cynthia Dwork' },
];

async function getWikipediaImageUrl(wikiSearchName) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiSearchName)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return { url: pages[pageId].thumbnail.source, source: 'wikipedia' };
    }
  } catch (error) {
    console.error(`  Wikipedia error: ${error.message}`);
  }
  return null;
}

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${imageUrl}`);
  }
  const buffer = await res.arrayBuffer();
  await writeFile(destPath, Buffer.from(buffer));
}

function getExtFromUrl(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.(\w+)$/);
  if (!match) return 'jpg';
  const ext = match[1].toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (!existsSync(IMAGES_DIR)) {
    await mkdir(IMAGES_DIR, { recursive: true });
  }

  const results = [];
  const errors = [];

  console.log(`Starting download of ${PEOPLE.length} images...\n`);
  console.log('NOTE: Using delayed requests to avoid rate limits\n');

  for (let i = 0; i < PEOPLE.length; i++) {
    const person = PEOPLE[i];
    process.stdout.write(`[${i + 1}/${PEOPLE.length}] ${person.wikiSearchName}... `);

    try {
      const imageResult = await getWikipediaImageUrl(person.wikiSearchName);

      if (imageResult) {
        const ext = getExtFromUrl(imageResult.url);
        const filename = `${person.id}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImage(imageResult.url, destPath);
        results.push({ id: person.id, path: `/images/${filename}`, source: 'wikipedia' });
        console.log(`✓ (wikipedia)`);
      } else {
        errors.push({ id: person.id, name: person.wikiSearchName, reason: 'No Wikipedia image found' });
        console.log(`⚠ (no wikipedia image)`);
      }
    } catch (error) {
      errors.push({ id: person.id, name: person.wikiSearchName, reason: error.message });
      console.log(`✗ ERROR: ${error.message}`);
    }

    // Add delay between requests to avoid rate limiting
    if (i < PEOPLE.length - 1) {
      await sleep(500);
    }
  }

  // Generate imageMap.ts
  const imageMapContent = `// Auto-generated image map
export const imageMap: Record<string, string> = {
${results.map(r => `  '${r.id}': '${r.path}',`).join('\n')}
};
`;

  await writeFile(IMAGEMAP_FILE, imageMapContent);

  console.log('\n--- SUMMARY ---');
  console.log(`Total: ${PEOPLE.length}`);
  console.log(`Successfully downloaded: ${results.length}`);
  console.log(`Failed/Missing: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n--- MISSING IMAGES (Need manual action) ---');
    errors.forEach(e => {
      console.log(`  [${e.id}] ${e.name}: ${e.reason}`);
    });
    console.log('\nThese images need to be found and downloaded manually.');
    console.log('Suggestions:');
    console.log('1. Search Wikipedia for the person directly');
    console.log('2. Check Commons (commons.wikimedia.org)');
    console.log('3. Check official websites or professional photos');
    console.log('4. Place images in public/images/ with naming: {id}.jpg');
  }
}

main().catch(console.error);
