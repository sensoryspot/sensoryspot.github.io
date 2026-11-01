# Sensory SpOT Studio static website

Production website for **Sensory SpOT Studio**: OT-created fine motor, sensory, and learning resources for educators, therapists, and families.

## Architecture

- Plain HTML
- One shared stylesheet: `assets/css/styles.css`
- Minimal vanilla JavaScript: `assets/js/main.js`
- Optional public configuration: `assets/js/site-config.js`
- No package dependencies, framework, backend, database, or required build
- GitHub Pages deployment from `main`, with `.nojekyll` and `CNAME`

## Pages

- `index.html` — homepage
- `about.html` — verified creator background
- `resources.html` — generated static curated product showcase
- `guides/index.html` — article index
- `guides/*.html` — educational guides
- `contact.html` — public email and TPT storefront
- `404.html` — custom noindex error page

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Product catalog

Edit `assets/data/products.json`, then regenerate the checked-in static cards:

```bash
node scripts/generate-product-catalog.mjs
```

The generator is a maintenance convenience, not a deployment build. GitHub Pages serves the generated HTML directly. Product images belong in `assets/images/resources/`; unmodified supplied brand sources remain in `assets/images/brand/originals/`.

After adding or removing a public page, update the sitemap:

```bash
node scripts/generate-sitemap.mjs
```

## SEO and analytics documentation

- `docs/SEO_AUDIT.md`
- `docs/SEO_IMPLEMENTATION.md`
- `docs/CONTENT_GUIDE.md`
- `docs/ANALYTICS.md`

GA4 is disabled until a valid measurement ID is placed in `assets/js/site-config.js`. Google Search Console requires manual account and DNS verification.

## Confirmed public values

- Website: `https://www.sensoryspotstudio.com/`
- TPT store: `https://www.teacherspayteachers.com/store/sensory-spot-studio`
- Email: `support@sensoryspotstudio.com`
- Repository: `https://github.com/sensoryspot/sensoryspot.github.io`

Do not commit or push without explicit authorization. Follow `AGENTS.md` for identity, brand-asset, accessibility, and verification requirements.
