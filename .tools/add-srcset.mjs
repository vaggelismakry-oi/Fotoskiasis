/* Add srcset/sizes to every <img> that has generated variants, and keep the
   LCP <link rel="preload"> in step so the browser preloads the SAME file it
   will actually render.

       node .tools/add-srcset.mjs           # apply
       node .tools/add-srcset.mjs --check   # report only                     */
import fs from 'node:fs';
import path from 'node:path';
import { htmlPages } from './check-structure.mjs';
import { dimensions } from './image-dimensions.mjs';

const CHECK = process.argv.includes('--check');
const WIDTHS = [480, 960];

/* Images whose src is swapped at runtime by the product gallery or the project
   lightbox. srcset wins over src, so adding one here freezes the element on
   its first photo. Their originals are ~15KB median, so nothing is lost. */
const JS_CONTROLLED = ['data-stage-img', 'lightbox__img'];
const isJsControlled = (tag) => JS_CONTROLLED.some((marker) => tag.includes(marker));

/* How wide the image actually renders, by the container it sits in.
   Ordered most-specific first — the first match wins. */
const SIZES = [
  ['pdp-thumb', '120px'],
  ['pdp-stage', '(max-width: 900px) 92vw, 560px'],
  ['prod__img', '(max-width: 700px) 45vw, 320px'],
  ['hero__bg', '100vw'],
  ['pagehero__bg', '100vw'],
  ['cta-band__bg', '100vw'],
  ['proj__img', '(max-width: 900px) 100vw, 50vw'],
  ['split__media', '(max-width: 900px) 100vw, 50vw'],
  ['post__img', '(max-width: 900px) 100vw, 50vw'],
];
const DEFAULT_SIZES = '(max-width: 900px) 100vw, 1200px';

function sizesFor(context) {
  let best = null, bestAt = -1;
  for (const [cls, value] of SIZES) {
    const at = context.lastIndexOf(cls);
    if (at > bestAt) { bestAt = at; best = value; }
  }
  return best || DEFAULT_SIZES;
}

/** Build a srcset for a local image path, or null if no variants exist. */
function srcsetFor(src) {
  if (!src || /^(https?:|data:|\/\/)/i.test(src)) return null;
  const clean = src.split('?')[0];
  if (!clean.startsWith('/images/')) return null;

  const file = clean.slice(1);
  if (!fs.existsSync(file)) return null;

  const dim = dimensions(file);
  if (!dim) return null;

  const base = clean.replace(/\.(webp|jpe?g|png)$/i, '');
  const parts = [];
  for (const w of WIDTHS) {
    const variant = base + '-' + w + 'w.webp';
    if (fs.existsSync(variant.slice(1))) parts.push(variant + ' ' + w + 'w');
  }
  if (!parts.length) return null;

  parts.push(clean + ' ' + dim.width + 'w');
  return parts.join(', ');
}

let imgs = 0, preloads = 0;

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;

  /* ---- <img> ---- */
  s = s.replace(/<img\b[^>]*>/g, (tag, offset) => {
    if (tag.includes(' srcset=') || isJsControlled(tag)) return tag;
    const m = tag.match(/\ssrc="([^"]*)"/);
    if (!m) return tag;
    const set = srcsetFor(m[1]);
    if (!set) return tag;

    const context = before.slice(Math.max(0, offset - 400), offset);
    const sizes = sizesFor(context);
    imgs++;
    return tag.replace(/\s*>$/, ' srcset="' + set + '" sizes="' + sizes + '">');
  });

  /* ---- <link rel="preload" as="image"> ----
     Skip any preload whose target is a JS-controlled image: that <img> renders
     its plain src, so preloading a variant would download a second file for
     nothing. */
  const jsControlledSrcs = new Set(
    [...before.matchAll(/<img\b[^>]*>/g)]
      .filter(([tag]) => isJsControlled(tag))
      .map(([tag]) => (tag.match(/\ssrc="([^"]*)"/) || [])[1])
      .filter(Boolean)
  );

  s = s.replace(/<link\b[^>]*rel="preload"[^>]*>/g, (tag) => {
    if (!tag.includes('as="image"') || tag.includes('imagesrcset')) return tag;
    const m = tag.match(/\shref="([^"]*)"/);
    if (!m || jsControlledSrcs.has(m[1])) return tag;
    const set = srcsetFor(m[1]);
    if (!set) return tag;
    preloads++;
    return tag.replace(/\s*>$/, ' imagesrcset="' + set + '" imagesizes="100vw">');
  });

  if (s !== before && !CHECK) fs.writeFileSync(file, s);
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('<img> given srcset      :', imgs);
console.log('preload links updated   :', preloads);
