/* sizes for product-card photos.

   Cards in .prod-grid fell through add-srcset's table to its fallback,
   "(max-width: 900px) 100vw, 1200px", so a desktop browser fetched the
   1200–1400px originals (up to 400 KB) for a photo drawn about 200–290px wide.
   add-srcset's lookback can't see the grid from the second card onwards, so
   this looks back to the enclosing grid instead.

   Photo widths measured in the browser (the image is 88% of its card):

     viewport   4-col .prod-grid   .prod-grid--3 (guide, shop)
     1600       202                290
     1200       185                265
     1024       218 (3 cols)       218
      761       156 (3 cols)       156
      760       258 (2 cols)       258
      412       122                122
      360        99                 99

   Idempotent.

       node .tools/fix-card-sizes.mjs                                         */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const FALLBACK = 'sizes="(max-width: 900px) 100vw, 1200px"';
const SIZES = {
  four: 'sizes="(max-width: 760px) 34vw, (max-width: 1024px) 22vw, 204px"',
  three: 'sizes="(max-width: 760px) 34vw, (max-width: 1024px) 22vw, 292px"',
};

const n = { four: 0, three: 0 };
const leftovers = [];

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const s = before.replace(/<img\b[^>]*>/g, (tag, offset) => {
    if (!tag.includes(FALLBACK)) return tag;
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1] || '';

    // inside a card: the nearest link before the photo is <a class="prod ...">
    const a = before.lastIndexOf('<a ', offset);
    const card = a !== -1 && /\sclass="prod[\s"]/.test(before.slice(a, before.indexOf('>', a) + 1));
    const grid = before.lastIndexOf('class="prod-grid', offset);
    if (!card || grid === -1) { leftovers.push(file + '  ' + src); return tag; }

    const kind = before.startsWith('class="prod-grid prod-grid--3"', grid) ? 'three' : 'four';
    n[kind]++;
    return tag.replace(FALLBACK, SIZES[kind]);
  });
  if (s !== before) fs.writeFileSync(file, s);
}

console.log('4-column card photos :', n.four);
console.log('3-column card photos :', n.three);
if (leftovers.length) console.log('left on the fallback :', leftovers.length, leftovers.slice(0, 5));
