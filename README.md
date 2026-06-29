# Fotoskiasis — Website

Bilingual (English / Greek) website for **Fotoskiasis**, an architectural & hospitality
lighting design studio in Athens, Greece. Live at https://fotoskiasis.com

This is a **pre-built static site** — plain HTML, CSS and JS. There is **no build step**;
the files are hosted exactly as they are.

## Structure
- `index.html`, `shop.html`, `our-projects.html`, `contact.html`, … — English pages (site root)
- `el/` — the full Greek mirror of every page
- `shop/` and `el/shop/` — individual product pages
- `images/` — all project & product photography (WebP)
- `_astro/` — shared stylesheet · `js/main.js` — shared script (nav, gallery, contact form)
- `privacy.html`, `404.html`, `sitemap.xml`, `robots.txt`

## Deploy (any static host works)
**Recommended:** connect this repo to **Cloudflare Pages** or **Netlify**.
- Build command: *(leave empty)*
- Output / publish directory: `/` (the repository root)
- Every push to `main` then redeploys automatically.

**GitHub Pages** also works — the included `.nojekyll` file is required so the `_astro/`
folder is served. The `CNAME` file points GitHub Pages at fotoskiasis.com (delete it if you
host elsewhere and set the domain in that host's dashboard instead).

## Open tasks before going fully live
1. **Contact form** — the first submission emails a FormSubmit activation link to
   fotoskiasis.lighting@gmail.com; click it once and the form delivers from then on.
2. **Google Analytics** — replace `G-XXXXXXXXXX` (in the cookie-consent script) with your GA4 ID.
3. **Search Console** — replace `REPLACE_WITH_YOUR_GSC_TOKEN` in the homepage `<head>`, then submit `sitemap.xml`.
4. Confirm HTTPS + domain, then test the live URL on PageSpeed Insights.

## Editing notes
- Edit the `.html` files directly. **Always update the English page and its Greek twin in `/el/` together.**
- Optimise new photos to WebP, ~1600px max, quality ~82.
