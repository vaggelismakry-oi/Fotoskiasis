/* Expand the project pages from ~85-word stubs into real case studies, and
   replace the placeholder gallery alt text ("photo 2", "photo 3"…) with
   descriptions of what is actually in each photograph.

       node .tools/build-case-studies.mjs          # apply
       node .tools/build-case-studies.mjs --check  # report only              */
import fs from 'node:fs';
import { projects } from './case-studies.mjs';

const CHECK = process.argv.includes('--check');
const MARKER = 'data-case-study';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sectionHtml(c) {
  return (
    '\n  <section class="section" ' + MARKER + '>\n' +
    '    <div class="wrap" style="max-width:46rem">\n' +
    '      <h2>' + esc(c.space) + '</h2>\n' +
    '      <p>' + c.spaceBody + '</p>\n' +
    '      <h2>' + esc(c.approach) + '</h2>\n' +
    '      <p>' + c.approachBody + '</p>\n' +
    '      <h2>' + esc(c.detail) + '</h2>\n' +
    '      <p>' + c.detailBody + '</p>\n' +
    '    </div>\n' +
    '  </section>\n'
  );
}

let pagesDone = 0, altsFixed = 0;
const skipped = [];

for (const [slug, data] of Object.entries(projects)) {
  for (const lang of ['en', 'el']) {
    const file = (lang === 'el' ? 'el/projects/' : 'projects/') + slug + '.html';
    if (!fs.existsSync(file)) { skipped.push(file + ' (missing)'); continue; }

    const before = fs.readFileSync(file, 'utf8');
    let s = before;

    // 1. case-study prose, inserted after the intro article
    if (!s.includes(MARKER)) {
      const close = s.indexOf('</article>');
      if (close === -1) { skipped.push(file + ' (no </article>)'); continue; }
      const at = close + 10;
      s = s.slice(0, at) + sectionHtml(data[lang]) + s.slice(at);
    }

    // 2. descriptive alt text on the gallery images
    let n = 0;
    s = s.replace(/<img\b[^>]*\salt="([^"]*)"[^>]*>/g, (tag, alt) => {
      const m = alt.match(/\(photo (\d+)\)\s*$/);
      if (!m) return tag;
      const idx = parseInt(m[1], 10) - 1;
      const next = data.alts[idx];
      if (!next) return tag;
      n++;
      return tag.replace('alt="' + alt + '"', 'alt="' + esc(next) + '"');
    });
    altsFixed += n;

    if (s !== before) {
      if (!CHECK) fs.writeFileSync(file, s);
      pagesDone++;
    }
  }
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('project pages expanded :', pagesDone);
console.log('gallery alts rewritten :', altsFixed);
if (skipped.length) console.log('skipped                :', skipped);
