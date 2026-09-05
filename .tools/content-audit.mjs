import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ').trim();

const rows = [];
for (const f of htmlPages('.')) {
  const s = fs.readFileSync(f, 'utf8');
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (s.match(/name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = (s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const words = strip(main).split(' ').filter(Boolean).length;
  const h2 = (s.match(/<h2[\s>]/g) || []).length;
  const internal = (s.match(/href="\/[a-z]/g) || []).length;
  rows.push({ f, title, desc, h1: strip(h1), words, h2, internal });
}

const en = rows.filter(r => !r.f.startsWith('el/'));
console.log('ENGLISH PAGES — thinnest first\n');
console.log('words  h2  links  page');
en.sort((a,b)=>a.words-b.words).forEach(r=>{
  console.log(String(r.words).padStart(5)+'  '+String(r.h2).padStart(2)+'  '+String(r.internal).padStart(5)+'  '+r.f);
});

const thin = en.filter(r=>r.words<300).length;
console.log('\nunder 300 words:', thin, '/', en.length);
console.log('median words   :', en.map(r=>r.words).sort((a,b)=>a-b)[Math.floor(en.length/2)]);

console.log('\n\nTITLE LENGTHS (Google truncates ~60 chars)');
const longT = en.filter(r=>r.title.length>60);
console.log('  over 60 chars:', longT.length,'/',en.length);
longT.slice(0,6).forEach(r=>console.log('   '+r.title.length+'  '+r.title));

console.log('\nDESCRIPTION LENGTHS (~155 chars)');
const badD = en.filter(r=>r.desc.length>160||r.desc.length<70);
console.log('  outside 70-160:', badD.length,'/',en.length);
badD.slice(0,5).forEach(r=>console.log('   '+r.desc.length+'  '+r.f));

console.log('\nDUPLICATE TITLES');
const seen={};en.forEach(r=>(seen[r.title]=seen[r.title]||[]).push(r.f));
const dupes=Object.entries(seen).filter(([,v])=>v.length>1);
console.log('  duplicate title groups:',dupes.length);
dupes.slice(0,5).forEach(([t,v])=>console.log('   "'+t.slice(0,55)+'" x'+v.length));
