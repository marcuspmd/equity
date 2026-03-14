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
  { id: 'cathy-oneil', wikiSearchName: "Cathy O'Neil" },
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

  // Community Builders
  { id: 'anita-borg', wikiSearchName: 'Anita Borg' },
  { id: 'kimberly-bryant', wikiSearchName: 'Kimberly Bryant' },
  { id: 'reshma-saujani', wikiSearchName: 'Reshma Saujani' },
  { id: 'fei-fei-li', wikiSearchName: 'Fei-Fei Li' },
  { id: 'megan-smith', wikiSearchName: 'Megan Smith' },
  { id: 'tracy-chou', wikiSearchName: 'Tracy Chou' },
  { id: 'ellen-pao', wikiSearchName: 'Ellen Pao' },
  { id: 'erica-joy-baker', wikiSearchName: 'Erica Baker' },
  { id: 'freada-kapor-klein', wikiSearchName: 'Freada Kapor Klein' },
  { id: 'arlan-hamilton', wikiSearchName: 'Arlan Hamilton' },
  { id: 'kathryn-finney', wikiSearchName: 'Kathryn Finney' },
  { id: 'laura-weidman-powers', wikiSearchName: 'Laura Weidman Powers' },
  { id: 'sarah-kunst', wikiSearchName: 'Sarah Kunst' },
  { id: 'ayah-bdeir', wikiSearchName: 'Ayah Bdeir' },
  { id: 'limor-fried', wikiSearchName: 'Limor Fried' },
  { id: 'linda-liukas', wikiSearchName: 'Linda Liukas' },
  { id: 'alice-steinglass', wikiSearchName: 'Alice Steinglass' },
  { id: 'ruthe-farmer', wikiSearchName: 'Ruthe Farmer' },
  { id: 'telle-whitney', wikiSearchName: 'Telle Whitney' },
  { id: 'maria-klawe', wikiSearchName: 'Maria Klawe' },
];

async function getWikipediaImageUrl(wikiSearchName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiSearchName)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pageId !== '-1' && pages[pageId].thumbnail) {
    return { url: pages[pageId].thumbnail.source, source: 'wikipedia' };
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
  // Normalize svg and other formats to jpg (via wikipedia thumbnail which returns jpg/png)
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
}

async function main() {
  if (!existsSync(IMAGES_DIR)) {
    await mkdir(IMAGES_DIR, { recursive: true });
  }

  const results = [];
  const errors = [];

  console.log(`Starting download of ${PEOPLE.length} images...\n`);

  for (const person of PEOPLE) {
    process.stdout.write(`[${results.length + errors.length + 1}/${PEOPLE.length}] ${person.wikiSearchName}... `);

    try {
      // Try Wikipedia first
      let imageResult = await getWikipediaImageUrl(person.wikiSearchName);

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
            // ignore
          }
          return null;
        }

        imageResult = await getCommonsImageUrl(person.wikiSearchName);
      }

      if (!imageResult) {
        // Try DuckDuckGo image JSON endpoint
        async function getDuckDuckGoImageUrl(query) {
          try {
            const url = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}`;
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) return null;
            const data = await res.json();
            if (Array.isArray(data.results) && data.results.length > 0) {
              const first = data.results[0];
              if (first && first.image) return { url: first.image, source: 'duckduckgo' };
            }
          } catch (e) {
            // ignore
          }
          return null;
        }

        imageResult = await getDuckDuckGoImageUrl(person.wikiSearchName);
      }

      if (imageResult) {
        const ext = getExtFromUrl(imageResult.url);
        const filename = `${person.id}.${ext}`;
        const destPath = path.join(IMAGES_DIR, filename);
        await downloadImage(imageResult.url, destPath);
        results.push({ id: person.id, path: `/images/${filename}`, source: imageResult.source || 'unknown' });
        console.log(`✓ (${imageResult.source || 'source'})`);
      } else {
        // No reliable image found — record for manual review
        errors.push({ id: person.id, name: person.wikiSearchName, reason: 'No image found on Wikipedia/Commons/DuckDuckGo' });
        console.log(`✗ (no image found)`);
      }
    } catch (err) {
      console.log(`✗ ERROR: ${err.message}`);
      errors.push({ id: person.id, name: person.wikiSearchName, reason: err.message });
      results.push({ id: person.id, path: null, source: 'error' });
    }

    // Small delay to be polite to Wikipedia's API
    await new Promise(r => setTimeout(r, 150));
  }

  // Generate imageMap.ts
  const mapEntries = results
    .filter(r => r.path !== null)
    .map(r => `  '${r.id}': '${r.path}'`)
    .join(',\n');

  const tsContent = `// Auto-generated by scripts/download-images.mjs
// Do not edit manually — re-run the script to update

export const imageMap: Record<string, string> = {
${mapEntries},
};
`;

  await writeFile(IMAGEMAP_FILE, tsContent, 'utf-8');

  console.log('\n--- SUMMARY ---');
  console.log(`Total: ${PEOPLE.length}`);
  console.log(`Wikipedia: ${results.filter(r => r.source === 'wikipedia').length}`);
  console.log(`Picsum fallback: ${results.filter(r => r.source === 'picsum').length}`);
  console.log(`Errors: ${errors.filter(e => !results.find(r => r.id === e.id && r.source === 'picsum')).length}`);

  if (errors.length > 0) {
    console.log('\n--- WARNINGS / ERRORS ---');
    for (const e of errors) {
      console.log(`  [${e.id}] ${e.name}: ${e.reason}`);
    }
  }

  console.log('\nimageMap.ts generated at src/data/imageMap.ts');
  console.log(`Images saved to public/images/ (${results.filter(r => r.path).length} files)`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
