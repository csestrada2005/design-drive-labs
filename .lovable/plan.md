

## Remove Hero Transition and Add Scroll-Driven "Canvas Painting" Experience

### Overview
Three major changes: strip the hero transition, make all page elements scroll-paint into view and vanish on exit, and convert Design Lab demos to auto-trigger on scroll without any user interaction.

---

### 1. Hero Section -- Remove Transition

**File:** `src/components/motion/HeroSection.tsx`

- Delete the entire `LaserTransition` component
- Remove all scroll-lock logic (`document.body.style.overflow = "hidden"`, wheel/touch/key listeners)
- Remove `hasTransitioned`, `showLaser`, `isTransitioning` state
- Keep it as a simple full-viewport section with the logo background and no scroll hint
- The hero itself will use the new scroll-driven vanish behavior (fades/scales out as user scrolls past)

---

### 2. Scroll-Driven "Canvas Painting" System

**New hook:** `src/hooks/useScrollPaint.ts`

A reusable hook that uses `framer-motion`'s `useScroll` and `useTransform` to:
- **Paint in**: Elements fade from 0 to 1 opacity and translate from a random offset to their final position as they enter the viewport
- **Vanish out**: Elements fade back to 0 and drift away as they scroll out of view
- Returns `style` object with `opacity`, `y`, `x`, and `scale` motion values

**Applied to all major sections** via wrapper or direct usage:
- Each text block, heading, and content element gets scroll-driven entrance/exit
- Text elements will have a subtle horizontal "walk" (small x translation that resolves to 0 at center of viewport)
- Elements vanish (opacity to 0, slight y drift) as they leave the viewport top

**File changes:**
- `ServicesSection.tsx` -- wrap tier cards and headings with scroll-paint transforms
- `ProcessSection.tsx`, `GrowthImpact.tsx`, `FeaturedWork.tsx`, `BigCTA.tsx`, `ContactSection.tsx`, `DramaticFooter.tsx` -- apply same pattern to headings and content blocks
- `ScrollRevealText.tsx` -- already scroll-driven, add vanish-on-exit behavior
- `StatsStrip.tsx`, `MarqueeTicker.tsx` -- apply paint-in/vanish if they render content

---

### 3. Design Lab -- Auto-Trigger on Scroll (No Click/Hover)

**File:** `src/components/motion/DesignLab.tsx`

Each demo component will be modified to auto-activate when scrolled into view using `useInView`:

- **ElectroText**: Instead of `onMouseEnter`/`onMouseLeave`, use `useInView` to cycle through `activeIdx` automatically (sequentially lighting up each letter)
- **GlassPopup**: Auto-open the modal when in view, no button click needed; hide button entirely or make it decorative
- **CursorTrail**: Convert to an auto-animated particle system that runs when in view (no mouse dependency)
- **TiltObject**: Auto-animate the tilt values in a gentle loop when in view
- **ArchitectureDemo** (`ArchitectureDemo.tsx`): Auto-flip between laptop and code view on a timer when in view, removing click requirement
- **ScrollMorphShapes**: Already scroll-driven, no changes needed
- **RevealWipe**: Already scroll-driven, no changes needed

All `cursor-pointer` classes and click/hover handlers will be removed from these demos. Elements become non-interactive visual showcases.

---

### Technical Details

**useScrollPaint hook signature:**
```typescript
useScrollPaint(ref, options?: { 
  offsetIn?: string,   // e.g. "start 0.9"
  offsetOut?: string,  // e.g. "end 0.1"  
  xDrift?: number,     // horizontal walk distance
  yDrift?: number      // vertical drift distance
})
// Returns: { opacity, x, y, scale } as MotionValues
```

**Files to create:**
- `src/hooks/useScrollPaint.ts`

**Files to modify:**
- `src/components/motion/HeroSection.tsx` (strip transition, add scroll-vanish)
- `src/components/motion/DesignLab.tsx` (auto-trigger all demos)
- `src/components/motion/ArchitectureDemo.tsx` (auto-flip on timer)
- `src/components/motion/ServicesSection.tsx` (scroll-paint elements)
- `src/components/motion/ScrollRevealText.tsx` (add vanish on exit)
- `src/components/motion/ProcessSection.tsx` (scroll-paint)
- `src/components/motion/GrowthImpact.tsx` (scroll-paint)
- `src/components/motion/FeaturedWork.tsx` (scroll-paint)
- `src/components/motion/BigCTA.tsx` (scroll-paint)
- `src/components/motion/ContactSection.tsx` (scroll-paint)
- `src/components/motion/DramaticFooter.tsx` (scroll-paint)

