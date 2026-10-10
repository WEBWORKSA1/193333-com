# Deploy & monetize 193333.com

## 1. GitHub Pages (free plan)

Repo: `WEBWORKSA1/193333-com` (public). Settings → Pages → **Build and deployment: Deploy from a branch → `main` / `(root)`**. GitHub builds Jekyll automatically. Live preview: `https://webworksa1.github.io/193333-com/`.

## 2. Point the custom domain

At the registrar for 193333.com set:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | webworksa1.github.io |

Then:
1. Settings → Pages → Custom domain: `193333.com` → Save (this creates a `CNAME` file).
2. Tick **Enforce HTTPS** once the certificate is issued.
3. In `_config.yml` change `url: "https://193333.com"` and `baseurl: ""`. Commit.

## 3. Forms (hidden inbox)

All forms post via FormSubmit to the private inbox, which is assembled in JS at runtime and never rendered in the HTML. The **first** submission triggers a one-time activation email from FormSubmit — click **Activate** in that email. Optional: FormSubmit then shows a random alias string; you can replace the inbox call in `assets/js/main.js` with that alias for extra privacy.

## 4. Donations

Donate buttons open PayPal's donation page for the same private inbox. The inbox must be a PayPal account (or create one with it) to receive funds.

## 5. AdSense approval checklist

- [x] AdSense script on every page (`_includes/head.html`) + `google-adsense-account` meta
- [x] `ads.txt` at the root (works once the custom domain is live)
- [x] Privacy, cookies, terms, disclaimer, about, contact, editorial standards
- [x] 80+ pages of original content, clear navigation, mobile-first, fast static pages
- [ ] Add the site in AdSense → Sites → `193333.com` (custom domain, not github.io)
- [ ] AdSense → Privacy & messaging → create the **European regulations** message (Google-certified CMP)
- [ ] Turn on **Auto ads**; optionally add manual slot IDs to `window.ADSENSE_SLOTS`
- [ ] Submit `https://193333.com/sitemap.xml` in Google Search Console

## 6. Monthly operations

- Update the contest notice and puzzles in `contests/index.html` on the 1st of each month.
- Publish 4–8 new angel-number or guide pages per month.
- Rotate one sponsored tool once traffic passes ~10k monthly visits.
