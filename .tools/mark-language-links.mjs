/* Mark the language-switch links with the language they are written in.

   English pages link to the Greek version as "ΕΛ" / "Ελληνικά →", and Greek
   pages link back as "EN" / "English →". Without lang, a screen reader reads
   "Ελληνικά" with English pronunciation (WCAG 3.1.2, language of parts), and
   CSS can't tell these words apart from the page around them — site.css uses
   a[lang="el"] to draw them in a system font instead of downloading the web
   fonts' Greek files for one word. hreflang states the target's language.

   Idempotent.

       node .tools/mark-language-links.mjs                                    */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const LABELS = {
  en: { other: 'el', text: /^(ΕΛ|Ελληνικά)( →)?$/ },
  el: { other: 'en', text: /^(EN|English)( →)?$/ },
};

let pages = 0, links = 0;
const unmatched = [];

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const lang = (before.match(/<html lang="([a-z]+)"/) || [])[1];
  const rule = LABELS[lang];
  if (!rule) continue;

  let found = 0;
  const s = before.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (whole, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!rule.text.test(text)) return whole;
    found++;
    if (/\slang="/.test(attrs)) return whole;
    links++;
    const extra = ' lang="' + rule.other + '"' + (/\shreflang="/.test(attrs) ? '' : ' hreflang="' + rule.other + '"');
    return '<a' + attrs.replace(/(\shref="[^"]*")/, '$1' + extra) + '>' + inner + '</a>';
  });

  if (found !== 3) unmatched.push(file + ' (' + found + ' language links)');
  if (s !== before) { fs.writeFileSync(file, s); pages++; }
}

console.log('pages updated       :', pages);
console.log('links marked        :', links);
if (unmatched.length) console.log('not exactly 3 links :', unmatched.length, unmatched.slice(0, 8));
