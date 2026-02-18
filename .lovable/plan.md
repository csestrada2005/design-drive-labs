

# Refactor Loading Video and Hero Image

## What changes
1. **Replace the loading video** with the newly uploaded one (`WhatsApp_Video_2026-02-18_at_15.34.20.mp4`)
2. **Replace the hero background image** with the uploaded Nebu Studio owl image (`Gemini_Generated_Image_sv4w0isv4w0isv4w.png`)
3. Keep all existing behavior: video plays to completion, then hero shows as a static full-screen image with scroll-lock, first scroll triggers the red laser transition

## Why static image over paused video
- Pausing a video can't guarantee the exact frame across browsers
- Mobile browsers often won't render a paused video reliably
- A static image uses less memory and loads instantly
- Pixel-perfect, consistent result everywhere

## Technical Steps

### Step 1: Copy new assets
- Copy `WhatsApp_Video_2026-02-18_at_15.34.20.mp4` to `public/videos/intro.mp4` (replacing the current one)
- Copy `Gemini_Generated_Image_sv4w0isv4w0isv4w.png` to `public/images/hero-logo.jpeg` (replacing the current one)

### Step 2: Update HeroSection.tsx
- Remove the "NEBU / STUDIO" text overlay since the image itself already contains the branding
- Keep the hero as a pure full-screen background image display with the scroll-lock and laser transition logic unchanged
- Remove the grid overlay and any text elements that would cover the logo image

### Step 3: No changes needed to
- `LoadingScreen.tsx` (already reads from `/videos/intro.mp4`)
- `Index.tsx` (flow is already correct)
- `src/index.css` (background settings unchanged)

## Files Modified
- `public/videos/intro.mp4` -- replaced asset
- `public/images/hero-logo.jpeg` -- replaced asset
- `src/components/motion/HeroSection.tsx` -- remove text overlay, keep image-only hero

