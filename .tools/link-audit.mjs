import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const inbound = {};
for (const f of htmlPages('.')) {
  if (f.startsWith('el/')) continue;
  const s = fs.readFileSync(f, 'utf8');
  const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  for (const m of main.matchAll(/href="(\/[^"#?]*)"/g)) {
    const t = m[1];
    if (t.startsWith('/el/') || t.startsWith('/images') || t.startsWith('/css') ||
        t.startsWith('/js') || t.startsWith('/documents')) continue;
    inbound[t] = (inbound[t] || 0) + 1;
  }
}
const rows = Object.entries(inbound).sort((a,b)=>b[1]-a[1]);
const bucket = (t) => t.startsWith('/shop') ? 'SHOP'
  : t.startsWith('/projects') ? 'PROJECT'
  : ['/architectural-lighting-research','/hospitality-lighting-design','/project-details','/contact','/our-projects','/'].includes(t) ? 'SERVICE' : 'other';

console.log('IN-CONTENT INBOUND LINKS (English, inside <main>)\n');
console.log('links  type      target');
rows.slice(0,26).forEach(([t,n])=>console.log(String(n).padStart(5)+'  '+bucket(t).padEnd(8)+'  '+t));

const tot = {};
rows.forEach(([t,n]) => tot[bucket(t)] = (tot[bucket(t)]||0)+n);
console.log('\nTOTAL in-content links by destination:');
Object.entries(tot).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  '+k.padEnd(9)+v));
