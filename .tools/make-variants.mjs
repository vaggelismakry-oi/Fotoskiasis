/* Generate smaller WebP variants beside every large source image, so phones
   stop downloading desktop-sized photography.

     images/hero.webp  ->  images/hero-480w.webp
                           images/hero-960w.webp

   Idempotent: an existing, newer variant is left alone.

       node .tools/make-variants.mjs           # generate
       node .tools/make-variants.mjs --check   # report only                  */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { dimensions } from './image-dimensions.mjs';

const WIDTHS = [480, 960];
const QUALITY = 78;
const CHECK = process.argv.includes('--check');

const isVariant = (name) => /-\d+w\.webp$/i.test(name);

const sources = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name) && !isVariant(entry.name)) sources.push(p);
  }
})('images');

let made = 0, skipped = 0, reused = 0, bytes = 0;
const jobs = [];

for (const src of sources) {
  const d = dimensions(src);
  if (!d) continue;
  const base = src.replace(/\.(webp|jpe?g|png)$/i, '');

  for (const w of WIDTHS) {
    // never upscale, and don't bother when the gain is trivial
    if (d.width <= w * 1.15) { skipped++; continue; }
    const out = base + '-' + w + 'w.webp';

    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
      reused++;
      continue;
    }
    if (CHECK) { made++; continue; }

    jobs.push(
      sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out)
        .then((info) => { made++; bytes += info.size; })
        .catch((err) => console.error('  FAILED', out, err.message))
    );
  }
}

const CONCURRENCY = 8;
for (let i = 0; i < jobs.length; i += CONCURRENCY) {
  await Promise.all(jobs.slice(i, i + CONCURRENCY));
}

console.log(CHECK ? '--- check only ---' : '--- generated ---');
console.log('source images   :', sources.length);
console.log('variants written:', made);
console.log('already current :', reused);
console.log('skipped (small) :', skipped);
if (!CHECK) console.log('added on disk   :', (bytes / 1048576).toFixed(1) + 'MB');
