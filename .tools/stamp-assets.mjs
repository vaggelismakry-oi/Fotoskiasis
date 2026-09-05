/* Re-stamp ?v= cache-busting hashes on CSS/JS across every HTML page.
   Run this after editing anything in css/ or js/:

       node .tools/stamp-assets.mjs

   Without it, returning visitors keep serving the cached old file — which is
   exactly what the frozen `about-us.XsI0IpFO.css` filename used to cause. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ASSETS = ['/css/site.css', '/js/main.js', '/js/analytics.js'];

const hashOf = (p) =>
  crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 8);

const HEX = '0123456789abcdef';

/** Replace `asset` and any existing `?v=…` suffix with `asset?v=<hash>`. */
function restamp(html, asset, hash) {
  const parts = html.split(asset);
  if (parts.length === 1) return html;

  for (let i = 1; i < parts.length; i++) {
    let tail = parts[i];
    if (tail.startsWith('?v=')) {
      let j = 3;
      while (j < tail.length && HEX.includes(tail[j])) j++;
      tail = tail.slice(j);
    }
    parts[i] = tail;
  }
  return parts.join(asset + '?v=' + hash);
}

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.tools', 'node_modules'].includes(entry.name)) continue;
    const p = path.posix.join(dir.split(path.sep).join('/'), entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p.replace(/^\.\//, ''));
  }
})('.');

const stamps = {};
for (const asset of ASSETS) stamps[asset] = hashOf('.' + asset);

let touched = 0;
for (const file of pages) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const asset of ASSETS) after = restamp(after, asset, stamps[asset]);
  if (after !== before) {
    fs.writeFileSync(file, after);
    touched++;
  }
}

console.log('stamps       :', stamps);
console.log('pages updated:', touched, '/', pages.length);
