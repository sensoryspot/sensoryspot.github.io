# Sensory SpOT repository guidance

## Project architecture

- This is a deploy-without-building static website for GitHub Pages.
- Use plain HTML, one shared CSS file, and minimal vanilla JavaScript.
- Do not add React, Vue, Next.js, npm dependencies, server-side code, a database, a CSS framework, or a required build process.
- Keep all internal links and asset references relative so the site works at a root domain, in a repository subdirectory, or on a custom domain.
- Preserve `.nojekyll` and `CNAME`.

## Brand and content rules

- Write the public brand name as **Sensory SpOT** in all editable copy.
- Keep **TPT** uppercase in editable copy.
- The supplied source artwork may contain different embedded wording. Never redraw, overwrite, destructively edit, or change that wording.
- Preserve all files under `assets/images/brand/originals/` unchanged.
- Do not display the full brand board, palette reference, header concept, or TPT banner as ordinary page content.
- Use the approved palette variables already defined in `assets/css/styles.css`.
- Use dark teal-gray for important text; pastel colors are decorative rather than small-text colors.
- Do not invent names, credentials, employers, locations, awards, testimonials, statistics, diagnoses, outcomes, or medical claims.
- Keep the educational disclaimer clear and consistent.

## Confirmed production values

- Website: `https://www.sensoryspotstudio.com/`
- TPT store: `https://www.teacherspayteachers.com/store/sensory-spot-studio`
- Public email: `support@sensoryspotstudio.com`
- GitHub repository: `https://github.com/sensoryspot/sensoryspot.github.io`
- Public OT name: `TBD` is intentionally accepted for now.
- Portrait: `REPLACE-WITH-PORTRAIT` is intentionally accepted for now.
- Featured product cards: placeholders are intentionally retained as post-launch content work.
- Social-media profiles: none are published.

Do not replace an accepted placeholder or confirmed value without user-provided information.

## Git identity and publishing safety

All commits for this repository must use the Sensory Spot GitHub identity, never a personal Git identity.

Expected repository-local values:

```text
user.name: sensoryspot
user.email: 313073297+sensoryspot@users.noreply.github.com
origin: https://github.com/sensoryspot/sensoryspot.github.io.git
branch: main
```

Before creating any commit, run:

```bash
git config --local --get user.name
git config --local --get user.email
git remote get-url origin
git branch --show-current
```

Require the output to match the values above exactly. If any value differs or is missing, stop and correct the repository-local configuration before committing:

```bash
git config --local user.name "sensoryspot"
git config --local user.email "313073297+sensoryspot@users.noreply.github.com"
git remote set-url origin https://github.com/sensoryspot/sensoryspot.github.io.git
```

Before pushing, inspect the commits that are not yet on the remote:

```bash
git log origin/main..HEAD --format='%h %an <%ae> | %cn <%ce> | %s'
```

Every pending commit must show `sensoryspot <313073297+sensoryspot@users.noreply.github.com>` as both author and committer. If it does not, do not push. Do not rewrite published history or force-push unless the user explicitly authorizes it.

## Design and responsive behavior

- Maintain a calm, warm, adult-facing education brand with restrained organic details.
- Avoid generic SaaS styling, excessive cards, glassmorphism, neon, giant gradients, random emojis, or constant animation.
- Keep the desktop hero mark, but hide the decorative hero artwork at phone widths of 680px and below; the header mark remains visible.
- On the homepage mobile About preview, preserve this order: heading, portrait, biography, CTA.
- Test at 320px, common phone widths, tablet widths, and desktop widths.
- Prevent horizontal scrolling, overlapping elements, clipped logos, stretched images, tiny targets, and awkward heading wraps.
- New images must include useful alt text, explicit intrinsic dimensions, responsive sizing, and lazy loading when below the fold.

## Accessibility requirements

- Preserve semantic landmarks, logical headings, skip links, `aria-current`, visible focus indicators, and minimum practical 44px targets.
- Keep the mobile navigation button's `aria-expanded`, `aria-controls`, Escape-key handling, focus return, and close-after-selection behavior.
- The site must remain readable and navigable when JavaScript is disabled.
- Do not communicate state using color alone.
- Respect `prefers-reduced-motion`.
- Maintain WCAG AA-level contrast for normal text and controls.

## Files and conventions

- Shared styles: `assets/css/styles.css`
- Shared JavaScript: `assets/js/main.js`
- Production brand assets: `assets/images/brand/`
- Unmodified supplied sources: `assets/images/brand/originals/`
- Future product images: `assets/images/resources/`
- Future portrait: `assets/images/placeholders/`
- Social-sharing image: `assets/images/brand/social-share.png` at exactly 1200 x 630 pixels.
- Keep page metadata unique and update canonical, Open Graph, Twitter, and JSON-LD values together when URLs change.

## Verification before handing off changes

1. Run a local server with `python3 -m http.server 8000`.
2. Open every HTML page and verify all navigation and CTA links.
3. Check mobile navigation, Escape behavior, keyboard focus, and 320px overflow.
4. Confirm all image paths resolve and images preserve their aspect ratios.
5. Confirm page titles and meta descriptions remain unique.
6. Search for accidental placeholders with:

   ```bash
   rg -n 'REPLACE-WITH|Resource title goes here|Add product image|Add TPT link|TBD' .
   ```

7. Compare results with the accepted placeholders listed above and `README.md`.
8. Confirm editable copy still uses Sensory SpOT and TPT consistently.
9. Run the Git identity and pending-commit checks above.
10. Do not commit or push unless the user explicitly asks.
