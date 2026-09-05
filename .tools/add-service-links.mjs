/* Rebalance internal linking toward the pages that win commissions.

   The site currently sends 344 in-content links to /shop and 14 to /projects,
   while /hospitality-lighting-design receives 2. For a studio selling lighting
   studies rather than lamps, that tells Google the wrong story.

   Every product page already ends with a "want this for your venue?" CTA, and
   every project page ends with a contact CTA. Both are the natural place for a
   link to the service — useful to the reader, not stuffed.

       node .tools/add-service-links.mjs          # apply
       node .tools/add-service-links.mjs --check  # report only                */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const CHECK = process.argv.includes('--check');

const COPY = {
  en: {
    service: '/hospitality-lighting-design',
    serviceLabel: 'Hospitality Lighting Design',
    studies: '/architectural-lighting-research',
    studiesLabel: 'Lighting Studies',
    contact: '/contact',
  },
  el: {
    service: '/el/hospitality-lighting-design',
    serviceLabel: 'Σχεδιασμός Φωτισμού Φιλοξενίας',
    studies: '/el/architectural-lighting-research',
    studiesLabel: 'Μελέτες Φωτισμού',
    contact: '/el/contact',
  },
};

const ghost = (href, label) =>
  ' <a href="' + href + '" class="btn btn--ghost btn--lg">' + label + '</a>';

/** Insert `html` immediately after the first primary CTA inside the cta-band. */
function injectIntoCtaBand(page, addition) {
  const band = page.indexOf('cta-band');
  if (band === -1) return null;

  const anchor = page.indexOf('class="btn btn--primary btn--lg"', band);
  if (anchor === -1) return null;

  const close = page.indexOf('</a>', anchor);
  if (close === -1) return null;

  const at = close + 4;
  return page.slice(0, at) + addition + page.slice(at);
}

/** Project pages have no cta-band — they close with a plain CTA section. */
function injectIntoClosingCta(page, addition) {
  const anchor = page.lastIndexOf('class="btn btn--primary"');
  if (anchor === -1) return null;

  const close = page.indexOf('</a>', anchor);
  if (close === -1) return null;

  const at = close + 4;
  return page.slice(0, at) + addition + page.slice(at);
}

let shop = 0, projects = 0;
const skipped = [];

for (const file of htmlPages('.')) {
  const isProduct = /^(el\/)?shop\/[^/]+\.html$/.test(file);
  const isProject = /^(el\/)?projects\/[^/]+\.html$/.test(file);
  if (!isProduct && !isProject) continue;

  const before = fs.readFileSync(file, 'utf8');
  const c = file.startsWith('el/') ? COPY.el : COPY.en;

  // already done?
  if (before.includes('class="btn btn--ghost btn--lg">' + c.serviceLabel) ||
      before.includes('class="btn btn--ghost btn--lg">' + c.studiesLabel)) continue;

  // A product links to the service that sells the venue.
  // A project is evidence for both services, so it links to both.
  const addition = isProduct
    ? ghost(c.service, c.serviceLabel)
    : ghost(c.service, c.serviceLabel) + ghost(c.studies, c.studiesLabel);

  const after = isProduct
    ? injectIntoCtaBand(before, addition)
    : injectIntoClosingCta(before, addition);
  if (!after) { skipped.push(file); continue; }

  if (!CHECK) fs.writeFileSync(file, after);
  isProduct ? shop++ : projects++;
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('product pages linked to the hospitality service :', shop);
console.log('project pages linked to lighting studies        :', projects);
console.log('skipped (no CTA band found)                     :', skipped.length, skipped.slice(0, 5));
