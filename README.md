# 193333.com — Number Intelligence Hub

A world-class, expandable, AdSense-ready number hub: angel-number meanings, numerology calculators, a number explorer for any integer, and money/business/AI calculators — every result with the math shown.

**Stack:** Jekyll (GitHub Pages native build, free plan) · vanilla JS · no build step, no paid services.

## What's inside

| Area | Path | Notes |
|---|---|---|
| Home | `index.html` | Hero Life Path tool, number of the day, angel tiles, tools, 193333 decoded, videos, lead CTAs |
| Angel numbers | `_angels/*.md` + `_layouts/angel.html` | 28 data-driven pages (meaning, love, twin flame, career, money, math, FAQ schema) |
| Life Path | `_lifepaths/*.md` + `_data/lifepaths.yml` | 12 profiles incl. master numbers |
| Tools | `tools/*/index.html` + `assets/js/numbers.js` | 12 calculators, all client-side |
| Guides | `_guides/*.md` | 7 long-form articles with Article + FAQ schema |
| Lead gen | `free-report/` | Number Blueprint (B2C) + Business Number Audit (B2B) |
| Revenue | `support/`, `contests/`, `advertise/`, `careers/` | Donations, prize contests, sponsorships, talent |
| Compliance | `privacy/`, `terms/`, `disclaimer/`, `cookies/`, `trademark/`, `editorial-standards/`, `about/`, `contact/`, `ads.txt` | AdSense approval set |

## Add content

- **New angel number:** add `_angels/NNNN.md` with the same front matter as `_angels/3333.md` and add it to `ANGELS` in `assets/js/numbers.js`.
- **New guide:** add `_guides/slug.md` with `title`, `description`, `lead`, `category`, `minutes`, `date`.
- **Manual ad units:** paste slot IDs into `window.ADSENSE_SLOTS` in `_includes/head.html`. Auto ads work without them.

See **DEPLOY.md** for going live on 193333.com and **PROMPTS.md** for the phase-wise build prompts. Research is in **RESEARCH.md**.

© 2026 193333.com — see `/trademark/` for the trademark & copyright disclosure.
