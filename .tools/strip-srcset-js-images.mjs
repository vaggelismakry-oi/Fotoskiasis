/* One-off: remove srcset/sizes from images whose src is swapped by JavaScript.
   add-srcset.mjs now skips these, so this only cleans up what it already wrote. */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const MARKERS = ['data-stage-img', 'lightbox__img'];
let stripped = 0;

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(/<img\b[^>]*>/g, (tag) => {
    if (!MARKERS.some((m) => tag.includes(m))) return tag;
    if (!tag.includes(' srcset=')) return tag;
    stripped++;
    return tag
      .replace(/\s+srcset="[^"]*"/, '')
      .replace(/\s+sizes="[^"]*"/, '');
  });
  if (after !== before) fs.writeFileSync(file, after);
}
console.log('srcset removed from JS-controlled images:', stripped);

/* Also drop imagesrcset/imagesizes from preloads that target those images. */
let preloads = 0;
for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const jsSrcs = new Set(
    [...before.matchAll(/<img\b[^>]*>/g)]
      .filter(([tag]) => MARKERS.some((m) => tag.includes(m)))
      .map(([tag]) => (tag.match(/\ssrc="([^"]*)"/) || [])[1])
      .filter(Boolean)
  );
  if (!jsSrcs.size) continue;

  const after = before.replace(/<link\b[^>]*rel="preload"[^>]*>/g, (tag) => {
    const m = tag.match(/\shref="([^"]*)"/);
    if (!m || !jsSrcs.has(m[1]) || !tag.includes('imagesrcset')) return tag;
    preloads++;
    return tag.replace(/\s+imagesrcset="[^"]*"/, '').replace(/\s+imagesizes="[^"]*"/, '');
  });
  if (after !== before) fs.writeFileSync(file, after);
}
console.log('preload imagesrcset removed:', preloads);
