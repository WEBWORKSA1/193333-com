/* 193333.com — number engine: numerology, number facts, finance calculators. */
(function () {
  'use strict';
  var BASE = (document.documentElement.getAttribute('data-base') || '');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var MASTERS = [11, 22, 33];
  var LP_PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  var ANGELS = ['000','111','222','333','444','555','666','777','888','999','1111','2222','3333','4444','5555','6666','7777','8888','9999','1010','1212','1234','1919','2020','11','19','22','33'];

  function digitSum(n) { return String(n).replace(/\D/g, '').split('').reduce(function (a, d) { return a + (+d); }, 0); }
  function reduce(n, keepMaster) {
    var steps = [n];
    while (n > 9 && !(keepMaster !== false && MASTERS.indexOf(n) > -1)) { n = digitSum(n); steps.push(n); }
    return { value: n, steps: steps };
  }
  var LETTERS = { a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9 };
  function clean(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''); }
  function nameNumber(name, filter) {
    var s = clean(name), tot = 0, parts = [];
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], vowel = 'aeiou'.indexOf(ch) > -1 || (ch === 'y' && !/[aeiou]/.test(s[i - 1] || '') && !/[aeiou]/.test(s[i + 1] || ''));
      if (filter === 'vowels' && !vowel) continue;
      if (filter === 'consonants' && vowel) continue;
      tot += LETTERS[ch]; parts.push(ch.toUpperCase() + '=' + LETTERS[ch]);
    }
    var r = reduce(tot); r.total = tot; r.parts = parts; return r;
  }
  function lifePath(dateStr) {
    var p = (dateStr || '').split('-'); if (p.length !== 3) return null;
    var y = reduce(digitSum(p[0])).value, m = reduce(+p[1]).value, d = reduce(+p[2]).value;
    var r = reduce(y + m + d); r.parts = { year: y, month: m, day: d }; return r;
  }
  function personalYear(dateStr, year) {
    var p = (dateStr || '').split('-'); if (p.length !== 3) return null;
    return reduce(reduce(+p[1], false).value + reduce(+p[2], false).value + reduce(digitSum(year), false).value, false);
  }
  function factorize(n) {
    var f = [], m = n, p = 2;
    while (p * p <= m) { while (m % p === 0) { f.push(p); m /= p; } p += (p === 2 ? 1 : 2); }
    if (m > 1) f.push(m); return f;
  }
  function divisorCount(f) { var c = {}, r = 1; f.forEach(function (x) { c[x] = (c[x] || 0) + 1; }); Object.keys(c).forEach(function (k) { r *= c[k] + 1; }); return r; }
  function roman(n) {
    if (n < 1 || n > 3999) return '—';
    var v = [1000,900,500,400,100,90,50,40,10,9,5,4,1], s = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'], o = '';
    v.forEach(function (x, i) { while (n >= x) { o += s[i]; n -= x; } }); return o;
  }
  function isSquare(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  function isFib(n) { return isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4); }
  function isTri(n) { return isSquare(8 * n + 1); }
  function numberFacts(n) {
    var f = n > 1 ? factorize(n) : [];
    var s = String(n);
    return {
      n: n, prime: f.length === 1, factors: f, divisors: n > 1 ? divisorCount(f) : 1,
      even: n % 2 === 0, digitSum: digitSum(n), root: n === 0 ? 0 : 1 + (n - 1) % 9,
      numerology: reduce(digitSum(n) || 0).value, palindrome: s === s.split('').reverse().join(''),
      square: isSquare(n), fib: isFib(n), tri: isTri(n),
      bin: n.toString(2), oct: n.toString(8), hex: n.toString(16).toUpperCase(), roman: roman(n)
    };
  }
  var fmt = function (x, d) { return Number(x).toLocaleString(undefined, { maximumFractionDigits: d == null ? 2 : d, minimumFractionDigits: d == null ? 2 : 0 }); };
  var money = function (x) { return '$' + fmt(x); };
  window.N193 = { reduce: reduce, nameNumber: nameNumber, lifePath: lifePath, personalYear: personalYear, numberFacts: numberFacts, factorize: factorize, roman: roman };

  function lpLink(v) { return LP_PAGES.indexOf(v) > -1 ? ' <a href="' + BASE + '/numerology/life-path-' + v + '/">Read the full Life Path ' + v + ' profile →</a>' : ''; }
  function out(form, html) { var o = form.querySelector('.result'); o.innerHTML = html; o.hidden = false; o.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  function big(v, label) { return '<div class="big-num"><span>' + v + '</span><small>' + label + '</small></div>'; }

  var TOOLS = {
    'life-path': function (f) {
      var r = lifePath(f.dob.value); if (!r) return;
      out(f, big(r.value, 'Your Life Path number') +
        '<p class="steps">Month ' + r.parts.month + ' + Day ' + r.parts.day + ' + Year ' + r.parts.year + ' = ' + r.steps.join(' → ') + '</p>' +
        '<p>' + (MASTERS.indexOf(r.value) > -1 ? 'You have a <strong>master number</strong>. ' : '') + lpLink(r.value) + '</p>' + leadNudge());
    },
    'name-number': function (f) {
      var n = f.fullname.value; if (!clean(n)) return;
      var ex = nameNumber(n), su = nameNumber(n, 'vowels'), pe = nameNumber(n, 'consonants');
      out(f, '<div class="trio">' + big(ex.value, 'Expression / Destiny') + big(su.value, 'Soul Urge') + big(pe.value, 'Personality') + '</div>' +
        '<p class="steps">Letters: ' + ex.parts.join(' · ') + '<br>Total ' + ex.total + ' → ' + ex.steps.slice(1).join(' → ') + '</p>' + leadNudge());
    },
    'business-name': function (f) {
      var n = f.bizname.value; if (!clean(n)) return;
      var r = nameNumber(n);
      var traits = { 1: 'pioneering, founder-led, first-mover brands', 2: 'partnerships, agencies, service and care', 3: 'media, creative, marketing and entertainment', 4: 'construction, finance, logistics — reliability', 5: 'travel, sales, e-commerce, fast-moving consumer brands', 6: 'health, family, home, hospitality', 7: 'research, tech, analytics, premium expertise', 8: 'finance, real estate, scale and authority', 9: 'non-profits, global brands, education', 11: 'visionary platforms, inspiration, thought leadership', 22: 'infrastructure, large builds, long-term enterprises', 33: 'teaching, healing, mission-driven organizations' };
      out(f, big(r.value, 'Business name number') + '<p>Associated (in numerology tradition) with <strong>' + traits[r.value] + '</strong>.</p><p class="steps">Total ' + r.total + ' → ' + r.steps.slice(1).join(' → ') + '</p>' +
        '<p>Want a full brand-number audit of your name, domain and phone line? <a href="' + BASE + '/free-report/#business">Request a Business Number Audit →</a></p>');
    },
    'phone': function (f) {
      var d = f.phone.value.replace(/\D/g, ''); if (!d) return;
      var r = reduce(digitSum(d)); var counts = {};
      d.split('').forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      var top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; })[0];
      out(f, big(r.value, 'Phone number vibration') + '<p class="steps">Digits sum to ' + digitSum(d) + ' → ' + r.steps.slice(1).join(' → ') + '</p>' +
        '<p>Most frequent digit: <strong>' + top + '</strong> (×' + counts[top] + '). Repeated digits make numbers easier to recall — a measurable benefit for business lines.</p>');
    },
    'compatibility': function (f) {
      var a = lifePath(f.dob1.value), b = lifePath(f.dob2.value); if (!a || !b) return;
      var ra = reduce(a.value, false).value, rb = reduce(b.value, false).value;
      var groups = [[1, 5, 7], [2, 4, 8], [3, 6, 9]];
      var same = groups.some(function (g) { return g.indexOf(ra) > -1 && g.indexOf(rb) > -1; });
      var score = ra === rb ? 82 : same ? 88 : (Math.abs(ra - rb) === 1 ? 64 : 71);
      out(f, '<div class="trio">' + big(a.value, 'Person A') + big(score + '%', 'Harmony score') + big(b.value, 'Person B') + '</div><p>' +
        (same ? 'Both numbers share a classic numerology "family" — similar pace and values.' : ra === rb ? 'Same number: deep understanding, but you may amplify each other\'s blind spots.' : 'Different families: growth comes from complementing, not mirroring, each other.') +
        '</p><p class="muted">For reflection and entertainment — not a prediction about any relationship.</p>');
    },
    'personal-year': function (f) {
      var y = +f.year.value || new Date().getFullYear(); var r = personalYear(f.dob.value, y); if (!r) return;
      var themes = { 1: 'new beginnings, launches, independence', 2: 'patience, partnerships, quiet progress', 3: 'expression, visibility, social growth', 4: 'foundations, systems, hard work', 5: 'change, travel, experimentation', 6: 'home, responsibility, service', 7: 'study, reflection, strategy', 8: 'money, power, results', 9: 'completion, release, giving back' };
      out(f, big(r.value, 'Personal Year ' + y) + '<p>Theme: <strong>' + themes[r.value] + '</strong>.</p>' + leadNudge());
    },
    'explorer': function (f) {
      var raw = (f.num.value || '').replace(/\D/g, ''); if (!raw) return;
      var n = Number(raw);
      if (!Number.isSafeInteger(n)) { out(f, '<p>Please enter a whole number up to 9,007,199,254,740,991.</p>'); return; }
      var x = numberFacts(n);
      var angel = ANGELS.indexOf(raw) > -1 ? '<p><a class="btn btn-sm" href="' + BASE + '/angel-numbers/' + raw + '/">Read the angel number ' + raw + ' meaning →</a></p>' : '';
      out(f, '<h3>' + fmt(n, 0) + '</h3><table class="facts"><tbody>' +
        row('Prime?', x.prime ? 'Yes — prime' : (n < 2 ? 'Neither prime nor composite' : 'No')) +
        row('Prime factorization', x.factors.length ? x.factors.join(' × ') : '—') +
        row('Number of divisors', x.divisors) + row('Parity', x.even ? 'Even' : 'Odd') +
        row('Digit sum / digital root', x.digitSum + ' / ' + x.root) +
        row('Numerology reduction', x.numerology) + row('Palindrome', x.palindrome ? 'Yes' : 'No') +
        row('Perfect square', x.square ? 'Yes (' + Math.round(Math.sqrt(n)) + '²)' : 'No') +
        row('Fibonacci number', x.fib ? 'Yes' : 'No') + row('Triangular number', x.tri ? 'Yes' : 'No') +
        row('Binary', x.bin) + row('Octal', x.oct) + row('Hexadecimal', x.hex) + row('Roman numeral', x.roman) +
        '</tbody></table>' + angel);
      try { history.replaceState(null, '', '?n=' + raw); } catch (e) {}
    },
    'compound': function (f) {
      var P = +f.principal.value, c = +f.contrib.value || 0, r = (+f.rate.value) / 100, y = +f.years.value, k = +f.freq.value;
      if (!(y > 0)) return;
      var bal = P, rows = '', contribTotal = P;
      for (var i = 1; i <= y; i++) {
        for (var j = 0; j < k; j++) { bal = bal * (1 + r / k) + c * 12 / k; }
        contribTotal += c * 12;
        if (y <= 40) rows += '<tr><td>' + i + '</td><td>' + money(contribTotal) + '</td><td>' + money(bal - contribTotal) + '</td><td>' + money(bal) + '</td></tr>';
      }
      out(f, '<div class="trio">' + big(money(bal), 'Future value') + big(money(contribTotal), 'Total contributed') + big(money(bal - contribTotal), 'Interest earned') + '</div>' +
        '<details><summary>Year-by-year table</summary><div class="table-wrap"><table class="facts"><thead><tr><th>Year</th><th>Contributed</th><th>Interest</th><th>Balance</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>');
    },
    'roi': function (f) {
      var cost = +f.cost.value, gain = +f.gain.value, yrs = +f.years.value || 1; if (!cost) return;
      var roi = (gain - cost) / cost, ann = Math.pow(gain / cost, 1 / yrs) - 1;
      out(f, '<div class="trio">' + big(fmt(roi * 100) + '%', 'Total ROI') + big(money(gain - cost), 'Net profit') + big(isFinite(ann) ? fmt(ann * 100) + '%' : '—', 'Annualized (CAGR)') + '</div>');
    },
    'break-even': function (f) {
      var fixed = +f.fixed.value, price = +f.price.value, vc = +f.variable.value; if (!(price > vc)) { out(f, '<p>Price must be higher than variable cost per unit.</p>'); return; }
      var units = Math.ceil(fixed / (price - vc));
      out(f, '<div class="trio">' + big(fmt(units, 0), 'Break-even units') + big(money(units * price), 'Break-even revenue') + big(fmt((price - vc) / price * 100) + '%', 'Contribution margin') + '</div>');
    },
    'loan': function (f) {
      var P = +f.amount.value, r = (+f.rate.value) / 100 / 12, n = (+f.years.value) * 12; if (!(P > 0 && n > 0)) return;
      var pay = r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n));
      out(f, '<div class="trio">' + big(money(pay), 'Monthly payment') + big(money(pay * n), 'Total paid') + big(money(pay * n - P), 'Total interest') + '</div>');
    },
    'ai-cost': function (f) {
      var req = +f.requests.value, tin = +f.tin.value, tout = +f.tout.value, pin = +f.pin.value, pout = +f.pout.value;
      var perReq = (tin * pin + tout * pout) / 1e6, month = perReq * req;
      out(f, '<div class="trio">' + big(money(perReq * 1000), 'Cost per 1,000 requests') + big(money(month), 'Monthly cost') + big(money(month * 12), 'Annual cost') + '</div>' +
        '<p class="muted">Enter the current per-million-token prices from your provider\'s pricing page; prices change often.</p>');
    }
  };
  function row(a, b) { return '<tr><th scope="row">' + a + '</th><td>' + b + '</td></tr>'; }
  function leadNudge() { return '<div class="nudge">This is one number. Your free <strong>Number Blueprint</strong> combines Life Path, Expression, Soul Urge and Personal Year. <a href="' + BASE + '/free-report/">Get it free →</a></div>'; }

  $$('form[data-tool]').forEach(function (f) {
    var fn = TOOLS[f.getAttribute('data-tool')]; if (!fn) return;
    f.addEventListener('submit', function (e) { e.preventDefault(); fn(f); });
  });
  var exp = $('form[data-tool=explorer]');
  if (exp) { var q = new URLSearchParams(location.search).get('n'); if (q) { exp.num.value = q; TOOLS.explorer(exp); } }

  /* Lead form: show instant teaser after submit */
  var lead = $('form[data-form="Number Blueprint"]');
  if (lead) lead._after = function (d) {
    var lp = lifePath(d.dob || ''), ex = nameNumber(d.name || '');
    var t = $('#blueprint-teaser'); if (!t || !lp) return;
    t.innerHTML = '<h3>Your instant preview</h3><div class="trio">' + big(lp.value, 'Life Path') + big(ex.value, 'Expression') + big(personalYear(d.dob, new Date().getFullYear()).value, 'Personal Year') + '</div><p>Your full Blueprint is on its way to your inbox.' + lpLink(lp.value) + '</p>';
    t.hidden = false;
  };

  /* Number of the day */
  $$('[data-daily]').forEach(function (el) {
    var d = new Date(), ds = d.getFullYear() + '' + (d.getMonth() + 1) + d.getDate();
    var u = reduce(digitSum(ds)).value;
    var seed = (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % ANGELS.length;
    var a = ANGELS[seed];
    el.innerHTML = '<div class="daily-grid"><div>' + big(u, 'Universal day number · ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })) + '</div>' +
      '<div><p class="eyebrow">Angel number of the day</p><a class="daily-angel" href="' + BASE + '/angel-numbers/' + a + '/">' + a + '</a><p class="muted">Tap to read its meaning, math facts and what to do next.</p></div></div>';
  });
})();
