

## Plan: Fix Canvas Background, Hero Image, and Section Visibility

### Problem Summary

1. **Canvas background looks bad** -- it was saved from a screenshot, resulting in low resolution/compression artifacts.
2. **Hero logo is not visible** -- the transparent PNG may be rendering but invisible against the background.
3. **Sections only show half** -- the `-100vh` margin overlap stacking is clipping content because `section { contain: layout style; }` in CSS and the background-image on each wrapper may interfere.

---

### 1. Replace Low-Quality Canvas Image with CSS-Generated Texture

Instead of relying on a screenshot PNG, generate a paper/canvas texture using pure CSS. This ensures crisp rendering at any resolution.

- Remove all `backgroundImage: "url('/images/canvas-bg.png')"` references from `Index.tsx` section wrappers.
- Remove the fixed canvas overlay div in `Index.tsx`.
- The site already has `owlBg` as a fixed background in `App.tsx` -- keep that as the base.
- Add a CSS class `.canvas-texture` that uses a subtle repeating gradient to simulate the warm parchment/paper look (light beige with micro-noise pattern using layered gradients).
- Apply this class to each section wrapper so they have an opaque canvas-like background that covers the section below during overlap.

**Files**: `src/index.css`, `src/pages/Index.tsx`

---

### 2. Fix Hero Logo Visibility

- Ensure the hero logo `<img>` has proper sizing and contrast against the canvas background.
- Add a subtle drop shadow or ensure the image has enough contrast to be visible on the light canvas texture.
- Verify the import path `@/assets/hero-logo-transparent.png` points to a valid file.

**Files**: `src/components/motion/HeroSection.tsx`

---

### 3. Fix Section Overlap Clipping

The sections are only showing half because:
- `section { contain: layout style; }` in `index.css` restricts rendering.
- The `-100vh` margin + `h-[100vh]` spacer approach needs sections to have no containment restrictions.

**Fix**:
- Remove `section { contain: layout style; }` from `index.css` (or scope it to not affect the overlap wrappers).
- Ensure each section wrapper div has `overflow: visible` (not hidden).
- The wrapper divs already have incrementing z-index and backgrounds -- just need to ensure the content inside isn't being clipped.

**Files**: `src/index.css`, `src/pages/Index.tsx`

---

### Technical Summary

| File | Change |
|------|--------|
| `src/index.css` | Add `.canvas-texture` CSS class with paper-like gradient; remove `contain: layout style` from `section` |
| `src/pages/Index.tsx` | Remove all `canvas-bg.png` references; apply `.canvas-texture` class to section wrappers; keep overlap stacking logic |
| `src/components/motion/HeroSection.tsx` | Ensure hero logo is visible with proper sizing/contrast |

