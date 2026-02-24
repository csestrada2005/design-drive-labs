

## Fix "How we work" Section: Scroll Range and Sensitivity

### Problems Identified

1. **Starts at step 2**: The first step begins at opacity 0 and requires scrolling to fade in, so by the time content becomes visible, the user has already scrolled past step 1.
2. **Ends at step 3**: The container is 600vh tall (6 x 100vh), meaning each step gets ~120vh of scroll distance. Combined with issue #1, the visible scroll range only covers steps 2-3 before the user loses patience or the section ends visually.
3. **Too much scroll needed**: Each step requires a full 120vh of scrolling to transition, making it feel sluggish.

### Solution

**File: `src/components/motion/ProcessSection.tsx`**

1. **Reduce container height** from `(steps.length + 1) * 100vh` (600vh) to `steps.length * 80vh` (400vh). This makes each step transition require less scrolling -- more responsive to user input.

2. **Fix first step visibility**: Make step 1 start at full opacity (1) instead of fading from 0. This ensures the user immediately sees "01 - Audit and Strategy" when entering the section.

3. **Adjust segment math**: With 5 steps across 400vh, each step gets ~80vh of scroll, which is roughly one strong scroll gesture -- much more sensitive than the current 120vh.

### Technical Details

- `StepSlide` component: For `index === 0`, set initial opacity to 1 (visible on entry), transitioning out at the segment boundary.
- Container height: Change from `${(steps.length + 1) * 100}vh` to `${steps.length * 80}vh`.
- The `ProgressDot` math stays the same since it's based on relative progress (0-1 range).

