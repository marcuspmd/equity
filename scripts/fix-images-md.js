import { readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const files = readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg|png|gif|webp)$/.test(f))
  .sort();

const header = '# Pioneering Women in Tech - Image Gallery\n';
const lines = files.map(f => {
  const nameFromFile = f
    .replace(/\.[^.]+$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return `![${nameFromFile}](./${f}) ${nameFromFile}`;
});

const markdown = header + '\n' + lines.join('\n');
writeFileSync(path.join(imagesDir, 'images.md'), markdown);
console.log('✓ images.md updated with ' + files.length + ' images');
