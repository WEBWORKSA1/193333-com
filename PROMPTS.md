# Phase-wise build prompts — 193333.com

Use these in order with any capable AI coding assistant. Each phase is self-contained and assumes the previous one is merged.

---

## Phase 0 — Strategy lock

> You are building **193333.com**, a “Number Intelligence Hub”. Positioning: angel-number meanings + numerology calculators (traffic), number-science explorer (differentiation), money/business/AI calculators (RPM), with a free “Number Blueprint” lead magnet and a paid-tier “Business Number Audit”. Revenue: Google AdSense (ca-pub-6620975821265271), YouTube embeds, sponsorships, donations, contests. Constraints: static Jekyll on GitHub Pages free plan; no backend; one private inbox used for all forms, never rendered in HTML. Produce a sitemap, page inventory, and data model before writing code.

## Phase 1 — Foundation & design system

> Create a Jekyll site with `_config.yml` (collections: angels, lifepaths, guides; jekyll-sitemap), `_layouts/default|page|angel|lifepath|guide`, `_includes/head|header|footer|cta-lead|helpful`. Head must include the AdSense script `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`, the `google-adsense-account` meta, canonical, Open Graph and JSON-LD (WebSite + SearchAction; FAQPage when `page.faq` exists). Top bar on every page: “Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership” linking to https://web.works/contact. Design: dark-first with light toggle, Space Grotesk + JetBrains Mono, lime/violet accents, giant outlined “19**3333**” mark, cards, chips, number tiles, mobile nav, sticky header, accessible focus states, prefers-reduced-motion.

## Phase 2 — Number engine (JS)

> Write `assets/js/numbers.js`: Pythagorean letter map, reduce() preserving 11/22/33, lifePath (month/day/year reduced separately), name numbers (expression, soul urge with Y rule, personality), personal year, factorization, divisor count, digital root, palindrome/square/Fibonacci/triangular checks, binary/octal/hex/Roman. Wire forms by `data-tool` for: life-path, name-number, business-name, phone, compatibility, personal-year, explorer (supports `?n=`), compound, roi, break-even, loan, ai-cost. Every result shows its working and a lead nudge to the Blueprint. Add number-of-the-day widget.

## Phase 3 — Content library

> Generate 28 angel-number pages from front matter (num, core, reps, digits, digit_sum, reduction, root, prime, factors, binary, hex, related, intro) rendered by `angel.html` using `_data/digits.yml` (keyword, core, spiritual, love, twin, career, money, action[], shadow) and `_data/masters.yml`. Sections: meaning, intensity, digits inside, spiritual, love, twin flame, career, money, why you see it (frequency illusion), what to do, math table, FAQ + FAQPage/BreadcrumbList schema, related chips. Build 12 Life Path pages from `_data/lifepaths.yml` with verified worked examples. Hubs: `/angel-numbers/`, `/numerology/`, `/tools/`.

## Phase 4 — Authority guides

> Write 7 original guides (600–1,000 words, paraphrased, factual): The number 193333 decoded; Angel numbers explained; Memorable numbers in commerce; Pricing psychology; Business name numerology; The numbers that run AI; Master number 22. Include Article schema, FAQ, author box, cite-this-page.

## Phase 5 — Lead generation

> Build `/free-report/` with (a) Number Blueprint form: name, DOB, email, focus, optional business, consent → instant on-page preview (Life Path, Expression, Personal Year) after submit; (b) `#business` Business Number Audit form with company, website, stage, budget, message. Add a monthly-email signup in the footer of every page and a CTA card on every content page. All forms POST via FormSubmit AJAX to an inbox assembled at runtime from an obfuscated string (never present in HTML), with honeypot and status messages.

## Phase 6 — Monetization & community

> `/support/`: donation tiers ($3/$10/$25/$100/custom) via PayPal donate URL built at runtime; allocation bar (operations 30, marketing 25, hiring 25, contests 20). `/contests/`: monthly Number Hunt with puzzles, entry form, prizes, official rules (no purchase necessary, skill-based, void where prohibited). `/careers/`: roles + application form. `/advertise/`: sponsorship packages + inquiry form + acquisition link. `/videos/`: privacy-enhanced YouTube click-to-load facades of verified videos. Manual AdSense slots render only when slot IDs are configured; otherwise Auto ads.

## Phase 7 — Compliance & trust

> Pages: about, contact (form + hidden mailto link), privacy (AdSense/third-party cookie language, opt-out links, GDPR/CCPA rights, children), terms, disclaimer, cookies (table), trademark & copyright disclosure (no claim in the number “193333”; third-party marks; DMCA process), editorial standards, search (client-side index), 404. Add `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), robots.txt with sitemap, web manifest, favicon.

## Phase 8 — Launch & QA

> Push to `WEBWORKSA1/193333-com`, enable GitHub Pages from `main`, verify build. Check: no inbox string in rendered HTML; every page has the top bar and AdSense script; all internal links resolve; tools compute correctly (test 1990-12-25 → Life Path 11; 193333 → 7×71×389); mobile layout at 360px; Lighthouse ≥ 90. Then point DNS, set custom domain, flip `url`/`baseurl`, submit sitemap, apply to AdSense.

## Phase 9 — Scale (months 2–12)

> Expand angel pages to 0–9999 meaningful patterns (noindex thin ones), add daily/monthly horoscope-style “number forecasts”, a Chinese lucky-number checker, numeric-domain valuation tool, Supabase-backed accounts for saved Blueprints, YouTube Shorts per angel number, and sponsor-funded contest prizes.
