

## Fix "Our Work" Section: Center Bubbles + Fix Expand Animation

### Problems

1. **Bubbles skewed left**: The `left` positions range from 10%-72%, leaving the right side empty. Need to shift everything rightward to visually center the cluster.
2. **Expand animation broken**: `height: "auto"` cannot be animated by framer-motion -- it doesn't know how to interpolate from `160px` to `"auto"`. The circle-to-rectangle morph never visually happens.

### Solution

**File: `src/components/motion/FeaturedWork.tsx`**

#### 1. Re-center bubble positions

Shift all `left` values rightward by ~8-10% so the cluster is visually centered within the full-width container:

```text
Before:                    After:
left: 12%  -> 18%          left: 55% -> 62%
left: 32%  -> 38%          left: 72% -> 76%
left: 10%  -> 20%          left: 58% -> 65%
```

#### 2. Fix the expand animation (circle-to-rectangle morph)

The core UX pattern is a **shared-element transition** (popularized by Material Design and Apple's App Store cards). The approach:

- Replace `height: "auto"` with a concrete pixel value like `min(80vh, 600px)` so framer-motion can interpolate it
- Show the image inside the container with `object-cover` filling the morphing shape
- Use a two-phase animation:
  - **Phase 1** (0-0.4s): Circle morphs to rectangle (`borderRadius: 50% -> 12px`, `width: 160 -> 90vw`, `height: 160 -> 80vh`)
  - **Phase 2** (0.3-0.6s): Image crossfades from cover-crop to full contain view, close button and title fade in
- Use `layout` prop on the container for smoother interpolation
- Add `exit` animation that reverses the morph (rectangle shrinks back to circle)

#### 3. Exit animation

Add a reverse morph on close: rectangle contracts back to a circle and fades out, giving the interaction a satisfying bookend.

### Technical Details

- Replace `height: "auto"` with `height: "min(80vh, 600px)"` in the `animate` prop -- this gives framer-motion a concrete target to interpolate
- Add `exit` props to reverse the morph: `{ width: 160, height: 160, borderRadius: "50%", opacity: 0 }`
- Update `POSITIONS` array with shifted `left` values
- Keep the backdrop blur, ESC key handler, and scroll lock as-is
