/* FOTOSKIASIS — site interactions */
(function () {
  'use strict';

  /* ---- Header scroll state ---- */
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero, .pagehero');
  function onScroll() {
    if (!header) return;
    var threshold = hero ? Math.min(hero.offsetHeight - 90, 90) : 40;
    header.classList.toggle('scrolled', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile navigation ---- */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mobile-nav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', open);
    });
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mnav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Form handling — real submit via FormSubmit (emails the studio) ---- */
  var isEl = (document.documentElement.lang || '').slice(0,2) === 'el';
  var MSG = {
    sending: isEl ? 'Αποστολή…' : 'Sending…',
    sent: isEl ? 'Το μήνυμα στάλθηκε — Ευχαριστούμε' : 'Message Sent — Thank You',
    ok: isEl ? 'Ευχαριστούμε. Κάποιος από το studio μας θα επικοινωνήσει εντός μίας εργάσιμης ημέρας.' : 'Thank you. A member of our studio will be in touch within one business day.',
    err: isEl ? 'Κάτι πήγε στραβά. Στείλτε email στο fotoskiasis.lighting@gmail.com ή μήνυμα στο WhatsApp.' : 'Sorry — something went wrong. Please email fotoskiasis.lighting@gmail.com or reach us on WhatsApp.'
  };
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var note = form.querySelector('.form-result');
      if (btn) { btn.dataset.label = btn.dataset.label || btn.textContent; btn.textContent = MSG.sending; btn.disabled = true; }
      var action = form.getAttribute('action') || '';
      var url = action.indexOf('formsubmit.co/') > -1 ? action.replace('formsubmit.co/', 'formsubmit.co/ajax/') : action;
      function fail() {
        if (note) { note.textContent = MSG.err; note.style.display = 'block'; note.style.color = '#b4452f'; }
        if (btn) { btn.textContent = btn.dataset.label || 'Send'; btn.disabled = false; }
      }
      if (!url) { fail(); return; }
      fetch(url, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          if (res && (res.success === 'true' || res.success === true)) {
            if (note) { note.textContent = MSG.ok; note.style.display = 'block'; note.style.color = ''; }
            form.reset();
            if (btn) btn.textContent = MSG.sent;
          } else if (res && res.message) {
            if (note) { note.textContent = res.message; note.style.display = 'block'; note.style.color = '#b4452f'; }
            if (btn) { btn.textContent = btn.dataset.label || 'Send'; btn.disabled = false; }
          } else { fail(); }
        })
        .catch(fail);
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
