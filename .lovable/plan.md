

# Fix Persistent Image Caching Issue

## Root Cause
Both background images (`owl-bg.png` and `hero-logo.jpeg`) are stored in the `public/` folder and referenced via static URL paths. When these files are replaced (same filename, new content), the browser cache continues serving the **old** versions. This is why you keep seeing the old owl/phoenix drawing instead of the marble texture and updated logo.

## Solution
Move the images from `public/images/` to `src/assets/` and import them as JavaScript modules. Vite automatically adds a unique content hash to each filename during builds (e.g., `owl-bg-a3f2c1.png`), which forces the browser to download the new version whenever the file changes. This eliminates caching issues permanently.

## Technical Details

### Files to modify

1. **Move assets**
   - `public/images/owl-bg.png` -> `src/assets/owl-bg.png`
   - `public/images/hero-logo.jpeg` -> `src/assets/hero-logo.jpeg`

2. **`src/index.css`** -- Remove the `background-image` line from the `body` rule (CSS cannot use ES module imports)

3. **`src/App.tsx`** (or a new layout wrapper) -- Import `owl-bg.png` and apply it as an inline style on a wrapper `div`, so the marble texture background works site-wide:
   ```
   import owlBg from "@/assets/owl-bg.png";
   // Apply via style={{ backgroundImage: `url(${owlBg})` }}
   ```

4. **`src/components/motion/HeroSection.tsx`** -- Import `hero-logo.jpeg` and use it in the inline style instead of the static string path:
   ```
   import heroLogo from "@/assets/hero-logo.jpeg";
   // Use: backgroundImage: `url(${heroLogo})`
   ```

### Why this works
- Vite processes imported assets and appends a content hash to the filename
- Any time the file content changes, the hash changes, and the browser fetches the new version
- No more stale cached images after updates

