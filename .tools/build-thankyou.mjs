/* Build /thank-you and /el/thank-you by reusing the privacy page's shell,
   so header, footer, styles and scripts stay identical to the rest of the
   site with no new boilerplate to maintain.

   The page exists so Google Ads has a clean conversion URL, and so visitors
   without JavaScript still land somewhere sensible after submitting. */
import fs from 'node:fs';

const COPY = {
  en: {
    source: 'privacy.html',
    out: 'thank-you.html',
    title: 'Thank you | fotoskiasis',
    description: 'Your consultation request has reached the fotoskiasis studio. We reply within one business day.',
    canonical: 'https://fotoskiasis.com/thank-you',
    crumbHome: 'Home',
    crumb: 'Thank you',
    h1: 'Thank you',
    lead: 'Your request has reached the studio.',
    body: 'A member of our team will be in touch within one business day. If your enquiry is urgent, call us on <a href="tel:+306972118444">+30 697 211 8444</a> or message us on <a href="https://wa.me/306972118444" target="_blank" rel="noopener">WhatsApp</a>.',
    ctaPrimary: 'Back to home',
    ctaPrimaryHref: '/',
    ctaGhost: 'Browse the shop',
    ctaGhostHref: '/shop',
  },
  el: {
    source: 'el/privacy.html',
    out: 'el/thank-you.html',
    title: 'Ευχαριστούμε | fotoskiasis',
    description: 'Το αίτημά σας έφτασε στο studio της fotoskiasis. Απαντάμε εντός μίας εργάσιμης ημέρας.',
    canonical: 'https://fotoskiasis.com/el/thank-you',
    crumbHome: 'Αρχική',
    crumb: 'Ευχαριστούμε',
    h1: 'Ευχαριστούμε',
    lead: 'Το αίτημά σας έφτασε στο studio.',
    body: 'Κάποιος από την ομάδα μας θα επικοινωνήσει μαζί σας εντός μίας εργάσιμης ημέρας. Αν το αίτημά σας είναι επείγον, καλέστε μας στο <a href="tel:+306972118444">+30 697 211 8444</a> ή στείλτε μήνυμα στο <a href="https://wa.me/306972118444" target="_blank" rel="noopener">WhatsApp</a>.',
    ctaPrimary: 'Επιστροφή στην αρχική',
    ctaPrimaryHref: '/el/',
    ctaGhost: 'Δείτε το κατάστημα',
    ctaGhostHref: '/el/shop',
  },
};

const HREFLANG =
  '<link rel="alternate" hreflang="en" href="https://fotoskiasis.com/thank-you">' +
  '<link rel="alternate" hreflang="el" href="https://fotoskiasis.com/el/thank-you">' +
  '<link rel="alternate" hreflang="x-default" href="https://fotoskiasis.com/thank-you">';

/** Replace the value inside attr="..." for the element containing `anchor`. */
function setAttrAfter(html, anchor, attr, value) {
  const i = html.indexOf(anchor);
  if (i === -1) return html;
  const j = html.indexOf(attr + '="', i);
  if (j === -1) return html;
  const start = j + attr.length + 2;
  const end = html.indexOf('"', start);
  return html.slice(0, start) + value + html.slice(end);
}

for (const lang of ['en', 'el']) {
  const c = COPY[lang];
  const src = fs.readFileSync(c.source, 'utf8');

  const headEnd = src.indexOf('</head>');
  const mainStart = src.indexOf('<main');
  const footerStart = src.indexOf('<footer class="footer">');

  let head = src.slice(0, headEnd);

  // title + description
  head = head.replace(/<title>[\s\S]*?<\/title>/, '<title>' + c.title + '</title>');
  head = setAttrAfter(head, 'name="description"', 'content', c.description);

  // canonical + hreflang
  head = setAttrAfter(head, 'rel="canonical"', 'href', c.canonical);
  head = head.replace(/<link rel="alternate" hreflang="en"[^>]*><link rel="alternate" hreflang="el"[^>]*><link rel="alternate" hreflang="x-default"[^>]*>/, HREFLANG);

  // keep it out of the index — it is a conversion endpoint, not content
  head = setAttrAfter(head, 'name="robots"', 'content', 'noindex, follow');

  // Open Graph
  head = setAttrAfter(head, 'property="og:title"', 'content', c.title);
  head = setAttrAfter(head, 'property="og:description"', 'content', c.description);
  head = setAttrAfter(head, 'property="og:url"', 'content', c.canonical);

  const main =
    '<main id="main" tabindex="-1"> ' +
    '<section class="pagehero"> ' +
    '<div class="pagehero__bg" aria-hidden="true"><img fetchpriority="high" src="/images/hotel-lighting-design-greece.webp" alt="" width="1092" height="1092" decoding="async"></div> ' +
    '<div class="wrap pagehero__inner"> ' +
    '<p class="crumbs"><a href="' + c.ctaPrimaryHref + '">' + c.crumbHome + '</a><span>/</span>' + c.crumb + '</p> ' +
    '<h1>' + c.h1 + '</h1> ' +
    '<p class="lead">' + c.lead + '</p> ' +
    '</div> </section> ' +
    '<section class="section"> <div class="wrap" style="max-width:46rem"> ' +
    '<p>' + c.body + '</p> ' +
    '<div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:2.4rem"> ' +
    '<a href="' + c.ctaPrimaryHref + '" class="btn btn--primary">' + c.ctaPrimary + '</a> ' +
    '<a href="' + c.ctaGhostHref + '" class="btn btn--ghost">' + c.ctaGhost + '</a> ' +
    '</div> </div> </section> </main> ';

  const tail = src.slice(footerStart);

  // fire the lead conversion once the analytics module has loaded
  const tracker =
    '\n<script>\n' +
    'window.addEventListener("load", function () {\n' +
    '  if (typeof window.fsTrackLead === "function") window.fsTrackLead();\n' +
    '});\n' +
    '</script>\n';

  const out = head + '</head>' + src.slice(headEnd + 7, mainStart) + main + tail.replace('</body>', tracker + '</body>');

  fs.writeFileSync(c.out, out);
  console.log('wrote', c.out, '(' + out.length + ' bytes)');
}
