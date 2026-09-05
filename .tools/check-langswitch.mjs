/* The header language switcher should send you to the SAME page in the other
   language. The <head> hreflang tags already state the correct pair, so use
   those as the source of truth and compare. */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const ORIGIN = 'https://fotoskiasis.com';

function attr(html, from, name) {
  const i = html.indexOf(name + '="', from);
  if (i === -1) return null;
  const start = i + name.length + 2;
  return html.slice(start, html.indexOf('"', start));
}

/** Pull the hreflang pair out of <head>. */
function expected(html) {
  const out = {};
  for (const lang of ['en', 'el']) {
    const marker = 'hreflang="' + lang + '"';
    const i = html.indexOf(marker);
    if (i === -1) continue;
    const href = attr(html, i, 'href');
    if (href) out[lang] = href.replace(ORIGIN, '') || '/';
  }
  return out;
}

/** Pull the two hrefs out of the header .lang switcher. */
function actual(html) {
  const i = html.indexOf('class="lang"');
  if (i === -1) return null;
  const block = html.slice(i, i + 2600);
  const hrefs = [];
  let pos = 0;
  while (hrefs.length < 2) {
    const j = block.indexOf('<a href="', pos);
    if (j === -1) break;
    const start = j + 9;
    hrefs.push(block.slice(start, block.indexOf('"', start)));
    pos = start;
  }
  return hrefs.length === 2 ? { en: hrefs[0], el: hrefs[1] } : null;
}

const pages = htmlPages('.');
const broken = [];

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const want = expected(html);
  const got = actual(html);
  if (!got || !want.en || !want.el) continue;
  if (got.en !== want.en || got.el !== want.el) {
    broken.push({ file, want, got });
  }
}

console.log('pages checked      :', pages.length);
console.log('switcher mismatches:', broken.length);
for (const b of broken.slice(0, 12)) {
  console.log('  ' + b.file);
  console.log('      expected  en=' + b.want.en + '  el=' + b.want.el);
  console.log('      actual    en=' + b.got.en + '  el=' + b.got.el);
}
if (broken.length > 12) console.log('  … and ' + (broken.length - 12) + ' more');
export { broken };
