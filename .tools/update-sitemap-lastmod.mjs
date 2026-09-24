/* Keep sitemap.xml's <lastmod> dates true to each page's last real change.

   Google re-crawls by these dates, and ignores them site-wide once they prove
   unreliable. By September 2026, 134 of 150 still read 2026-07-08 although
   every page had changed since.

   Each URL takes the date of the latest commit that changed its page, not
   counting commits that only re-stamped asset versions (?v=…) or image
   srcset/sizes: those change no content, and stamp-assets touches every page
   whenever the stylesheet changes. Commit first, then run this.

       node .tools/update-sitemap-lastmod.mjs           # apply
       node .tools/update-sitemap-lastmod.mjs --check   # report only        */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const CHECK = process.argv.includes('--check');
const ORIGIN = 'https://fotoskiasis.com';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 1 << 26 });

/** Page source with the parts that carry no content removed. */
const content = (html) => html
  .replace(/\?v=[0-9a-f]+/g, '')
  .replace(/\s(?:image)?(?:srcset|sizes)="[^"]*"/g, '');

function fileFor(loc) {
  const p = loc.replace(ORIGIN, '').replace(/^\//, '');
  if (p === '' || p.endsWith('/')) return p + 'index.html';
  return p + '.html';
}

function lastRealChange(file) {
  const commits = git('log', '--format=%H %cs', '--', file).trim().split('\n').filter(Boolean);
  for (const line of commits) {
    const [hash, date] = line.split(' ');
    let before = '';
    try { before = git('show', hash + '^:' + file); } catch { return date; } // added in this commit
    let after = '';
    try { after = git('show', hash + ':' + file); } catch { continue; }       // deleted in this commit
    if (content(before) !== content(after)) return date;
  }
  return null;
}

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const changed = [], missing = [];

sitemap = sitemap.replace(/(<url>\s*<loc>)([^<]+)(<\/loc>\s*<lastmod>)([^<]+)(<\/lastmod>)/g, (whole, a, loc, b, old, c) => {
  const file = fileFor(loc);
  if (!fs.existsSync(file)) { missing.push(loc); return whole; }
  const date = lastRealChange(file);
  if (!date || date <= old) return whole;
  changed.push(old + ' -> ' + date + '  ' + loc.replace(ORIGIN, ''));
  return a + loc + b + date + c;
});

if (!CHECK && changed.length) fs.writeFileSync('sitemap.xml', sitemap);
console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('lastmod updated:', changed.length);
const byDate = {}; for (const x of changed) { const d = x.split(' ')[2]; byDate[d] = (byDate[d] || 0) + 1; }
console.log('new dates      :', byDate);
if (missing.length) { console.log('no page file for:', missing); process.exitCode = 1; }
