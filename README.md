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
- `_headers`, `_redirects` — Cloudflare Pages security headers, caching and the www redirect
- `privacy.html`, `404.html`, `sitemap.xml`, `robots.txt`
- `.tools/` — maintenance scripts (see below). Not served.

## Deploy
Hosted on **Cloudflare Pages**, connected to this repository.
- Build command: *(empty)*
- Output directory: `/` (repository root)
- Production branch: `main`

Every push to `main` redeploys. **If a change is not appearing on the live site, check that
the Pages project is still connected to Git** — a direct-upload project does not rebuild on push.

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

## Maintenance scripts

Run from the repository root. `npm install sharp` is needed only for `make-variants`.

| Command | What it does |
| --- | --- |
| `node .tools/audit.mjs` | Full pre-deploy check: placeholders, canonicals, hreflang, h1s, alt text, image dimensions, broken links. **Run this before every push.** |
| `node .tools/make-variants.mjs` | Generates `-480w` / `-960w` WebP variants for new photos. Idempotent. |
| `node .tools/add-srcset.mjs` | Adds `srcset`/`sizes` to new `<img>` tags. Skips gallery images whose `src` JavaScript swaps. |
| `node .tools/fix-images.mjs` | Adds missing `width`/`height`, `loading`, `decoding`. |
| `node .tools/stamp-assets.mjs` | Re-stamps `?v=` hashes on CSS/JS across every page. Run after editing `css/` or `js/`. |
| `node .tools/check-structure.mjs` | Verifies landmark tags are balanced. |
| `node .tools/check-langswitch.mjs` | Verifies the language switcher points at each page's own translation. |
| `node .tools/fix-langswitch.mjs` | Repairs it when it does not. |

After adding a page or photo, the usual sequence is:

```
node .tools/make-variants.mjs
node .tools/fix-images.mjs
node .tools/add-srcset.mjs
node .tools/stamp-assets.mjs
node .tools/audit.mjs
```

## Contact form
Posts to **FormSubmit**. The studio inbox is `fotoskiasis.lighting@gmail.com`.

Outstanding: the form action exposes that address in the page source. Activate the form once,
then swap the action on `contact.html` and `el/contact.html` for FormSubmit's **hashed endpoint**
(`https://formsubmit.co/<hash>`), which delivers to the same inbox without publishing it.
