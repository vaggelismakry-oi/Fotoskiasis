# Fotoskiasis — Website

Bilingual (English / Greek) website for **Fotoskiasis**, an architectural & hospitality
lighting design studio in Athens, Greece. Live at https://fotoskiasis.com

This is a **pre-built static site** — plain HTML, CSS and JS. There is **no build step**;
the files are hosted exactly as they are.

## Structure
- `index.html`, `shop.html`, `our-projects.html`, `contact.html`, … — English pages (site root)
- `el/` — the full Greek mirror of every page
- `shop/` and `el/shop/` — individual product pages
- `projects/` and `el/projects/` — individual project pages
- `thank-you.html` / `el/thank-you.html` — post-enquiry page; the Google Ads conversion target (noindex)
- `images/` — all photography (WebP). `*-480w.webp` / `*-960w.webp` are generated variants — do not edit by hand
- `css/site.css` — the single stylesheet
- `js/main.js` — nav, gallery, scroll reveal, contact form
- `js/analytics.js` — **the only place measurement IDs live** (see below)
- `_headers`, `_redirects` — Cloudflare Pages security headers, caching and old-URL redirects
  (www → fotoskiasis.com is a Cloudflare Redirect Rule, not this file; see the note in `_redirects`)
- `privacy.html`, `404.html`, `sitemap.xml`, `robots.txt`
- `.tools/` — maintenance scripts (see below). Not deployed.

## Deploy
Hosted on **Cloudflare Pages**, project `fotoskiasis-preview` (direct upload), serving
fotoskiasis.com. Only the website is uploaded: `.tools/build-dist.mjs` copies it into a clean
folder, leaving out the scripts, `.github/`, dotfiles and this README.

Every push to `main` deploys through `.github/workflows/deploy.yml`, after the audits pass —
once the repository secret `CLOUDFLARE_API_TOKEN` (permission "Cloudflare Pages: Edit") exists.
To deploy by hand from this PC:

```
node .tools/audit.mjs
node .tools/build-dist.mjs
npx --yes wrangler@4 pages deploy <folder it prints> --project-name=fotoskiasis-preview --branch=main --commit-dirty=true
```

Never deploy `.` (the repository root): that publishes the scripts and CI files too.

## Setting the measurement IDs
Everything lives at the top of `js/analytics.js`:

```js
var CONFIG = {
  ga4: '',                 // GA4 Admin -> Data streams -> "G-..."
  ads: '',                 // Google Ads -> Tools -> Conversions -> "AW-..."
  adsConversionLabel: ''   // the conversion action's label
};
```

Fill these in once and every page picks them up. Leave a value empty to disable that product.
The banner uses **Google Consent Mode v2** — nothing is stored until a visitor accepts.

Search Console is verified by **DNS TXT record** on the domain, so there is no verification
meta tag in the HTML.

## Editing notes
- Edit the `.html` files directly. **Always update the English page and its Greek twin in `/el/` together.**
- Optimise new photos to WebP, ~1600px max, quality ~82, then run the variant generator.
- After editing `css/` or `js/`, re-stamp the cache-busting hashes or returning visitors keep the old file.
- A lamp page gets `Product` structured data **only when it shows a price** (with an `Offer`). Google flags
  any `Product` without a price, review or rating as invalid, so "Price on request" lamps carry none
  (`node .tools/fix-product-schema.mjs` removes any that slip in).

## Maintenance scripts

Run from the repository root. `npm install sharp` is needed only for `make-variants`.

| Command | What it does |
| --- | --- |
| `node .tools/audit.mjs` | Full pre-deploy check: placeholders, canonicals, hreflang, h1s, alt text, image dimensions, broken links. **Run this before every push.** |
| `node .tools/make-variants.mjs` | Generates `-480w` / `-960w` WebP variants for new photos, plus `-240w` for product photos (gallery thumbnails). Idempotent. |
| `node .tools/add-srcset.mjs` | Adds `srcset`/`sizes` to new `<img>` tags and refreshes existing `srcset` lists when variants change. Skips gallery images whose `src` JavaScript swaps. |
| `node .tools/fix-card-sizes.mjs` | Gives product-card photos in `.prod-grid` their measured `sizes` (add-srcset can't see the grid). |
| `node .tools/mark-language-links.mjs` | Adds `lang`/`hreflang` to the EN ↔ EL language-switch links on new pages. |
| `node .tools/fix-images.mjs` | Adds missing `width`/`height`, `loading`, `decoding`. |
| `node .tools/stamp-assets.mjs` | Re-stamps `?v=` hashes on CSS/JS across every page. Run after editing `css/` or `js/`. |
| `node .tools/build-dist.mjs` | Copies the website (without scripts, CI files and README) into a clean folder to deploy. |
| `node .tools/check-structure.mjs` | Verifies landmark tags are balanced. |
| `node .tools/check-langswitch.mjs` | Verifies the language switcher points at each page's own translation. |
| `node .tools/fix-langswitch.mjs` | Repairs it when it does not. |

After adding a page or photo, the usual sequence is:

```
node .tools/make-variants.mjs
node .tools/fix-images.mjs
node .tools/add-srcset.mjs
node .tools/fix-card-sizes.mjs
node .tools/mark-language-links.mjs
node .tools/stamp-assets.mjs
node .tools/audit.mjs
```

## Contact form
Posts to **FormSubmit**. The studio inbox is `fotoskiasis.lighting@gmail.com`.

Outstanding: the form action exposes that address in the page source. Activate the form once,
then swap the action on `contact.html` and `el/contact.html` for FormSubmit's **hashed endpoint**
(`https://formsubmit.co/<hash>`), which delivers to the same inbox without publishing it.
