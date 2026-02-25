import { useEffect, useRef } from "react";

export const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on mobile for performance
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-generate a fixed-size grain tile and just reuse it
    // Much cheaper than generating fullscreen every frame
    const TILE = 256;
    const offscreen = document.createElement("canvas");
    offscreen.width = TILE;
    offscreen.height = TILE;
    const octx = offscreen.getContext("2d")!;

    let animId: number;
    let frame = 0;

    // Pre-build 4 grain tiles to cycle through (avoids visible pattern)
    const tiles: ImageData[] = [];
    for (let t = 0; t < 4; t++) {
      const id = octx.createImageData(TILE, TILE);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 14;
      }
      tiles.push(id);
    }

    const resize = () => {
      // Match the bg-wrapper dimensions (viewport size since parent is fixed inset-0)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const draw = () => {
      frame++;
      // Only redraw every 4 frames (~15fps grain) — nearly invisible difference, huge CPU saving
      if (frame % 4 === 0) {
        const tileIdx = (frame / 4) % tiles.length;
        octx.putImageData(tiles[tileIdx], 0, 0);

        const pat = ctx.createPattern(offscreen, "repeat");
        if (pat) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-20"
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    />
  );
};
