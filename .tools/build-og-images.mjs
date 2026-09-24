/* Link previews (Open Graph / X) for every page.

   Each page previews with its own photograph, as a 1200×630 JPEG — the one
   size and format WhatsApp, Facebook, LinkedIn and X all render (LinkedIn has
   been unreliable with WebP, which several pages were using). Dimensions,
   type and alt text are declared so platforms can draw the card without
   fetching the image first.

     product pages  the stage photo, widened by copying its own edge pixels
     hero pages     a crop of the page's hero photograph
     everything else keeps /images/og-image-fotoskiasis.jpg (the Acropolis
                    view from Dionysos Zonars)

   Idempotent: images are only generated when missing.

       node .tools/build-og-images.mjs                                        */
import fs from 'node:fs';
import sharp from 'sharp';
import { htmlPages } from './check-structure.mjs';
import { projects } from './case-studies.mjs';

const ORIGIN = 'https://fotoskiasis.com';
const OUT = 'images/og';
const W = 1200, H = 630;
const DEFAULT = { src: '/images/og-image-fotoskiasis.jpg' };
fs.mkdirSync(OUT, { recursive: true });

const attr = (tag, name) => (tag.match(new RegExp('\\s' + name + '="([^"]*)"')) || [])[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const made = new Map();
async function ogFor(src, mode) {
  const key = src + '|' + mode;
  if (made.has(key)) return made.get(key);
  const base = src.split('/').pop().replace(/\.(webp|jpe?g|png)$/i, '');
  const out = OUT + '/' + base + '.jpg';
  if (!fs.existsSync(out)) {
    const file = src.slice(1);
    let img;
    if (mode === 'contain') {
      // Fit the product photo to the card's height, then widen it by copying
      // its own edge pixels outward. A flat fill leaves a visible box around
      // photos shot on a graded studio background; copied edges continue the
      // gradient, so the card reads as one seamless photograph.
      const fitted = await sharp(file).resize({ height: H, width: W, fit: 'inside' }).toBuffer();
      const m = await sharp(fitted).metadata();
      const padX = W - m.width, padY = H - m.height;
      img = sharp(fitted).extend({
        left: Math.floor(padX / 2), right: Math.ceil(padX / 2),
        top: Math.floor(padY / 2), bottom: Math.ceil(padY / 2),
        extendWith: 'copy',
      });
    } else {
      img = sharp(file).resize(W, H, { fit: 'cover', position: sharp.strategy.attention });
    }
    await img.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(out);
  }
  const url = '/' + out;
  made.set(key, url);
  return url;
}

let pages = 0, generated = 0;
const before = new Set(fs.readdirSync(OUT));

for (const file of htmlPages('.')) {
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes('property="og:image"')) continue;
  const lang = /<html lang="el"/.test(s) ? 'el' : 'en';
  const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const title = decode((s.match(/property="og:title" content="([^"]*)"/) || [])[1] || '').replace(/\s*\|\s*fotoskiasis$/i, '');

  let url, alt;
  const stage = main.match(/<img\b[^>]*data-stage-img[^>]*>/);
  const hero = main.match(/<div class="(?:pagehero|hero)__bg"[^>]*>\s*<img\b[^>]*>/);
  const slug = (file.match(/projects\/([^/.]+)\.html$/) || [])[1];

  if (stage) {
    const tag = stage[0];
    url = await ogFor(attr(tag, 'src'), 'contain');
    alt = decode(attr(tag, 'alt') || '') || title;
  } else if (hero && !/(^|\/)index\.html$/.test(file)) {
    const tag = hero[0].match(/<img\b[^>]*>/)[0];
    url = await ogFor(attr(tag, 'src'), 'cover');
    alt = (slug && projects[slug] && projects[slug].alts[lang][0]) || decode(attr(tag, 'alt') || '') || title;
  } else {
    url = DEFAULT.src;
    alt = lang === 'el'
      ? 'Το Dionysos Zonars με την φωταγωγημένη Ακρόπολη πίσω από το τζάμι — φωτισμός από τη Fotoskiasis'
      : 'Dionysos Zonars with the floodlit Acropolis beyond the glazing — lighting by Fotoskiasis';
  }

  const abs = ORIGIN + url;
  const next = s
    .replace(/<meta property="og:image" content="[^"]*">/, '<meta property="og:image" content="' + abs + '">')
    .replace(/<meta name="twitter:image" content="[^"]*">/, '<meta name="twitter:image" content="' + abs + '">')
    .replace(/<meta property="og:image:(width|height|type|alt)" content="[^"]*">/g, '')
    .replace(/<meta name="twitter:image:alt" content="[^"]*">/g, '');
  const dims =
    '<meta property="og:image:width" content="' + W + '">' +
    '<meta property="og:image:height" content="' + H + '">' +
    '<meta property="og:image:type" content="image/jpeg">' +
    '<meta property="og:image:alt" content="' + escAttr(alt) + '">' +
    (next.includes('name="twitter:card"') ? '<meta name="twitter:image:alt" content="' + escAttr(alt) + '">' : '');
  const out = next.replace(/(<meta property="og:image" content="[^"]*">)/, '$1' + dims);

  if (out !== s) { fs.writeFileSync(file, out); pages++; }
}

generated = fs.readdirSync(OUT).filter((f) => !before.has(f)).length;
console.log('pages given a proper preview :', pages);
console.log('preview images generated     :', generated, '(in /images/og)');
