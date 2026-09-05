/* Add geo coordinates, hasMap and the Google Business Profile to every
   LocalBusiness/ProfessionalService block.

   Coordinates and CID were read from the studio's own verified Google
   Business Profile listing — not geocoded or guessed. */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const LAT = 37.9115697;
const LON = 23.7419792;
const CID = '1155608268373542686';                       // 0x10098b98efe8c71e
const MAPS = 'https://maps.google.com/?cid=' + CID;

const GEO = '"geo":{"@type":"GeoCoordinates","latitude":' + LAT + ',"longitude":' + LON + '},"hasMap":"' + MAPS + '",';

let touched = 0, blocks = 0;

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  let s = before;

  // 1. insert geo + hasMap just before "address" in the business block
  s = s.replace(/("@type":\s*"(?:ProfessionalService|LocalBusiness)"[\s\S]{0,900}?)("address":)/g,
    (m, head, addr) => {
      if (head.includes('"geo"')) return m;
      blocks++;
      return head + GEO + addr;
    });

  // 2. add the Business Profile to sameAs
  s = s.replace(/"sameAs":\s*\[([^\]]*)\]/g, (m, inner) => {
    if (inner.includes('maps.google.com/?cid=')) return m;
    return '"sameAs":[' + inner + ',"' + MAPS + '"]';
  });

  if (s !== before) { fs.writeFileSync(file, s); touched++; }
}

console.log('pages updated      :', touched);
console.log('business blocks got geo/hasMap:', blocks);
console.log('coordinates        :', LAT + ', ' + LON);
console.log('profile            :', MAPS);
