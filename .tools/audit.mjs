/* Whole-site audit. Run before every deploy:  node .tools/audit.mjs          */
import fs from 'node:fs';
import path from 'node:path';
import { htmlPages } from './check-structure.mjs';

const pages = htmlPages('.');
const allFiles = new Set();
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const p = path.posix.join(dir.split(path.sep).join('/'), entry.name).replace(/^\.\//, '');
    if (entry.isDirectory()) walk(p);
    else allFiles.add(p);
  }
})('.');

const r = {
  pages: pages.length,
  placeholders: [],
  noCanonical: [], noHreflang: [], noTitle: [], badH1: [],
  imgs: 0, noDims: 0, noAlt: 0, noSrcset: 0,
  brokenLinks: new Map(),
  refsChecked: 0,
};

for (const file of pages) {
  const s = fs.readFileSync(file, 'utf8');

  if (s.includes('G-XXXXXXXXXX') || s.includes('REPLACE_WITH')) r.placeholders.push(file);
  if (!s.includes('rel="canonical"')) r.noCanonical.push(file);
  if (!s.includes('hreflang')) r.noHreflang.push(file);
  if (!s.includes('<title>')) r.noTitle.push(file);

  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) r.badH1.push(file + ' (' + h1 + ')');

  for (const [tag] of s.matchAll(/<img\b[^>]*>/g)) {
    r.imgs++;
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) r.noDims++;
    if (!/\salt="/.test(tag)) r.noAlt++;
    if (!/\ssrcset="/.test(tag)) r.noSrcset++;
  }

  for (const [, href] of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#|data:|\/\/)/i.test(href)) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    r.refsChecked++;
    const target = (clean.startsWith('/')
      ? clean.slice(1)
      : path.posix.join(path.posix.dirname(file), clean)).replace(/^\.\//, '');
    if (!target || target.endsWith('/')) continue;
    const ok = allFiles.has(target) || allFiles.has(target + '.html') || allFiles.has(target + '/index.html');
    if (!ok) {
      if (!r.brokenLinks.has(target)) r.brokenLinks.set(target, []);
      r.brokenLinks.get(target).push(file);
    }
  }
}

const line = (label, value, good) =>
  console.log('  ' + (good ? 'PASS' : 'FAIL') + '  ' + label.padEnd(34) + value);

console.log('\nFOTOSKIASIS — pre-deploy audit');
console.log('pages: ' + r.pages + '   images: ' + r.imgs + '   internal refs: ' + r.refsChecked + '\n');

line('unreplaced placeholders', r.placeholders.length, r.placeholders.length === 0);
line('pages missing canonical', r.noCanonical.length, r.noCanonical.length === 0);
line('pages missing hreflang', r.noHreflang.length, r.noHreflang.length === 0);
line('pages missing <title>', r.noTitle.length, r.noTitle.length === 0);
line('pages without exactly one h1', r.badH1.length, r.badH1.length === 0);
line('images without alt', r.noAlt, r.noAlt === 0);
line('images without width/height', r.noDims, r.noDims <= 2);
line('broken internal links', r.brokenLinks.size, r.brokenLinks.size === 0);

console.log('\n  info  images without srcset       ' + r.noSrcset + '  (JS-swapped gallery images, by design)');

for (const [target, refs] of [...r.brokenLinks].slice(0, 10)) {
  console.log('        MISSING ' + target + '  <- ' + refs.length + ' page(s), e.g. ' + refs[0]);
}
if (r.badH1.length) console.log('        h1 issues: ' + r.badH1.slice(0, 5).join(', '));
if (r.placeholders.length) console.log('        placeholders in: ' + r.placeholders.slice(0, 5).join(', '));

const failed =
  r.placeholders.length || r.noCanonical.length || r.noHreflang.length ||
  r.noTitle.length || r.badH1.length || r.noAlt || r.noDims > 2 || r.brokenLinks.size;
console.log('\n' + (failed ? 'AUDIT FAILED' : 'AUDIT CLEAN') + '\n');
process.exit(failed ? 1 : 0);
