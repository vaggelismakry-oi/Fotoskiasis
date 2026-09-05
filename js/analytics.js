/* FOTOSKIASIS — consent + analytics
   ---------------------------------------------------------------
   The ONLY place measurement IDs live. Set them here, once.
   GA4:        Admin -> Data streams -> your stream -> "G-..."
   Google Ads: Tools -> Conversions -> tag setup -> "AW-..."
   Leave a value empty to disable that product.
   --------------------------------------------------------------- */
(function () {
  'use strict';

  var CONFIG = {
    ga4: '',            /* e.g. 'G-ABCD1234EF'  */
    ads: '',            /* e.g. 'AW-123456789'  */
    adsConversionLabel: '' /* e.g. 'AbCdEfGhIj' — from the Ads conversion action */
  };

  var KEY = 'fs-consent';
  var isEl = (document.documentElement.lang || '').slice(0, 2) === 'el';
  var priv = isEl ? '/el/privacy' : '/privacy';

  var T = isEl
    ? { t: 'Χρησιμοποιούμε απαραίτητα cookies και — με τη συγκατάθεσή σας — Google Analytics για να βελτιώνουμε τον ιστότοπο.',
        a: 'Αποδοχή', d: 'Απόρριψη', m: 'Περισσότερα' }
    : { t: 'We use essential cookies and, with your consent, Google Analytics to improve this site.',
        a: 'Accept', d: 'Decline', m: 'Learn more' };

  /* ---- read stored choice ---- */
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---- gtag bootstrap ----------------------------------------------------
     Consent Mode v2. Defaults are DENIED, so no cookies and no identifiers
     are written before the visitor chooses. Google still receives cookieless
     pings it can model from, which is what keeps Ads reporting usable.
     ---------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var hasTag = !!(CONFIG.ga4 || CONFIG.ads);

  if (hasTag) {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });

    gtag('js', new Date());
    if (CONFIG.ga4) gtag('config', CONFIG.ga4, { anonymize_ip: true });
    if (CONFIG.ads) gtag('config', CONFIG.ads);

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (CONFIG.ga4 || CONFIG.ads);
    document.head.appendChild(s);
  }

  function apply(granted) {
    if (!hasTag) return;
    var v = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v
    });
  }

  /* apply any previous decision immediately */
  var saved = stored();
  if (saved === 'granted') apply(true);
  else if (saved === 'denied') apply(false);

  /* ---- banner ---- */
  function wire() {
    var b = document.getElementById('cookieBanner');
    if (!b) return;

    var txt = b.querySelector('.cookie-banner__text');
    var acc = b.querySelector('[data-accept]');
    var dec = b.querySelector('[data-decline]');
    if (!txt || !acc || !dec) return;

    txt.innerHTML = T.t + ' <a href="' + priv + '">' + T.m + '</a>';
    acc.textContent = T.a;
    dec.textContent = T.d;

    function decide(v) {
      store(v);
      b.classList.remove('show');
      apply(v === 'granted');
    }
    acc.addEventListener('click', function () { decide('granted'); });
    dec.addEventListener('click', function () { decide('denied'); });

    if (!saved) b.classList.add('show');

    /* let the privacy page re-open the choice */
    window.fsConsent = {
      reopen: function () { b.classList.add('show'); },
      status: function () { return stored() || 'unset'; }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }

  /* ---- conversion helper — called by the thank-you page ---- */
  window.fsTrackLead = function () {
    if (!hasTag) return;
    if (CONFIG.ga4) gtag('event', 'generate_lead', { currency: 'EUR', value: 1 });
    if (CONFIG.ads && CONFIG.adsConversionLabel) {
      gtag('event', 'conversion', { send_to: CONFIG.ads + '/' + CONFIG.adsConversionLabel });
    }
  };
})();
