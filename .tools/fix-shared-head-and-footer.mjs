/* Site-wide fixes to shared markup, found by Lighthouse on every page type.

   1. Fonts: drop the Google preconnects (fonts are self-hosted now) and preload
      the two files each language needs first.
   2. Logo link: aria-label="fotoskiasis" hid the visible tagline from its
      accessible name (label-content-name-mismatch; also breaks voice control).
   3. Footer legal link: inline opacity:.75 took it to 3.91:1; without it the
      inherited --on-dark-mut measures 6.05:1.
   4. Footer column titles were <h4>, two levels below the page's last <h2>
      (heading-order). They become <h2 class="footer__h">, styled as before.

       node .tools/fix-shared-head-and-footer.mjs                             */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const PRECONNECTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';

const preload = (f) => '<link rel="preload" href="/fonts/' + f + '" as="font" type="font/woff2" crossorigin>';
const PRELOADS = {
  en: preload('commissioner-latin.woff2') + preload('cormorant-garamond-latin.woff2'),
  el: preload('commissioner-greek.woff2') + preload('eb-garamond-greek.woff2'),
};

const n = { fonts: 0, logo: 0, legal: 0, h4: 0 };
const misses = [];

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;
  const lang = /<html lang="el"/.test(s) ? 'el' : 'en';

  if (s.includes(PRECONNECTS)) { s = s.replace(PRECONNECTS, PRELOADS[lang]); n.fonts++; }
  else if (!s.includes('/fonts/commissioner')) misses.push(file + ' (no preconnect pair)');

  s = s.replace(/(<a\b[^>]*\bclass="logo"[^>]*?)\s+aria-label="[^"]*"/g, (m, head) => { n.logo++; return head; });

  s = s.replace(/(<a class="footer__legal"[^>]*style="[^"]*?);?\s*opacity:\s*\.75/g, (m, head) => { n.legal++; return head; });

  // only inside the footer
  const f0 = s.indexOf('<footer');
  const f1 = s.indexOf('</footer>', f0);
  if (f0 !== -1 && f1 !== -1) {
    const foot = s.slice(f0, f1);
    const fixed = foot.replace(/<h4>([\s\S]*?)<\/h4>/g, (m, t) => { n.h4++; return '<h2 class="footer__h">' + t + '</h2>'; });
    s = s.slice(0, f0) + fixed + s.slice(f1);
  }

  if (s !== before) fs.writeFileSync(file, s);
}

console.log('font preconnects -> preloads :', n.fonts);
console.log('logo aria-label removed      :', n.logo);
console.log('footer legal opacity removed :', n.legal);
console.log('footer <h4> -> <h2>          :', n.h4);
if (misses.length) console.log('misses:', misses.slice(0, 5));
