import fs from 'node:fs';
import path from 'node:path';

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.tools', 'node_modules'].includes(entry.name)) continue;
    const p = path.posix.join(dir.split(path.sep).join('/'), entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p.replace(/^\.\//, ''));
  }
})('.');

let added = 0, mained = 0;
for (const file of pages) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;

  const isEl = /<html lang="el"/.test(s);
  const label = isEl ? 'Μετάβαση στο περιεχόμενο' : 'Skip to content';

  if (!s.includes('class="skip-link"')) {
    s = s.replace('<body>', '<body> <a class="skip-link" href="#main">' + label + '</a>');
    added++;
  }
  if (s.includes('<main>')) {
    s = s.replace('<main>', '<main id="main" tabindex="-1">');
    mained++;
  }

  if (s !== before) fs.writeFileSync(file, s);
}
console.log('skip links added   :', added);
console.log('<main> given an id :', mained);
