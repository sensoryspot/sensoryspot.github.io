# Sensory SpOT Studio SEO audit

Audit date: 2026-10-30

## Current architecture

- Deploy-without-building static website: plain HTML, one shared CSS file, and minimal vanilla JavaScript.
- Hosted from the `main` branch of the `sensoryspot/sensoryspot.github.io` GitHub Pages repository.
- `CNAME` sets `www.sensoryspotstudio.com`; `.nojekyll` bypasses Jekyll processing.
- No package manager, application framework, database, server code, required build process, or GitHub Actions workflow.
- Google Fonts are the only render-time third-party asset request. System fallbacks are present.

## Existing pages and routes

| File | Public route | Purpose before this project |
| --- | --- | --- |
| `index.html` | `/` | Marketing homepage |
| `about.html` | `/about.html` | Creator background and approach |
| `resources.html` | `/resources.html` | Category overview with three placeholder cards |
| `contact.html` | `/contact.html` | Email and TPT store contact paths |
| `404.html` | GitHub Pages fallback | Custom not-found page |

Shared assets were `assets/css/styles.css`, `assets/js/main.js`, production brand images, and untouched source artwork in `assets/images/brand/originals/`.

## SEO implementation found

- Every existing HTML page had a title, meta description, canonical link, Open Graph fields, Twitter card fields, and a responsive viewport.
- Canonicals already used the preferred absolute `https://www.sensoryspotstudio.com` domain.
- The homepage used Organization JSON-LD. About, Resources, and Contact used basic WebPage/CollectionPage JSON-LD.
- The 1200 × 630 social sharing image existed at the required path.
- Semantic landmarks, skip links, one H1 per page, visible focus styles, and an accessible mobile-navigation pattern existed.
- No `sitemap.xml` or `robots.txt` existed.
- No BreadcrumbList or Article/BlogPosting structured data existed.
- No analytics, outbound event tracking, Search Console verification, or consent implementation existed.

## Identified issues

1. Homepage copy focused narrowly on sensory regulation and did not clearly describe fine motor, handwriting, movement, or learning products.
2. Resources showed “Coming soon” cards instead of the requested catalog and had no direct product links.
3. Product data had no central source of truth.
4. No editorial content targeted specific, useful search intents.
5. The About page and homepage exposed `REPLACE-WITH-PORTRAIT` and `TBD`; the biography also included an unverified “more than nine years” claim.
6. Brand copy used “Sensory SpOT” instead of the project-confirmed “Sensory SpOT Studio.”
7. Navigation had no Guides destination.
8. Sitemap, robots directives, breadcrumbs, Article schema, and WebSite schema were incomplete or absent.
9. TPT links were store-level links only, and no outbound-click metadata was available.
10. Resource images and most individual product URLs were absent from the repository. Fabricating them would violate the content rules.
11. Google Fonts add two third-party requests. The existing preload/preconnect pattern is reasonable, but local fonts would be faster if licensed files become available.

## Recommended changes

- Update the homepage hierarchy and metadata around the full resource range.
- Add a centrally maintained JSON product catalog and generate static, crawlable cards from it.
- Publish only verified direct product links; visibly distinguish unavailable links without creating dead CTAs.
- Add three substantive guide pages and a Guides index.
- Remove the portrait/name placeholders and use confirmed professional background only.
- Add unique metadata, canonical links, social fields, BreadcrumbList, and Article structured data.
- Add `sitemap.xml` and `robots.txt`.
- Add optional GA4 configuration and privacy-conscious TPT outbound-click events.
- Keep the no-build deployment model; the catalog generator is an optional maintenance tool, and its generated HTML is committed.

## Implementation decisions

- Preserve the static architecture, relative internal paths, shared CSS, minimal JavaScript, `.nojekyll`, and `CNAME`.
- Use `assets/data/products.json` as the product source of truth. `scripts/generate-product-catalog.mjs` updates the checked-in static catalog in `resources.html`; GitHub Pages still requires no build.
- Use CSS brand motifs when a verified product thumbnail is absent. These are decorative, not fake product previews.
- Include all requested products in the catalog. Only products with verified direct URLs receive a TPT listing button.
- Use the current project brief’s exact public brand “Sensory SpOT Studio” and leave original artwork unchanged.
- Do not add Product schema because prices, images, and direct URLs are incomplete and ratings/reviews are not verified.

## Validation plan

1. Start `python3 -m http.server 8000` and request every HTML page, asset, sitemap, and robots file.
2. Parse HTML to confirm one H1, unique titles/descriptions, canonical/OG alignment, local link resolution, image dimensions, and valid JSON-LD.
3. Validate product JSON and regenerate the catalog to confirm reproducibility.
4. Check all verified external URLs with HTTP requests where the environment permits.
5. Check placeholders and brand/TPT capitalization with `rg`.
6. Check 320px overflow, mobile navigation, Escape/focus behavior, desktop layout, and visual rendering in a browser.
7. Confirm the original brand asset checksums remain unchanged.
8. Run Git identity and pending-commit checks. Do not commit or push without explicit authorization.
