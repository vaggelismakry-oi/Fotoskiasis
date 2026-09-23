/* Project pages open on their photograph.

   Converts each project page's plain intro <article> into a full-bleed
   .pagehero--project using the lead gallery photograph. That also fixes
   the header on these pages: it was transparent, near-white text on cream
   (≈1.05:1) until the visitor scrolled.

   The lead image keeps its place in the gallery, but is demoted from
   eager/high-priority to lazy there — the hero is now the LCP element, and
   the existing <link rel=preload imagesizes="100vw"> already matches it.

       node .tools/add-project-heroes.mjs          # apply
       node .tools/add-project-heroes.mjs --check  # report only              */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const CHECK = process.argv.includes('--check');
const INTRO_OPEN = '<article class="section" style="padding-top:7rem">';

const attr = (tag, name) => {
  const m = tag.match(new RegExp('\\s' + name + '="([^"]*)"'));
  return m ? m[1] : null;
};

let done = 0;
const skipped = [];

for (const file of htmlPages('.').filter((f) => /^(el\/)?projects\/[^/]+\.html$/.test(f))) {
  const before = fs.readFileSync(file, 'utf8');
  if (before.includes('pagehero--project')) continue;

  const open = before.indexOf(INTRO_OPEN);
  if (open === -1) { skipped.push(file + ' (intro not found)'); continue; }
  const close = before.indexOf('</article>', open);
  if (close === -1) { skipped.push(file + ' (no </article>)'); continue; }

  // the lead photograph is the first gallery image
  const gal = before.indexOf('class="pgal__item"');
  const imgStart = before.indexOf('<img', gal);
  const imgEnd = before.indexOf('>', imgStart) + 1;
  if (gal === -1 || imgStart === -1) { skipped.push(file + ' (no gallery image)'); continue; }
  const lead = before.slice(imgStart, imgEnd);

  const src = attr(lead, 'src');
  const srcset = attr(lead, 'srcset');
  const w = attr(lead, 'width');
  const h = attr(lead, 'height');

  const heroImg =
    '<img src="' + src + '"' +
    (srcset ? ' srcset="' + srcset + '" sizes="100vw"' : '') +
    ' alt="" width="' + w + '" height="' + h + '"' +
    ' fetchpriority="high" decoding="async">';

  // 1. intro article -> photographic hero
  const introInner = before.slice(open + INTRO_OPEN.length, close)
    .replace('<div class="wrap">', '<div class="wrap pagehero__inner">');

  const hero =
    '<section class="pagehero pagehero--project">\n' +
    '    <div class="pagehero__bg" aria-hidden="true">' + heroImg + '</div>' +
    introInner +
    '</section>';

  let s = before.slice(0, open) + hero + before.slice(close + '</article>'.length);

  // 2. the same photograph in the gallery is now below the fold
  const demoted = lead
    .replace(/\sfetchpriority="high"/, '')
    .replace(/\sloading="eager"/, ' loading="lazy"');
  s = s.replace(lead, demoted);

  if (!CHECK) fs.writeFileSync(file, s);
  done++;
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('project pages given a photographic hero:', done);
if (skipped.length) console.log('skipped:', skipped);
