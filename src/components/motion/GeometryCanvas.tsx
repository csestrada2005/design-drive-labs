import { useRef, useEffect, useCallback } from "react";

interface GeometryCanvasProps {
  className?: string;
  mouseX?: number;
  mouseY?: number;
}

interface Shape {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: "hex" | "square" | "circle" | "triangle" | "diamond" | "cross";
  opacity: number;
  pulsePhase: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

interface GridDot {
  x: number;
  y: number;
  baseOpacity: number;
}

export const GeometryCanvas = ({ className = "", mouseX = 0, mouseY = 0 }: GeometryCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const dotsRef = useRef<GridDot[]>([]);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const timeRef = useRef(0);

  const initShapes = useCallback((w: number, h: number) => {
    const shapes: Shape[] = [];
    const types: Shape["type"][] = ["hex", "square", "circle", "triangle", "diamond", "cross"];

    for (let i = 0; i < 18; i++) {
      const layer = i < 6 ? 0.3 : i < 12 ? 0.6 : 0.9;
      shapes.push({
        x: w * 0.3 + (Math.random() - 0.5) * w * 0.6,
        y: h * 0.3 + (Math.random() - 0.5) * h * 0.6,
        z: layer + Math.random() * 0.15,
        size: 15 + Math.random() * 55,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        type: types[i % types.length],
        opacity: 0.04 + Math.random() * 0.12,
        pulsePhase: Math.random() * Math.PI * 2,
        orbitRadius: 10 + Math.random() * 30,
        orbitSpeed: (Math.random() - 0.5) * 0.003,
        orbitAngle: Math.random() * Math.PI * 2,
      });
    }
    shapesRef.current = shapes;

    const dots: GridDot[] = [];
    for (let x = 40; x < w; x += 40) {
      for (let y = 40; y < h; y += 40) {
        dots.push({ x, y, baseOpacity: 0.03 + Math.random() * 0.04 });
      }
    }
    dotsRef.current = dots;
  }, []);

  /* ── Scroll handler ── */
  useEffect(() => {
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      if (shapesRef.current.length === 0) initShapes(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawShape = (shape: Shape, mx: number, my: number, scroll: number, time: number) => {
      const parallaxX = mx * shape.z * 0.03;
      const parallaxY = (my * shape.z * 0.03) + (scroll * shape.z * 0.04);

      const orbitX = Math.cos(shape.orbitAngle) * shape.orbitRadius;
      const orbitY = Math.sin(shape.orbitAngle) * shape.orbitRadius;

      const x = shape.x + parallaxX + orbitX;
      const y = shape.y - parallaxY + orbitY;

      const pulse = Math.sin(time * 0.002 + shape.pulsePhase) * 0.03;
      const opacity = Math.max(0.02, shape.opacity + pulse);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shape.rotation);
      ctx.globalAlpha = opacity;

      const s = shape.size;

      if (s > 35) {
        ctx.shadowColor = "rgba(255, 50, 30, 0.15)";
        ctx.shadowBlur = 20;
      }

      ctx.strokeStyle = "rgba(255, 50, 30, 0.8)";
      ctx.lineWidth = 0.8;

      switch (shape.type) {
        case "hex":
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const hx = Math.cos(angle) * s;
            const hy = Math.sin(angle) * s;
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.globalAlpha = opacity * 0.4;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const hx = Math.cos(angle) * s * 0.5;
            const hy = Math.sin(angle) * s * 0.5;
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          break;

        case "square":
          ctx.strokeRect(-s / 2, -s / 2, s, s);
          ctx.globalAlpha = opacity * 0.3;
          ctx.beginPath();
          ctx.moveTo(-s / 4, 0); ctx.lineTo(s / 4, 0);
          ctx.moveTo(0, -s / 4); ctx.lineTo(0, s / 4);
          ctx.stroke();
          break;

        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([2, 4]);
          ctx.globalAlpha = opacity * 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, s / 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 50, 30, 0.4)";
          ctx.fill();
          break;

        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, s / 2);
          ctx.lineTo(-s / 2, s / 2);
          ctx.closePath();
          ctx.stroke();
          break;

        case "diamond":
          ctx.beginPath();
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, 0);
          ctx.lineTo(0, s / 2);
          ctx.lineTo(-s / 2, 0);
          ctx.closePath();
          ctx.stroke();
          break;

        case "cross":
          const arm = s * 0.4;
          const thick = s * 0.12;
          ctx.beginPath();
          ctx.moveTo(-thick, -arm); ctx.lineTo(thick, -arm);
          ctx.lineTo(thick, -thick); ctx.lineTo(arm, -thick);
          ctx.lineTo(arm, thick); ctx.lineTo(thick, thick);
          ctx.lineTo(thick, arm); ctx.lineTo(-thick, arm);
          ctx.lineTo(-thick, thick); ctx.lineTo(-arm, thick);
          ctx.lineTo(-arm, -thick); ctx.lineTo(-thick, -thick);
          ctx.closePath();
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      timeRef.current += 16;
      const time = timeRef.current;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      dotsRef.current.forEach((dot) => {
        const dx = (mouseX * 0.5) - (dot.x - rect.width / 2);
        const dy = (mouseY * 0.5) - (dot.y - rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);

        ctx.fillStyle = `rgba(255, 50, 30, ${dot.baseOpacity + proximity * 0.15})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1 + proximity * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(139, 147, 161, 0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < rect.width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      const shapes = shapesRef.current;
      ctx.strokeStyle = "rgba(255, 50, 30, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.globalAlpha = (1 - dist / 180) * 0.15;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.orbitAngle += shape.orbitSpeed;
        drawShape(shape, mouseX, mouseY, scrollRef.current, time);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY, initShapes]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
