import fs from 'fs/promises';
import path from 'path';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const reportPath = path.join(repoRoot, 'public', 'images', 'validation-report.json');
const targetPath = path.join(repoRoot, 'src', 'data', 'imageAccessibility.ts');

async function main() {
  const [reportRaw, targetRaw] = await Promise.all([
    fs.readFile(reportPath, 'utf8'),
    fs.readFile(targetPath, 'utf8'),
  ]);

  const report = JSON.parse(reportRaw);
  let output = targetRaw;

  for (const item of report.report) {
    const id = item.imageId;
    if (!id) continue;

    // Only apply if expectedAltText or incorrect is present (non-null)
    const expected = item.expectedAltText;
    const incorrect = item.incorrect;

    // find the object for this id in the TS file
    const objRegex = new RegExp('("' + id + '")\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\}', 'm');
    const match = output.match(objRegex);
    if (!match) {
      console.warn(`no object for id: ${id}`);
      continue;
    }

    let objText = match[2];

    // replace altText if expected provided
    if (expected && typeof expected === 'string') {
      const altRegex = /altText:\s*([`'\n"])([\s\S]*?)\1,/m;
      if (altRegex.test(objText)) {
        objText = objText.replace(altRegex, `altText: ${JSON.stringify(expected)},`);
      } else {
        // insert altText near top
        objText = objText.replace(/(\n\s*)(title:\s*[^,]+,)/, `\n    altText: ${JSON.stringify(expected)},\n    $2`);
      }
    }

    // set or replace incorrect field when it's true/false (not null)
    if (incorrect === true || incorrect === false) {
      const incorrectRegex = /incorrect\s*:\s*(true|false)\s*,?/m;
      if (incorrectRegex.test(objText)) {
        objText = objText.replace(incorrectRegex, `incorrect: ${incorrect},`);
      } else {
        // insert incorrect after ariaDescription if present, else before role
        if (/ariaDescription:\s*/m.test(objText)) {
          objText = objText.replace(/(ariaDescription:\s*[\s\S]*?,\n)/m, `$1    incorrect: ${incorrect},\n`);
        } else {
          objText = objText.replace(/(\n\s*role:\s*[^,]+,)/, `\n    incorrect: ${incorrect},$1`);
        }
      }
    }

    // replace the object in the file
    output = output.replace(objRegex, `"${id}": {${objText}\n  }`);
  }

  // write a backup and then overwrite
  await fs.writeFile(targetPath + '.bak', targetRaw, 'utf8');
  await fs.writeFile(targetPath, output, 'utf8');
  console.log('Updated', targetPath, '(backup at .bak)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
