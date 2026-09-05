import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const count = (s, needle) => s.split(needle).length - 1;
const FOOTER = '<footer class="footer">';

let fixed = 0;
const skipped = [];

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const opens = count(before, '<main>') + count(before, '<main ');
  const closes = count(before, '</main>');
  if (opens === closes) continue;

  if (count(before, FOOTER) !== 1) { skipped.push(file + ' (footer count)'); continue; }

  const after = before.replace(FOOTER, '</main> ' + FOOTER);
  fs.writeFileSync(file, after);
  fixed++;
}

console.log('pages given a closing </main>:', fixed);
if (skipped.length) console.log('skipped:', skipped);
