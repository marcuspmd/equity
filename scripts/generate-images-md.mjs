import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const IMAGES_MD_FILE = path.join(ROOT, 'public', 'images', 'images.md');

// Mapeamento de ID para nome exibição
const nameMap = {
  'ada-lovelace': 'Ada Lovelace',
  'mary-somerville': 'Mary Somerville',
  'adele-goldstine': 'Adele Goldstine',
  'gloria-gordon-bolotsky': 'Gloria Gordon Bolotsky',
  'evelyn-berezin': 'Evelyn Berezin',
  'jane-hughes': 'Jane Hughes',
  'joan-clarke': 'Joan Clarke',
  'sandy-lerner': 'Sandy Lerner',
  'joann-morgan': 'Joann Morgan',
  'grete-hermann': 'Grete Hermann',
  'anita-borg': 'Anita Borg',
  'arlan-hamilton': 'Arlan Hamilton',
  'jean-bartik': 'Jean Bartik',
  'kateryna-yushchenko': 'Kateryna Yushchenko',
  'poppy-northcutt': 'Poppy Northcutt',
  'sarah-myers-west': 'Sarah Myers West',
  'stacy-horn': 'Stacy Horn',
  'aileen-clarke': 'Aileen Clarke',
  'yeshimabeit-milner': 'Yeshimabeit Milner',
  'evelyn-boyd-granville': 'Evelyn Boyd Granville',
  'beatrice-worsley': 'Beatrice Worsley',
  'kathleen-booth': 'Kathleen Booth',
  'alice-steinglass': 'Alice Steinglass',
  'donna-dubinsky': 'Donna Dubinsky',
  'nancy-grace-roman': 'Nancy Grace Roman',
  'sarah-baring': 'Sarah Baring',
  'elizabeth-feinler': 'Elizabeth Feinler',
  'mavis-batey': 'Mavis Batey',
  'ruth-briggs': 'Ruth Briggs',
  'ester-gerston': 'Ester Gerston',
  'mary-gray': 'Mary Gray',
  'ann-mitchell': 'Ann Mitchell',
  'klara-dan-von-neumann': 'Klara Dan Von Neumann',
  'mary-jackson': 'Mary Jackson',
  'edith-clarke': 'Edith Clarke',
  'margaret-rock': 'Margaret Rock',
  'kimberly-bryant': 'Kimberly Bryant',
  'tracy-chou': 'Tracy Chou',
  'ada-lovelace': 'Ada Lovelace',
  'grace-hopper': 'Grace Hopper',
  'katherine-johnson': 'Katherine Johnson',
  'margaret-hamilton': 'Margaret Hamilton',
  'sally-ride': 'Sally Ride',
  'mae-jemison': 'Mae Jemison',
  'kalpana-chawla': 'Kalpana Chawla',
  'dorothy-vaughan': 'Dorothy Vaughan',
  'dorothy-du-boisson': 'Dorothy Du Boisson',
};

async function generateMarkdown() {
  try {
    // Ler todos os arquivos da pasta de imagens
    const files = await readdir(IMAGES_DIR);

    // Filtrar apenas imagens (não MD ou outros arquivos)
    const imageFiles = files
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/.test(f) && f !== 'images.md')
      .sort();

    console.log(`Found ${imageFiles.length} images\n`);

    // Gerar markdown
    const lines = ['# Pioneering Women in Tech - Image Gallery\n'];

    for (const file of imageFiles) {
      const id = file.replace(/\.[^.]+$/, '');
      const name = nameMap[id] || id
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      lines.push(`![${name}](./${file}) ${name}`);
    }

    const markdown = lines.join('\n');

    // Escrever arquivo
    await writeFile(IMAGES_MD_FILE, markdown);
    console.log(`✓ Updated ${IMAGES_MD_FILE}`);
    console.log(`✓ Total images: ${imageFiles.length}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

generateMarkdown();
