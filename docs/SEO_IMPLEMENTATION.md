# SEO implementation

## Changes made

- Repositioned the homepage around OT-created sensory, fine motor, handwriting, movement, and learning activities.
- Replaced resource placeholders with a curated showcase generated from a 16-item central catalog.
- Added a Guides index and three original, practical article drafts.
- Removed public portrait and name placeholders and used only the supplied professional background.
- Added Guides to the primary and footer navigation.
- Added `robots.txt` and `sitemap.xml`.
- Added optional GA4 loading and privacy-conscious TPT outbound-click events.
- Preserved plain HTML, one shared stylesheet, minimal vanilla JavaScript, `.nojekyll`, `CNAME`, relative internal links, and build-free GitHub Pages deployment.

## Metadata strategy

Every indexable page has a unique title and meta description. Canonical, Open Graph URL/title/description, Twitter title/description, and the page’s structured data use the same page identity. The preferred canonical origin is `https://www.sensoryspotstudio.com`.

The custom 404 remains `noindex`. Indexable pages use `index,follow,max-image-preview:large`.

## Product catalog

`assets/data/products.json` is the source of truth for all 16 product records: IDs, titles, descriptions, categories, grades, skills, themes, thumbnails, URLs, free/paid status, homepage featured status/order, Resources display order, and availability.

Run:

```bash
node scripts/generate-product-catalog.mjs
```

The script regenerates marked regions in `index.html` and `resources.html`. Homepage products require published status, `featured: true`, and a numeric `featuredOrder`; a verified individual TPT URL controls only whether the card receives a product CTA. The homepage is capped at exactly three ordered cards. Resources products require published status, a numeric `displayOrder`, and a valid individual TPT Product URL, with no more than three cards per category. Generated HTML is committed, so production has no build requirement and search engines receive complete static content.

Missing thumbnails produce a text-only card, not fabricated artwork. Homepage products without verified individual TPT URLs remain visible without a clickable product CTA. Resources-page products still require verified individual URLs, so the site never emits a broken or guessed product link.

### Homepage featured-card visibility fix

The homepage previously reused the Resources-page eligibility list, which required a valid individual TPT URL before a product could render. That coupled product visibility to marketplace-link availability and suppressed intended evergreen cards even though their catalog data and thumbnails were complete.

Homepage selection now uses published and `featured` status independently of URL verification. URL verification happens only while rendering the optional CTA. The evergreen homepage set is:

- Seasonal Sensory Bin Collection
- Alphabet Letter Roads
- Classroom Rules for Regulation Tools

All three homepage features—Seasonal Sensory Bin Collection, Alphabet Letter Roads, and Classroom Regulation Tools—have verified individual URLs and receive normal product CTAs. Handwriting Checklist is not a homepage feature; its verified free-resource URL makes it eligible for the curated Fine Motor & Handwriting section.

### Verification status at implementation

Verified individual URLs:

- `seasonal-sensory-bin-mats`
- `easter-letter-mat`
- `winter-snowflake-number-mats`
- `thanksgiving-letter-mat`
- `st-patricks-letter-mat`
- `valentines-number-mat`
- `fall-counting-mat`
- `alphabet-letter-roads`
- `handwriting-checklist`
- `classroom-regulation-tool-rules`

Individual URLs still required:

- `summer-letter-mat`
- `spring-flower-letter-mat`
- `christmas-letter-mat`
- `apple-tree-counting-mat`
- `thanksgiving-turkey-yoga`
- `thanksgiving-food-movement`

Creator-supplied 1000×1000 WebP thumbnails are integrated for:

- `alphabet-letter-roads`
- `seasonal-sensory-bin-mats`
- `handwriting-checklist`
- `classroom-regulation-tool-rules`
- `thanksgiving-turkey-yoga`
- `thanksgiving-food-movement`
- `winter-snowflake-number-mats`
- `thanksgiving-letter-mat`

Each record includes the relative asset path, descriptive alt text, and intrinsic width and height. The generator emits native-aspect-ratio, responsive, lazy-loaded images. The Winter Snowflake and Thanksgiving Letter Mat artwork came from the creator-supplied thumbnail archive and is displayed on their existing curated Resources cards without changing catalog selection or homepage featured ordering. Verified product thumbnails are still required for the other eight catalog entries.

All three current homepage features display verified individual product CTAs. Seasonal products can be rotated into or out of the homepage by changing `featured`, assigning unique `featuredOrder` values 1–3, and regenerating the pages.

All four Resources categories remain visible. Categories with verified selected products show up to three cards; categories without verified selections show their category description and a general storefront link instead of empty cards or broken product links. Alphabet Letter Roads and Handwriting Checklist populate Fine Motor & Handwriting, and Classroom Regulation Tools populates its configured category. Fall Counting has a verified URL but remains outside the current Sensory selection because its `displayOrder` is intentionally unset and that category already has three curated products.

## Sitemap generation

Run `node scripts/generate-sitemap.mjs` after adding or removing a public page. The script scans HTML files, excludes pages marked `noindex`, reads each page’s canonical URL, and writes `sitemap.xml`. The generated file is committed, so deployment still has no build requirement. Drafts should remain outside public HTML or carry `noindex` until publication.

## Structured data

- Homepage: Organization and WebSite.
- About/Resources/Guides: page type plus BreadcrumbList where appropriate.
- Articles: Article and BreadcrumbList, with Sensory SpOT Studio as the organization author and publisher reference.

Product, review, rating, price, FAQ, credential, and Person schema were intentionally omitted because complete verified values are unavailable or the page content does not warrant them.

## Canonical behavior

- Homepage canonical: `https://www.sensoryspotstudio.com/`
- Guides index canonical: `https://www.sensoryspotstudio.com/guides/`
- Other public pages: absolute `.html` URLs matching GitHub Pages output.
- Internal navigation remains relative for root, repository-subdirectory, and custom-domain compatibility.

## Technical tradeoffs

- The optional generator introduces a maintenance command but not a deployment build.
- The requested two-to-three cards per category cannot yet be shown in categories that lack verified individual URLs. The regulation category also contains only one catalog product. Those products remain in the central catalog and will populate automatically once valid links are supplied; no duplicate or invented cards were added to satisfy a numeric target.
- Google Fonts remain as an enhancement to preserve the design language; system fallbacks keep pages readable if the request fails.
- The supplied social image is retained unchanged even though its embedded artwork may use earlier wording.

## Validation expectations

After editing pages or product data, run the catalog generator, a local HTTP server, the repository validation checks described in `docs/SEO_AUDIT.md`, and browser-based responsive/keyboard checks when a browser is available.
