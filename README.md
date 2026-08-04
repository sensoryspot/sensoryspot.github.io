# Sensory SpOT static website

## Project overview

This repository contains the production-ready static marketing website for **Sensory SpOT**, an Occupational Therapist-led resource brand serving educators, school professionals, Occupational Therapy professionals, parents, and caregivers. The site introduces the OT's experience and approach, explains the resource categories, links visitors to Teachers Pay Teachers, and provides a direct contact route.

The site uses plain HTML, one shared CSS file, and a small vanilla JavaScript file. It has no framework, package dependencies, database, server-side code, or required build process. All internal links are relative so the site can work at a GitHub Pages root, inside a project subdirectory, or on a future custom domain.

## Pages and key files

- `index.html` - complete homepage with hero, introduction, resource categories, about preview, philosophy, TPT promotion, and closing calls to action
- `about.html` - career journey, outpatient beginnings, school-based transition, approach, creation story, portrait placeholder, and TPT call to action
- `resources.html` - resource overview, four material types, three clearly labeled product placeholders, and full-store call to action
- `contact.html` - direct email and TPT store link; no nonfunctional form
- `404.html` - GitHub Pages-compatible branded missing-page experience
- `assets/css/styles.css` - shared responsive visual system
- `assets/js/main.js` - accessible mobile navigation and current copyright year
- `.nojekyll` - prevents GitHub Pages from processing the site with Jekyll

## Local preview

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then view the site at:

```text
http://localhost:8000
```

Use a local server rather than opening the HTML files directly so browser behavior matches GitHub Pages more closely. Stop the server with `Ctrl+C`.

## GitHub Pages deployment

No GitHub Actions workflow or build step is required.

Confirmed repository:

```text
https://github.com/sensoryspot/sensoryspot.github.io
```

Because this is the `sensoryspot.github.io` user/organization Pages repository, GitHub Pages will publish it from the account root rather than a project subdirectory.

1. Push the finished site files to `https://github.com/sensoryspot/sensoryspot.github.io` on the `main` branch.
2. Open the repository on GitHub.
3. Open **Settings**.
4. Select **Pages** in the sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch.
7. Select `/ (root)` as the folder.
8. Save the settings.
9. Wait for the GitHub Pages URL to appear, then test every page and link at that URL.

## Content replacement guide

### Occupational Therapist name

The OT's public name is currently shown as `TBD` in `about.html`. Replace both visible occurrences after the preferred public name is confirmed. Do not add degrees, credentials, employers, or biography claims until they have been confirmed.

### Portrait

Search for `REPLACE-WITH-PORTRAIT` in `index.html` and `about.html`. Replace each `.portrait-placeholder` block with an `<img>` element. A portrait around **1200 x 1500 pixels** (4:5 portrait orientation) is recommended. Save the optimized image in `assets/images/placeholders/` or rename that folder to suit the final content. Include intrinsic `width` and `height`, useful alt text, and `loading="lazy"` where the portrait is below the fold.

### Email

The confirmed public contact email is `support@sensoryspotstudio.com`. It is used in both visible contact text and `mailto:` links in `contact.html`.

### Teachers Pay Teachers store

The confirmed Sensory SpOT store URL is:

```text
https://www.teacherspayteachers.com/store/sensory-spot-studio
```

This URL is used for all general store calls to action. On `resources.html`, replace each placeholder product link with that product's direct TPT URL rather than the general store link.

### Resource products

The three samples on `resources.html` are intentionally labeled as post-launch placeholders. When products are selected, replace the image area, title, description, age or grade range, resource type, direct TPT URL, and any optional price or accessibility information. Remove the “Sample placeholder” label only after the product is real and published.

### Canonical website URL

The confirmed production URL is `https://www.sensoryspotstudio.com/`. Canonical links, Open Graph metadata, Twitter metadata, and JSON-LD use this domain throughout the site.

### Open Graph image

The site uses the dedicated **1200 x 630 pixel** `assets/images/brand/social-share.png` image for Open Graph and large Twitter/X sharing previews. The design uses the confirmed Sensory SpOT name, homepage message, official palette, and unchanged supplied botanical mark.

### Optional biography details

Only the confirmed biography supplied for this project is currently included. Add details later only after they are verified. Avoid unsupported credentials, licenses, employers, locations, awards, personal information, medical claims, testimonials, or statistics.

## Branding guide

The supplied `Sensory_Spot_Studio_Assets.zip` was copied into the repository root, extracted, and reviewed in full. Unmodified source files are preserved under `assets/images/brand/originals/`.

Brand usage:

- `01_Brand_Board_Full.png` informed the overall visual direction, organic motifs, and restrained editorial composition. Its high-resolution design-mark panel supplied the clean `brand-mark-large.png` derivative; the full board is not displayed as page content.
- `02_Logo_Primary.png` is preserved as an original source file and is not altered.
- `03_Logo_HighRes_Mark.png` informed the botanical and flowing line details.
- `04_Color_Palette.png` and `08_Brand_Guidelines.pdf` supplied the official palette.
- `05_Website_Header_Banner.png` informed the light, calm header layout. Its image-based navigation was not used.
- `06_TpT_Store_Banner.png` informed the warm promotional section. Its placeholder text and buttons were not published.
- `07_Favicon_Profile_Icon.png` supplied the clean circular mark used to produce `brand-mark.png` and the favicon set.

Production image files:

- `assets/images/brand/brand-mark-large.png` - high-resolution square mark derivative for the homepage hero and structured-data logo
- `assets/images/brand/brand-mark.png` - compact square mark derivative for the header and footer
- `assets/images/brand/social-share.png` - dedicated 1200 x 630 Open Graph and social-sharing image
- `assets/images/brand/favicon.ico`
- `assets/images/brand/favicon-32x32.png`
- `assets/images/brand/favicon-16x16.png`
- `assets/images/brand/apple-touch-icon.png`

The originals remain unchanged. The website does not redraw or change the supplied logo artwork. Because the source artwork contains its own embedded wording, that wording remains untouched inside the source files. All editable website and documentation copy uses **Sensory SpOT** instead.

The CSS palette is:

- Muted teal: `#729B9F`
- Soft blue: `#8FB8D1`
- Peach: `#F6C7A6`
- Coral: `#EFA28D`
- Muted green: `#C6D187`
- Warm cream, white, dark teal-gray, muted text, border, and focus colors are defined alongside the official palette in `assets/css/styles.css`.

Headings use **Nunito Sans** at weights 600-800. Body copy uses **Source Sans 3** at weights 400 and 600. System-font fallbacks are included. Google Fonts are an enhancement; the site remains readable if they fail to load.

In editable copy, the public name is always written **Sensory SpOT**. The `OT` letters are subtly emphasized with the reusable `.brand-ot` class where the name appears in visible page content.

## Adding resources

1. Open `resources.html`.
2. Find the comment beginning `RESOURCE COMPONENT`.
3. Duplicate one complete `<article class="resource-card">...</article>` block inside `.resource-grid`.
4. Replace the placeholder image block with an optimized product `<img>`. Add explicit `width` and `height`, descriptive `alt` text, and `loading="lazy"`.
5. Replace the title and short description.
6. Add the confirmed age or grade range and resource type.
7. Add or remove optional price and accessibility information.
8. Replace the general placeholder store URL with the direct TPT product URL.
9. Remove the placeholder label only when the product is real and published.
10. Test the new card at mobile, tablet, and desktop widths.

Store product images in `assets/images/resources/`. Keep a consistent aspect ratio where possible and avoid upscaling small source files.

## Custom domain

The confirmed custom domain is `www.sensoryspotstudio.com`, and the repository includes a matching `CNAME` file. Add the same domain through the GitHub repository's **Settings > Pages > Custom domain** area, configure the required DNS records with the domain provider, and enable HTTPS when GitHub makes the option available.

## Accessibility and performance notes

- Semantic landmarks, logical headings, skip links, `aria-current`, visible focus indicators, and descriptive links are included.
- The responsive navigation uses a real button with `aria-expanded` and `aria-controls`; Escape closes it and returns focus to the button.
- Without JavaScript, the navigation remains visible and all content remains available.
- Controls are sized for comfortable touch use, and important text uses dark colors rather than low-contrast pastels.
- Motion is minimal and disabled through `prefers-reduced-motion`.
- Images include intrinsic dimensions; below-the-fold brand marks use lazy loading.
- There are no analytics, cookies, trackers, third-party embeds, frameworks, icon libraries, or application dependencies.
- The educational disclaimer appears consistently in the footer, and the site makes no medical promises.

## Launch checklist

- [x] Add the confirmed public email address.
- [x] Add the confirmed Sensory SpOT Teachers Pay Teachers store URL.
- [ ] Replace the visible `TBD` name in `about.html` with the confirmed public name.
- [ ] Replace every `REPLACE-WITH-PORTRAIT` area with the approved portrait.
- [x] Confirm that no social-media profiles will be published at launch.
- [ ] Post-launch: replace all three sample resource components with real published resources.
- [x] Add the confirmed production domain to canonical, social, and structured metadata.
- [x] Create the final 1200 x 630 social-sharing image and update Open Graph and Twitter image metadata.
- [ ] Review and confirm any optional biography details before adding them.
- [ ] Test every internal, email, store, product, and social link.
- [ ] Review the educational disclaimer with the site owner.
- [ ] Test at 320 px, common phone sizes, tablet widths, laptops, and large desktop screens.
- [ ] Test keyboard navigation, the skip link, mobile menu, Escape behavior, and visible focus states.
- [ ] Confirm the favicon appears correctly in target browsers and devices.
- [ ] Verify each page title, description, canonical URL, Open Graph field, Twitter field, and JSON-LD block.
- [ ] Confirm all editable copy still uses **Sensory SpOT** and that all supplied source artwork remains unchanged.

## Remaining placeholder inventory

Before launch, search the repository for each of these values and content labels:

- Visible OT name: `TBD`
- `REPLACE-WITH-PORTRAIT`
- `Resource title goes here`
- `Replace with a short resource description`
- `Add product image`
- `Add range`
- `Add type`
- `Optional - add or remove`
- `Optional - add details`
- `Add TPT link`
- Optional confirmed biography details
