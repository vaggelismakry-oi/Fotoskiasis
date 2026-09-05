/* Add intrinsic width/height to every <img> that lacks them (kills layout
   shift), plus decoding="async" and loading="lazy" where they are safe.

   LCP images — anything marked fetchpriority="high" — are never made lazy.

       node .tools/fix-images.mjs          # apply
       node .tools/fix-images.mjs --check  # report only, change nothing        */
import fs from 'node:fs';
import path from 'node:path';
import { dimensions } from './image-dimensions.mjs';

const CHECK = process.argv.includes('--check');

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.tools', 'node_modules'].includes(entry.name)) continue;
    const p = path.posix.join(dir.split(path.sep).join('/'), entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p.replace(/^\.\//, ''));
  }
})('.');

/** Resolve an <img src> to a file on disk, or null if it is external. */
function resolveSrc(src, pageFile) {
  if (!src || /^(https?:|data:|\/\/)/i.test(src)) return null;
  const clean = src.split('?')[0].split('#')[0];
  const rel = clean.startsWith('/')
    ? clean.slice(1)
    : path.posix.join(path.posix.dirname(pageFile), clean);
  return fs.existsSync(rel) ? rel : null;
}

const stats = { dims: 0, lazy: 0, decoding: 0, unresolved: [], noDims: [] };

for (const file of pages) {
  const before = fs.readFileSync(file, 'utf8');

  const after = before.replace(/<img\b[^>]*>/g, (tag) => {
    const srcMatch = tag.match(/\ssrc="([^"]*)"/);
    const src = srcMatch ? srcMatch[1] : null;
    const target = resolveSrc(src, file);

    let out = tag;
    const add = [];

    const hasW = /\swidth="/.test(out);
    const hasH = /\sheight="/.test(out);
    if (!hasW || !hasH) {
      if (!target) {
        if (src) stats.unresolved.push(src);
      } else {
        const d = dimensions(target);
        if (!d) stats.noDims.push(target);
        else {
          if (!hasW) add.push('width="' + d.width + '"');
          if (!hasH) add.push('height="' + d.height + '"');
          stats.dims++;
        }
      }
    }

    const isPriority = /fetchpriority="high"/.test(out);
    if (!/\sloading="/.test(out) && !isPriority) {
      add.push('loading="lazy"');
      stats.lazy++;
    }
    if (!/\sdecoding="/.test(out)) {
      add.push('decoding="async"');
      stats.decoding++;
    }

    if (!add.length) return out;
    return out.replace(/\s*>$/, ' ' + add.join(' ') + '>');
  });

  if (after !== before && !CHECK) fs.writeFileSync(file, after);
}

console.log(CHECK ? '--- check only, nothing written ---' : '--- applied ---');
console.log('width/height added :', stats.dims);
console.log('loading="lazy"     :', stats.lazy);
console.log('decoding="async"   :', stats.decoding);
console.log('external srcs      :', [...new Set(stats.unresolved)].length);
console.log('unreadable images  :', [...new Set(stats.noDims)].length, [...new Set(stats.noDims)].slice(0, 5));
