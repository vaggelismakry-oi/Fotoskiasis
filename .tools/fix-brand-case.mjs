/* The studio's name is written "Fotoskiasis", with a capital F.

   Pages wrote it in lowercase — in titles ("… | fotoskiasis"), link previews,
   structured data, body text and the logo. A capitalised proper noun also
   helps search engines tell the business apart from the Greek word
   «φωτοσκίαση» (shading in drawing and makeup), which Google's AI Overview
   was mixing into answers about the studio.

   Only the name as a word changes. Addresses stay lowercase: the domain
   (fotoskiasis.com), the e-mail (fotoskiasis.lighting@…), file names
   (og-image-fotoskiasis.jpg) and social-profile links.

   Idempotent.

       node .tools/fix-brand-case.mjs           # apply
       node .tools/fix-brand-case.mjs --check   # report only                  */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const CHECK = process.argv.includes('--check');

/* Not preceded by a character that would make it part of an address, path,
   handle or attribute token; not followed by one either. A following full
   stop counts only when a letter comes after it (fotoskiasis.com), so the
   end of a sentence ("… by fotoskiasis.") still matches. */
const BRAND = /(?<![\w./@#:=-])fotoskiasis(?![\w@-]|\.\w)/g;

let pages = 0, names = 0;
for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(BRAND, () => { names++; return 'Fotoskiasis'; });
  if (after !== before) { pages++; if (!CHECK) fs.writeFileSync(file, after); }
}

console.log(CHECK ? '--- check only ---' : '--- applied ---');
console.log('pages :', pages);
console.log('names :', names);
