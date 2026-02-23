
## Fix: Bottom Navigation Bar Visibility

### Problem
The bottom nav bar uses `window.addEventListener("scroll", ...)` to detect scrolling, but **Lenis smooth scroll** (which wraps all scrolling in the app) can sometimes delay or skip native scroll events, causing `window.scrollY` to read as 0 and the bar to stay hidden (`opacity-0`, `pointer-events-none`).

### Solution

1. **Make the bar visible by default** -- Remove the scroll-based show/hide logic entirely. The bar should always be visible as a fixed element at the bottom of the screen (matching the old "Refactor Tron palette" behavior where it was always present).

2. **Increase z-index to `z-[70]`** -- Ensures it sits above the NebuOrb (`z-[60]`) and any other overlays.

3. **Remove the `isVisible` state and scroll listener** -- No more conditional opacity/translate. The bar is simply always there once the component mounts.

### Technical Details

**File: `src/components/motion/BottomNav.tsx`**

- Remove the `isVisible` state and the `useEffect` that listens for scroll
- Remove the conditional classes `opacity-0 translate-y-8 pointer-events-none`
- Change z-index from `z-[65]` to `z-[70]`
- The nav element becomes simply: `fixed bottom-4 left-1/2 -translate-x-1/2 z-[70]`

This matches the previous versions where the bar was always visible at the bottom without any scroll-dependent visibility logic.
