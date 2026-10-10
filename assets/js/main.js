/* 193333.com — core site script. No external dependencies. */
(function () {
  'use strict';
  var BASE = (document.documentElement.getAttribute('data-base') || '');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  /* Root-relative links in Markdown content: prefix the site base path when served from a sub-folder */
  if (BASE) $$('a[href^="/"]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h.indexOf('//') !== 0 && h !== BASE && h.indexOf(BASE + '/') !== 0) a.setAttribute('href', BASE + h);
  });
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Private contact routing (address is never rendered on the page) ---------- */
  var _r = ['=02bj5Cbp', 'FWbnBUMhN3', 'ay92diV2d'];
  function inbox() { return atob(_r.join('').split('').reverse().join('')); }
  $$('[data-mail]').forEach(function (a) {
    a.setAttribute('href', '#contact');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var subj = a.getAttribute('data-mail') || '193333.com inquiry';
      window.location.href = 'mai' + 'lto:' + inbox() + '?subject=' + encodeURIComponent(subj);
    });
  });

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var saved = store.get('theme');
  if (saved) root.setAttribute('data-theme', saved);
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') ||
        (window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next); store.set('theme', next);
    });
  });

  /* ---------- Mobile nav ---------- */
  var navBtn = $('[data-nav-toggle]'), nav = $('#site-nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ---------- Cookie notice ---------- */
  var cb = $('#cookie-banner');
  if (cb && !store.get('cookie-ok')) cb.hidden = false;
  $$('[data-cookie-accept]').forEach(function (b) {
    b.addEventListener('click', function () { store.set('cookie-ok', '1'); if (cb) cb.hidden = true; });
  });

  /* ---------- Toast ---------- */
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }
  window.toast193 = toast;

  /* ---------- Forms (lead gen, contact, careers, contests, advertise) ---------- */
  $$('form[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f._honey && f._honey.value) return;
      var btn = f.querySelector('[type=submit]');
      var status = f.querySelector('.form-status');
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      data._subject = '[193333.com] ' + (f.getAttribute('data-form') || 'Form') + ' submission';
      data._template = 'table';
      data._captcha = 'false';
      data.page = location.href;
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      fetch('https://formsubmit.co/ajax/' + inbox(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function () {
          f.reset();
          if (status) { status.className = 'form-status ok'; status.textContent = f.getAttribute('data-success') || 'Thank you — your message has been received. We reply within 2 business days.'; }
          toast('Sent ✓');
          if (typeof f._after === 'function') f._after(data);
        })
        .catch(function () {
          if (status) { status.className = 'form-status err'; status.textContent = 'Network issue — please try again in a moment.'; }
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } });
    });
  });

  /* ---------- Donations ---------- */
  function donate(amount) {
    var url = 'https://www.paypal.com/donate?business=' + encodeURIComponent(inbox()) +
      '&currency_code=USD&item_name=' + encodeURIComponent('Support 193333.com') +
      (amount ? '&amount=' + encodeURIComponent(amount) : '');
    window.open(url, '_blank', 'noopener');
  }
  $$('[data-donate]').forEach(function (b) {
    b.addEventListener('click', function () {
      var amt = b.getAttribute('data-donate');
      if (amt === 'custom') { var c = $('#custom-amount'); amt = c && c.value ? c.value : ''; }
      donate(amt);
    });
  });

  /* ---------- Share & helpful ---------- */
  $$('[data-share]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = { title: document.title, url: location.href };
      if (navigator.share) navigator.share(d).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { toast('Link copied'); });
    });
  });
  $$('[data-helpful]').forEach(function (b) {
    b.addEventListener('click', function () {
      var w = b.closest('.helpful'); if (w) w.innerHTML = '<p>Thanks for the feedback — it shapes what we publish next.</p>';
    });
  });

  /* ---------- YouTube facade (privacy-enhanced, loads on click) ---------- */
  $$('.yt').forEach(function (el) {
    var id = el.getAttribute('data-id');
    el.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';
    var play = function () {
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0" title="' + (el.getAttribute('data-title') || 'Video') +
        '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    };
    el.addEventListener('click', play, { once: true });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }, { once: true });
  });

  /* ---------- Manual AdSense units (only render when a slot ID is configured) ---------- */
  var SLOTS = window.ADSENSE_SLOTS || {};
  $$('.ad-slot').forEach(function (el) {
    var key = el.getAttribute('data-slot'); var id = SLOTS[key];
    if (!id) { el.remove(); return; }
    el.innerHTML = '<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6620975821265271" data-ad-slot="' + id + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });

  /* ---------- Site search ---------- */
  document.addEventListener('DOMContentLoaded', function () {
  var sIn = $('#site-search');
  if (sIn && window.SEARCH_INDEX) {
    var out = $('#search-results');
    var run = function () {
      var q = sIn.value.trim().toLowerCase();
      if (!q) { out.innerHTML = ''; return; }
      if (/^\d+$/.test(q)) {
        out.innerHTML = '<li><a href="' + BASE + '/tools/number-explorer/?n=' + q + '">Explore the number ' + q + ' →</a></li>';
      } else out.innerHTML = '';
      window.SEARCH_INDEX.filter(function (p) { return (p.t + ' ' + p.k).toLowerCase().indexOf(q) > -1; })
        .slice(0, 12).forEach(function (p) {
          out.insertAdjacentHTML('beforeend', '<li><a href="' + BASE + p.u + '">' + p.t + '</a></li>');
        });
    };
    sIn.addEventListener('input', run);
    var qp = new URLSearchParams(location.search).get('q'); if (qp) { sIn.value = qp; run(); }
  }
  });

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();
