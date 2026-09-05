/* Point the header language switcher and the mobile menu's language link at
   the SAME page in the other language, using the <head> hreflang pair as the
   source of truth.

       node .tools/fix-langswitch.mjs                                        */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const ORIGIN = 'https://fotoskiasis.com';
const FLAG_EL = "viewBox=\"0 0 27 18\"";   // Greek flag
const FLAG_EN = "viewBox=\"0 0 60 30\"";   // UK flag

function hreflangPair(html) {
  const out = {};
  for (const lang of ['en', 'el']) {
    const marker = 'hreflang="' + lang + '"';
    const i = html.indexOf(marker);
    if (i === -1) continue;
    const h = html.indexOf('href="', i);
    if (h === -1) continue;
    const start = h + 6;
    out[lang] = html.slice(start, html.indexOf('"', start)).replace(ORIGIN, '') || '/';
  }
  return out;
}

/** Replace the href of the Nth <a> inside [from, to). */
function setNthAnchorHref(html, from, to, n, value) {
  let pos = from;
  for (let k = 0; k <= n; k++) {
    pos = html.indexOf('<a href="', pos);
    if (pos === -1 || pos >= to) return null;
    if (k < n) pos += 9;
  }
  const start = pos + 9;
  const end = html.indexOf('"', start);
  if (end === -1 || end >= to) return null;
  return html.slice(0, start) + value + html.slice(end);
}

let headerFixed = 0, mobileFixed = 0;
const touched = new Set();

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;

  const want = hreflangPair(s);
  if (!want.en || !want.el) continue;

  const isEl = s.includes('<html lang="el"');
  const other = isEl ? want.en : want.el;

  /* ---- header .lang switcher: first anchor = EN, second = EL ---- */
  const langAt = s.indexOf('class="lang"');
  if (langAt !== -1) {
    const end = langAt + 2600;
    const withEn = setNthAnchorHref(s, langAt, end, 0, want.en);
    if (withEn) {
      const withBoth = setNthAnchorHref(withEn, langAt, end + (withEn.length - s.length), 1, want.el);
      if (withBoth && withBoth !== s) { s = withBoth; headerFixed++; }
      else if (withEn !== s) { s = withEn; headerFixed++; }
    }
  }

  /* ---- mobile menu: the anchor carrying the flag icon ----
     Scoped to the .mobile-nav block. Both flag SVGs appear in the header
     switcher as well, so an unscoped search would rewrite the wrong anchor. */
  const navAt = s.indexOf('class="mobile-nav"');
  if (navAt !== -1) {
    const navEnd = s.indexOf('<main', navAt);
    const flagAt = Math.min(
      ...[FLAG_EL, FLAG_EN]
        .map((f) => s.indexOf(f, navAt))
        .filter((i) => i !== -1 && (navEnd === -1 || i < navEnd))
        .concat(Infinity)
    );
    if (flagAt !== Infinity) {
      const anchorAt = s.lastIndexOf('<a href="', flagAt);
      if (anchorAt !== -1 && anchorAt > navAt) {
        const start = anchorAt + 9;
        const end = s.indexOf('"', start);
        if (s.slice(start, end) !== other) {
          s = s.slice(0, start) + other + s.slice(end);
          mobileFixed++;
        }
      }
    }
  }

  if (s !== before) { fs.writeFileSync(file, s); touched.add(file); }
}

console.log('header switchers repaired :', headerFixed);
console.log('mobile lang links repaired:', mobileFixed);
console.log('files written             :', touched.size);
