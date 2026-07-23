# Equal Housing Logo Issue — Resolution Notes

## Summary

The website displayed a custom `eXp Realty` text badge beside Victoria's portrait but did not show the Equal Housing Opportunity logo in the key locations where it was needed. We resolved the issue by adding official-style Equal Housing Opportunity image assets, replacing the portrait badge content with the white logo, and adding the same logo next to the brokerage disclosure in the site footer.

## Problem

- The homepage portrait used a text-based `eXp Realty` badge.
- The footer contained the brokerage disclosure but no Equal Housing Opportunity mark.
- A light-colored logo was required because both placements use dark backgrounds.
- The implementation needed to remain responsive and accessible.

## Resolution steps

### 1. Prepared the logo assets

Two transparent PNG variants were added to `public/`:

- `public/equal-housing.png` — black version for light backgrounds.
- `public/equal-housing-white.png` — white version for dark backgrounds.

Both assets are 284 × 300 pixels. Keeping both variants makes the mark reusable across light and dark sections without applying fragile CSS color filters.

### 2. Replaced the homepage portrait badge

In `app/page.tsx`, the text inside `.exp-badge` was replaced with a Next.js `Image` component that loads `/equal-housing-white.png`.

The image includes the accessible alternative text `Equal Housing Opportunity`. The white variant was selected because the badge background uses the site's dark ink color.

### 3. Added the logo to the footer disclosure

In `app/components/SiteFooter.tsx`, the existing brokerage text was wrapped in a new `.footer-brokerage` container. The white Equal Housing Opportunity image was placed next to:

> Victoria Olorede, REALTOR®  
> Brokered by eXp Realty

This keeps the brokerage disclosure and housing-opportunity mark visually associated.

### 4. Added footer layout styles

In `app/globals.css`, the following styles were introduced:

- `.footer-brokerage` uses flexbox to align the disclosure and logo.
- `.footer-brokerage p` preserves the footer's existing muted text treatment.
- `.footer-equal-housing` keeps the logo at a compact width, preserves its aspect ratio, prevents shrinking, and slightly softens it to match the footer design.

The existing responsive `.exp-badge` rules continue to resize the homepage badge on smaller screens.

### 5. Preserved image rendering

Both new `Image` usages specify their intrinsic dimensions and use `unoptimized`. This serves the small transparent PNG directly and avoids image-optimization behavior changing the logo's transparency or appearance.

## Files changed

| File | Change |
| --- | --- |
| `public/equal-housing.png` | Added black transparent logo asset. |
| `public/equal-housing-white.png` | Added white transparent logo asset used on the site. |
| `app/page.tsx` | Replaced the portrait's text badge with the Equal Housing Opportunity logo. |
| `app/components/SiteFooter.tsx` | Added the logo next to the brokerage disclosure. |
| `app/globals.css` | Added alignment and sizing styles for the footer placement. |

## Verification performed

1. Confirmed both PNG files are valid 284 × 300 RGBA images.
2. Searched the codebase to confirm the new asset paths and CSS classes are referenced correctly.
3. Ran `git diff --check`; no whitespace errors were reported.
4. Ran `npm run build`; the complete Vinext production build passed, including the homepage and all application routes.

## Result

The Equal Housing Opportunity mark now appears in two prominent, dark-background locations:

- Over Victoria's homepage portrait, in the existing badge treatment.
- In the global footer, beside the brokerage disclosure.

The change is accessible, responsive, visually consistent with the existing design, and production-build safe.

