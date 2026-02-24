

## Awwwards-Level "Our Work" Gallery Refactor

### Overview

A complete refactor of `FeaturedWork.tsx` to deliver a premium, award-worthy project gallery with buttery-smooth animations, magnetic interactions, and full accessibility.

---

### 1. Shared Element Transition via `layoutId`

Strip out all manual `getBoundingClientRect` + offset calculation logic. Instead, use Framer Motion's `layoutId` prop to seamlessly morph between the circle thumbnail and the expanded modal.

**How it works:**
- Each `FloatingCircle` renders a `<motion.div layoutId={project.id}>` wrapping the circular image.
- When a project is selected, the circle unmounts and the `ExpandedView` renders a `<motion.div layoutId={project.id}>` at full size.
- Framer Motion automatically calculates and animates position, size, and `borderRadius` between the two elements -- no manual math needed.
- The `OriginRect` interface and all `getBoundingClientRect` code are deleted entirely.

---

### 2. Magnetic Hover Effect

Remove the infinite bobbing animation (`y: [0, -8, 0]`). Replace with a magnetic pull effect reusing the spring-based pattern from the existing `MagneticButton.tsx`:

- Each circle wrapper tracks `onMouseMove` and computes the cursor offset from the circle center.
- The offset is fed into `useSpring` values for `x` and `y`, pulling the circle toward the cursor with `strength: 0.25`.
- On `mouseLeave`, springs snap back to `(0, 0)`.
- On hover, the entire circle container scales to `1.08` via `whileHover`.

---

### 3. Responsive Collision-Free Layout

Replace the hardcoded `POSITIONS` array with a CSS Grid layout:

- Use a 3-column, 2-row grid (`grid-cols-3 grid-rows-2`) with generous gap.
- Each cell contains a circle centered within it, with slight random-looking offsets via `translateX/Y` (percentage-based, not absolute pixels) to break the rigid grid feel while remaining collision-free.
- On mobile (`< sm`), collapse to a 2-column, 3-row grid with smaller circles.
- The offsets are static per-item (predefined small nudges like `translate-x-2`, `-translate-y-3`) -- not truly random, just enough to feel organic.

---

### 4. Accessibility

- Convert clickable circle wrappers from `<motion.div>` to `<motion.button>` with `aria-label="View {project.title} project"`.
- Full keyboard navigation: `Tab` to focus, `Enter`/`Space` to open.
- Focus trap inside the expanded modal using a simple `useEffect` that listens for `Tab` and constrains focus to the close button.
- On close, return focus to the originating button via a stored `ref`.

---

### 5. Visual Polish

**Image transition during expansion:**
- During the `layoutId` morph, the image uses `object-cover` so it fills the shape seamlessly as it transforms.
- After the layout animation completes (detected via `onLayoutAnimationComplete`), crossfade to `object-contain` over ~300ms so the full image becomes visible without cropping.

**Glassmorphism backdrop:**
- Replace the flat `hsl(0 0% 4% / 0.92)` with: `background: rgba(0,0,0,0.6)`, `backdrop-filter: blur(40px) saturate(1.3)`.
- Add a subtle radial gradient overlay for depth.

**Close button:** Glassmorphic pill with blur background, fades in after the layout animation.

**Title:** Fades in below the expanded image after the morph completes.

---

### Technical Details

**File changed:** `src/components/motion/FeaturedWork.tsx` (full rewrite)

**Key architecture:**

```text
FeaturedWork
  +-- Section header ("Our Work.")
  +-- Grid container (CSS grid, 3x2 / 2x3 mobile)
  |     +-- MagneticCircle x6
  |           +-- <motion.button>
  |           +-- <motion.div layoutId={id}> (circle image) -- only when NOT active
  +-- Portal -> AnimatePresence
        +-- ExpandedView (when activeProject set)
              +-- Glassmorphic backdrop
              +-- <motion.div layoutId={id}> (expanded image)
              +-- Close button (focus-trapped)
              +-- Title label
```

**Dependencies:** No new packages. Uses existing `framer-motion`, `lucide-react`, `react-dom`.

**What gets deleted:**
- `OriginRect` interface
- `POSITIONS` array
- All `getBoundingClientRect` logic
- Infinite bobbing animation
- Manual scale/offset calculations in `ExpandedView`

