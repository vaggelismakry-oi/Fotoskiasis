/* Build the magazine-style case studies on every project page, EN and EL.

   Replaces the old text block + trailing photo grid with a single
   <article class="story"> in which the photographs sit beside the text
   they illustrate. Content and layout live in ./case-studies.mjs.

   Re-runnable: on later runs it replaces the existing story, so editing the
   data file and running this again is the whole workflow.

       node .tools/build-case-studies.mjs          # apply
       node .tools/build-case-studies.mjs --check  # report only              */
import fs from 'node:fs';
import { projects } from './case-studies.mjs';
import { dimensions } from './image-dimensions.mjs';

const CHECK = process.argv.includes('--check');
const ORIGIN = 'https://fotoskiasis.com';
const BACK = { en: ['/our-projects', '← All projects'], el: ['/el/our-projects', '← Όλα τα έργα'] };

const SIZES = {
  wide: '(max-width: 1240px) 100vw, 1180px',
  pair: '(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 590px',
  side: '(max-width: 820px) 100vw, (max-width: 1240px) 46vw, 540px',
};

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Image list in page order, read from the JSON-LD "image" array. */
function imageList(html) {
  const m = html.match(/"image":\[([^\]]*)\]/);
  if (!m) return null;
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1].replace(ORIGIN, ''));
}

/** First run only: image order as it appears in the old gallery grid. */
function galleryList(html) {
  const at = html.indexOf('class="pgal"');
  if (at === -1) return null;
  const end = html.indexOf('</div>', at);
  return [...html.slice(at, end).matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((x) => x[1]);
}

function img(src, alt, sizes, style) {
  const file = src.slice(1);
  const d = dimensions(file);
  if (!d) throw new Error('cannot read dimensions of ' + file);
  const base = src.replace(/\.(webp|jpe?g|png)$/i, '');
  const set = [480, 960]
    .filter((w) => fs.existsSync((base + '-' + w + 'w.webp').slice(1)))
    .map((w) => base + '-' + w + 'w.webp ' + w + 'w')
    .concat(src + ' ' + d.width + 'w');
  return '<img src="' + src + '" srcset="' + set.join(', ') + '" sizes="' + sizes + '"' +
    ' alt="' + escAttr(alt) + '" width="' + d.width + '" height="' + d.height + '"' +
    (style ? ' style="' + style + '"' : '') +
    ' loading="lazy" decoding="async">';
}

function textBlock(sec, lede) {
  return '<h2>' + escText(sec.h) + '</h2>\n      <p' + (lede ? ' class="story__lede"' : '') + '>' + sec.p + '</p>';
}

function buildStory(p, lang, images) {
  const photo = (n) => {
    const src = images[n - 1];
    if (!src) throw new Error('no photo ' + n);
    return { src, alt: p.alts[lang][n - 1] };
  };
  let ledeUsed = false;
  const lede = () => (ledeUsed ? false : (ledeUsed = true));
  const out = [];

  for (const b of p.flow) {
    if (b.text && b.side === undefined) {
      out.push('    <div class="story__col">\n      ' + textBlock(p.sections[b.text][lang], lede()) + '\n    </div>');
    } else if (b.wide) {
      const ph = photo(b.wide);
      out.push('    <figure class="story__fig">' + img(ph.src, ph.alt, SIZES.wide) +
        '<figcaption>' + b.cap[lang] + '</figcaption></figure>');
    } else if (b.pair) {
      const [a, z] = b.pair.map(photo);
      const d = dimensions(a.src.slice(1));
      const ratio = 'aspect-ratio:' + d.width + '/' + d.height;
      out.push('    <figure class="story__fig"><div class="story__pair">' +
        img(a.src, a.alt, SIZES.pair, ratio) + img(z.src, z.alt, SIZES.pair, ratio) +
        '</div><figcaption>' + b.cap[lang] + '</figcaption></figure>');
    } else if (b.side) {
      const ph = photo(b.side);
      out.push('    <div class="story__side' + (b.flip ? ' story__side--flip' : '') + '">' +
        '<figure class="story__side-fig">' + img(ph.src, ph.alt, SIZES.side) +
        '<figcaption>' + b.cap[lang] + '</figcaption></figure>' +
        '<div class="story__col">\n      ' + textBlock(p.sections[b.text][lang], lede()) + '\n    </div></div>');
    } else if (b.quote) {
      out.push('    <blockquote class="story__quote"><p>' + escText(p.quote[lang]) + '</p></blockquote>');
    }
  }

  const [href, label] = BACK[lang];
  out.push('    <p class="story__back"><a href="' + href + '">' + label + '</a></p>');
  return '<article class="story" data-case-study>\n' + out.join('\n') + '\n  </article>';
}

let built = 0;
const problems = [];

for (const [slug, p] of Object.entries(projects)) {
  for (const lang of ['en', 'el']) {
    const file = (lang === 'el' ? 'el/' : '') + 'projects/' + slug + '.html';
    if (!fs.existsSync(file)) { problems.push(file + ': missing'); continue; }
    const html = fs.readFileSync(file, 'utf8');

    const images = imageList(html);
    if (!images) { problems.push(file + ': no JSON-LD image list'); continue; }
    if (images.length !== p.alts[lang].length) {
      problems.push(file + ': ' + images.length + ' photos on page, ' + p.alts[lang].length + ' alts in data');
      continue;
    }

    // Guard: on the first run, the grid order must match the JSON-LD order,
    // because every alt and caption is keyed to that numbering.
    const grid = galleryList(html);
    if (grid && grid.join('|') !== images.join('|')) {
      problems.push(file + ': gallery order differs from JSON-LD order — refusing to guess');
      continue;
    }

    let start, end;
    if (html.includes('<article class="story"')) {
      start = html.indexOf('<article class="story"');
      end = html.indexOf('</article>', start) + '</article>'.length;
    } else {
      start = html.indexOf('<section class="section" data-case-study>');
      const pgal = html.indexOf('class="pgal"');
      end = html.indexOf('</section>', pgal) + '</section>'.length;
      if (start === -1 || pgal === -1 || end < start) { problems.push(file + ': could not find the old story + gallery'); continue; }
    }

    const story = buildStory(p, lang, images);
    const next = html.slice(0, start) + story + html.slice(end);
    if (!CHECK) fs.writeFileSync(file, next);
    built++;
  }
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('case studies built:', built);
if (problems.length) { console.log('problems:'); problems.forEach((x) => console.log('  ' + x)); process.exitCode = 1; }
