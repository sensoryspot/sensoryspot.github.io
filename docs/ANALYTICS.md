# Search Console and analytics

## Google Search Console setup

No verification token or DNS access is stored in this repository.

Recommended setup:

1. Open Google Search Console using the account that should own the site data.
2. Add a Domain property for `sensoryspotstudio.com`.
3. Copy Google’s DNS TXT verification record exactly.
4. Add the TXT record with the domain’s DNS provider; do not add it to the repository.
5. Wait for DNS propagation, then select Verify in Search Console.
6. Submit `https://www.sensoryspotstudio.com/sitemap.xml` under Sitemaps.
7. Inspect the homepage and each guide URL after deployment.

If DNS access is unavailable, an HTML-tag verification method can be used for a URL-prefix property. Add only the exact token Google supplies and keep it separate from analytics IDs.

## GA4 configuration

No valid GA4 measurement ID was present, so analytics is disabled by default.

To enable it, set the confirmed public web-stream ID in `assets/js/site-config.js`:

```js
window.SENSORY_SPOT_CONFIG = Object.freeze({
  ga4MeasurementId: "G-XXXXXXXXXX"
});
```

Only values matching the `G-...` format load Google’s tag. If a consent platform is introduced later, gate analytics initialization on the applicable consent signal before setting the ID or loading the script.

## Outbound TPT event tracking

When GA4 is enabled, clicks on links carrying `data-tpt-link` send the event:

```text
tpt_outbound_click
```

Event parameters:

- `product_id`: stable catalog ID, or `storefront` for a general store link
- `product_category`: catalog category, or `storefront`
- `destination_type`: `product` or `storefront`
- `source_page`: the local URL path where the click occurred

The event does not collect student information, names, email addresses, form values, or purchase information. An outbound click is not a completed purchase.

## Verify tracking

1. Enable a valid measurement ID in a non-production review branch or local preview.
2. Open GA4 DebugView or Realtime.
3. Load several pages and confirm normal `page_view` events.
4. Click one verified product link and one storefront link.
5. Confirm `tpt_outbound_click` and its non-personal metadata.
6. Confirm no event fires when the measurement ID is blank.

## Monitor organic traffic and referrals

- Search Console Performance: queries, pages, countries, devices, impressions, clicks, and average position.
- Search Console Page indexing: indexing exclusions and sitemap discovery.
- GA4 Acquisition: Organic Search traffic and landing pages.
- GA4 Events: `tpt_outbound_click` by product ID, category, destination type, and source page.
- TPT seller reporting: use TPT’s own reporting for marketplace activity; do not infer purchases from site click events.

Review trends over meaningful time periods. New content may take weeks or longer to be crawled, indexed, and gain impressions.
