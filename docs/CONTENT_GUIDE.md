# Content guide

## Add or update a TPT product

1. Open `assets/data/products.json`.
2. Add or edit one product object. Keep its stable `id` unchanged after publication.
3. Use the exact current TPT title. Write an original short description rather than copying a listing description.
4. Assign one category ID already defined in `categories`.
5. Add verified grade, skill, theme, free/paid, homepage featured/order, Resources display-order, and availability values. Use `null` when information is unknown.
6. Add a direct `https://www.teacherspayteachers.com/Product/...` URL only after opening and verifying that it is the correct Sensory SpOT Studio listing.
7. Run `node scripts/generate-product-catalog.mjs`.
8. Review the generated cards in `index.html` and `resources.html` in a local browser.

Never add guessed URLs, prices, ratings, reviews, outcomes, or clinical claims.

## Supply a real product image

1. Obtain an image that Sensory SpOT Studio has permission to publish.
2. Optimize it for the web and save it under `assets/images/resources/`.
3. Prefer a consistent aspect ratio. Do not upscale a small source.
4. Set `thumbnail` to the relative path from `resources.html`, such as `assets/images/resources/example.webp`.
5. Set `thumbnailAlt` to a concise description of what the preview visibly shows.
6. Set `thumbnailWidth` and `thumbnailHeight` to the image's actual intrinsic pixel dimensions.
7. Regenerate the catalog and confirm the image is not stretched.

Until real product artwork is supplied, leave the image fields `null`; the site displays a clean text-only card rather than a fabricated preview.

## Curate homepage and Resources selections

- `featured: true` plus a numeric `featuredOrder` from 1–3 makes a published product eligible for the homepage showcase, whether or not its individual TPT URL is available.
- `featured: false` removes it from the homepage without deleting it from the catalog.
- `featuredOrder` controls homepage order independently of category order. Use `null` when `featured` is false.
- A numeric `displayOrder` makes a product eligible for its Resources category and controls its order. Use `null` to keep it in the catalog without displaying it there.
- The generator shows exactly the first three configured homepage products and at most three verified products per Resources category.
- A valid individual TPT Product URL controls only whether a product card receives a “View on Teachers Pay Teachers” CTA. Cards without a verified URL remain visible but are not clickable.
- Resources-page selections still require a published product, a numeric `displayOrder`, and a valid individual TPT Product URL. A category without eligible products remains visible with a general storefront link.

To rotate a seasonal homepage product, toggle `featured` on the outgoing and incoming catalog records, assign unique `featuredOrder` values 1–3, adjust `displayOrder` only if the Resources ordering should also change, then run the generator. Page markup does not need to be edited.

Missing individual URLs are tracked in `docs/TPT_LINKS_TODO.md`. Paste a confirmed URL into the product's `tptUrl` field in `assets/data/products.json`, then regenerate; never edit generated product links directly in HTML.

## Publish an article

1. Copy the semantic structure used by an existing file in `guides/`.
2. Write original, useful content with a defined audience, supplies, practical instructions, adaptations, related resources, author attribution, and educational disclaimer.
3. Use one H1 and logical H2/H3 headings.
4. Create a unique title (roughly 50–60 characters when practical) and useful meta description (roughly 140–160 characters when practical).
5. Update canonical, Open Graph, Twitter, Article JSON-LD, and BreadcrumbList values together.
6. Add the article to `guides/index.html` and relevant internal pages, then run `node scripts/generate-sitemap.mjs`.
7. Link to a product card or verified individual listing naturally. Do not force a product mention where it is not useful.
8. Mark missing professional examples or images for editorial review instead of fabricating them.

## Keep articles connected to resources

Use stable catalog anchors in the form `resources.html#product-PRODUCT_ID` only for products included in the current curated Resources selection. If a verified TPT product URL exists, a guide may link directly and should include `data-tpt-link`, `data-product-id`, `data-product-category`, and `data-destination-type="product"` for analytics. When an individual URL is unavailable, name the resource contextually without creating a product CTA; a general storefront link may still be used.

## Verify metadata and indexing

1. Run the local metadata/link checks.
2. Publish through the normal GitHub Pages workflow only when authorized.
3. Inspect the live canonical and structured data.
4. Submit or resubmit `https://www.sensoryspotstudio.com/sitemap.xml` in Google Search Console.
5. Use Search Console URL Inspection for the new canonical URL and request indexing when appropriate.
6. Monitor the Page indexing and Performance reports; indexing is controlled by Google and is not immediate or guaranteed.
