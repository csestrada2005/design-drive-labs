
# Section Transition Effects -- Scroll-Triggered "Page Reveal" System

## Concept
Each major section of the page will be wrapped in a transition component that detects when the user scrolls past the boundary between sections. When triggered, a techy visual effect plays -- making it feel like a new "page" is loading in, even though it's all one route.

## Transition Effects (Rotating Per Section)
The system will cycle through 3 distinct transition styles so it never feels repetitive:

1. **Glitch Slice** -- The incoming section splits into horizontal slices that stagger-slide in from alternating left/right, with a brief RGB-shift glitch overlay
2. **Circuit Wipe** -- A horizontal scan-line sweeps across with a glowing electric-blue edge, revealing the new section behind it like a digital curtain
3. **Data Dissolve** -- The section fades in through a grid of tiny squares that fill in randomly (like pixels loading), with a brief binary/matrix rain overlay

## How It Works

### New Component: `SectionTransition.tsx`
A wrapper component that:
- Uses `useInView` from Framer Motion with a threshold to detect when the section enters the viewport
- Plays the assigned transition effect once (on first scroll-in)
- Wraps each section's children so existing components are untouched
- Accepts a `variant` prop ("glitch" | "circuit" | "data") to pick the effect

### Changes to `Index.tsx`
Wrap each major section in `<SectionTransition variant="...">`:

```text
HeroSection          -- No transition (it's the first thing visible)
MarqueeTicker        -- No transition (small divider)
StatsStrip           -- No transition (small divider)
ScrollRevealText     -- No transition (already has its own reveal)
ServicesSection      -- Glitch Slice
DesignLab            -- Circuit Wipe
ProcessSection       -- Data Dissolve
GrowthImpact         -- Glitch Slice
FeaturedWork         -- Circuit Wipe
BigCTA               -- Data Dissolve
ContactSection       -- Glitch Slice
```

### CSS additions to `index.css`
- Keyframes for the glitch RGB-shift flicker
- Keyframes for the scan-line sweep
- Keyframes for the pixel-grid fill pattern

## Technical Details

### `SectionTransition.tsx` implementation
- Uses a `ref` + `useInView(ref, { once: true, amount: 0.15 })` to trigger when ~15% of the section is visible
- Before trigger: section content is hidden via `clip-path: inset(100%)` or `opacity: 0`
- On trigger: runs the chosen animation variant using Framer Motion's `animate` + CSS keyframes
- Each variant is ~0.6-0.8s duration so it feels snappy, not sluggish
- All animations respect `prefers-reduced-motion` (instant reveal, no effects)

### Glitch Slice variant
- Section is split into 5 visual horizontal slices using `clip-path`
- Each slice slides in from alternating directions with staggered delays (0, 80ms, 160ms...)
- A brief (200ms) RGB-offset overlay flickers on top

### Circuit Wipe variant
- A full-width scan-line div (2px tall, electric blue glow) sweeps top-to-bottom
- Content is revealed progressively behind the line using `clip-path: inset(X% 0 0 0)` animated from 100% to 0%
- Scan-line has a `box-shadow` glow trail

### Data Dissolve variant
- An SVG/CSS grid mask of small squares (e.g. 20x12 grid)
- Squares flip from opaque to transparent in a pseudo-random order over ~600ms
- Brief matrix-style character rain overlay that fades out

### Performance considerations
- All animations use `transform`, `clip-path`, and `opacity` only (GPU-composited)
- `once: true` ensures each transition fires only on first scroll-in, never replays
- `will-change: transform` added before animation, removed after
- Mobile: simpler variants (fewer slices, no matrix rain) to keep 60fps
