import { useEffect, useRef } from "react";

export const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const draw = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18; // very subtle
      }

      ctx.putImageData(imageData, 0, 0);
      frame++;
      animId = requestAnimationFrame(draw);
    };

    // Only re-render grain every 3 frames for performance
    const throttledDraw = () => {
      frame++;
      if (frame % 3 === 0) {
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 14;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      animId = requestAnimationFrame(throttledDraw);
    };

    animId = requestAnimationFrame(throttledDraw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998] opacity-40"
      style={{ mixBlendMode: "overlay" }}
      aria-hidden="true"
    />
  );
};
