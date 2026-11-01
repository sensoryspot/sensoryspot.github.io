# Launch checklist

## Required before launch

- [ ] Review the complete uncommitted diff and confirm all launch content is approved.
- [ ] Run `node scripts/generate-product-catalog.mjs` and confirm it reports exactly three homepage cards.
- [ ] Run `node scripts/generate-sitemap.mjs` and confirm all eight public canonical pages are present.
- [ ] Run JavaScript syntax, link, metadata, image, JSON-LD, sitemap, and `git diff --check` validation.
- [ ] Complete manual browser QA at 320, 375, 430, 768, 1024, and 1440 pixels if automated browser access is unavailable.
- [ ] On mobile, verify menu open/close, Escape handling, focus return, close-after-selection, 44px targets, and no horizontal overflow.
- [ ] Verify the homepage shows exactly Seasonal Sensory Bin Mats, Alphabet Letter Roads, and Classroom Regulation Tools in that order.
- [ ] Verify the three homepage thumbnails load at their natural aspect ratio and all three product CTAs reach their correct individual listings.
- [ ] Confirm the creator-supplied Winter Snowflake and Thanksgiving Letter Mat previews match the corresponding standalone TPT downloads; their source archive identifies the artwork as pages from the seasonal bundle.
- [ ] Verify all Resources categories are present; Alphabet Letter Roads, Handwriting Checklist, and Classroom Regulation Tools appear in their curated categories; and only confirmed product links receive product CTAs.
- [ ] Verify the contact email and TPT storefront links.
- [ ] Confirm `.nojekyll`, `CNAME`, relative internal paths, and the custom domain remain unchanged.
- [ ] Confirm no credentials, analytics IDs, Search Console tokens, or private data were committed.

## Manual configuration

- [ ] Add the real GA4 web-stream measurement ID to `assets/js/site-config.js` only when analytics should be enabled.
- [ ] Verify GA4 `page_view` and `tpt_outbound_click` events in Realtime or DebugView; do not interpret clicks as purchases.
- [ ] Add and verify the `sensoryspotstudio.com` Domain property in Google Search Console using the DNS TXT record supplied by Google.
- [ ] Submit `https://www.sensoryspotstudio.com/sitemap.xml` in Search Console.

## Publishing and post-deployment smoke test

- [ ] Use the repository's normal GitHub Pages workflow only after explicit authorization.
- [ ] Confirm `https://www.sensoryspotstudio.com/`, Resources, About, Contact, Guides, `robots.txt`, and `sitemap.xml` return successfully.
- [ ] Confirm HTTPS and the preferred `www` canonical host.
- [ ] Recheck navigation, featured images, product/store links, contact email, and mobile overflow on production.
- [ ] Inspect the homepage and guide URLs in Search Console and request indexing when appropriate.

## Optional follow-up improvements

- [ ] Complete the missing individual URLs in `docs/TPT_LINKS_TODO.md`; these are not blockers because unavailable links are safely omitted.
- [ ] Add creator-supplied thumbnails for additional curated products.
- [ ] Rotate seasonal homepage or Resources selections through catalog configuration as the calendar changes.
- [ ] Review Search Console queries and landing pages after enough data accumulates, then expand useful guide content based on real demand.
