/* Structured data that Search Console reports as invalid "Product snippets".

   Google validates every Product node and requires a price (offers), a review
   or a rating on each one. Two kinds had none:

   1. The homepage business profile listed the lamp shop as
      makesOffer → Offer → itemOffered: Product "Rechargeable LED Table Lamps".
      A category of lamps isn't one product; it becomes
      hasOfferCatalog → OfferCatalog, pointing at the shop.
   2. The 38 "Price on request" lamp pages carried a Product with no offer.
      Without a price, review or rating Google can never show them as product
      results, so the block only produced errors. It is removed; their
      WebSite and BreadcrumbList blocks stay. Priced pages keep Product + Offer.

   Refuses to touch a block whose JSON doesn't round-trip unchanged, so the
   rewrite can't reformat anything it wasn't asked to. Idempotent.

       node .tools/fix-product-schema.mjs                                     */
import fs from 'node:fs';
import { htmlPages } from './check-structure.mjs';

const hasSignal = (n) => n.offers || n.review || n.aggregateRating;
const isBareProduct = (n) => n && n['@type'] === 'Product' && !hasSignal(n);
const SHOP = { en: 'https://fotoskiasis.com/shop', el: 'https://fotoskiasis.com/el/shop' };

const n = { catalog: 0, removed: 0 };
const problems = [];

for (const file of htmlPages('.')) {
  const before = fs.readFileSync(file, 'utf8');
  const lang = /<html lang="el"/.test(before) ? 'el' : 'en';

  const after = before.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (whole, body) => {
    let j;
    try { j = JSON.parse(body); } catch { problems.push(file + ': unparseable JSON-LD'); return whole; }

    // 2. a price-less Product block on its own: dropped whole, so however it
    //    was formatted doesn't matter
    if (isBareProduct(j)) { n.removed++; return ''; }

    // 1. a product category offered by the business: rewritten, so the block
    //    must round-trip exactly or the rewrite would reformat it
    const bare = (j.makesOffer || []).filter((o) => isBareProduct(o.itemOffered));
    if (!bare.length) return whole;
    if (JSON.stringify(j) !== body) { problems.push(file + ': JSON-LD not minified as expected, left alone'); return whole; }
    if (bare.length > 1 || j.hasOfferCatalog) { problems.push(file + ': unexpected makesOffer shape'); return whole; }

    const rebuilt = {};
    for (const [k, v] of Object.entries(j)) {
      if (k === 'makesOffer') {
        rebuilt.makesOffer = v.filter((o) => !isBareProduct(o.itemOffered));
        rebuilt.hasOfferCatalog = { '@type': 'OfferCatalog', name: bare[0].itemOffered.name, url: SHOP[lang] };
      } else rebuilt[k] = v;
    }
    n.catalog++;
    return '<script type="application/ld+json">' + JSON.stringify(rebuilt) + '</script>';
  });

  if (after !== before) fs.writeFileSync(file, after);
}

console.log('lamp shop moved to OfferCatalog :', n.catalog);
console.log('price-less Product blocks removed:', n.removed);
if (problems.length) { console.log('problems:'); problems.forEach((p) => console.log('  ' + p)); process.exitCode = 1; }
