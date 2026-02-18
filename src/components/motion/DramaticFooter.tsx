import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollPaint } from "@/hooks/useScrollPaint";

const statements = [
  "BUILT FOR CONVERSION",
  "DESIGN WITH CLARITY",
  "CODE WITH DISCIPLINE",
  "SHIP FAST",
  "IMPROVE ALWAYS",
];

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const FluidGradientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    let time = 0;
    const animate = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const blobs = [
        { cx: w * 0.3, cy: h * 0.4, r: 80, color: "rgba(255, 50, 30, 0.25)", phase: 0 },
        { cx: w * 0.6, cy: h * 0.5, r: 60, color: "rgba(255, 120, 30, 0.2)", phase: 1.5 },
        { cx: w * 0.5, cy: h * 0.6, r: 70, color: "rgba(255, 50, 30, 0.15)", phase: 3 },
        { cx: w * 0.7, cy: h * 0.3, r: 50, color: "rgba(13, 13, 13, 0.4)", phase: 4.5 },
      ];
      blobs.forEach((blob) => {
        const x = blob.cx + Math.sin(time + blob.phase) * 30;
        const y = blob.cy + Math.cos(time * 0.7 + blob.phase) * 20;
        const r = blob.r + Math.sin(time * 1.3 + blob.phase) * 15;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.filter = "blur(40px)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-48 sm:h-64 opacity-70" aria-hidden="true" />;
};

export const DramaticFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const headerPaint = useScrollPaint({ xDrift: 15, yDrift: 30 });

  return (
    <footer ref={ref} className="relative overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} aria-hidden="true" />

      {[...Array(10)].map((_, i) => (
        <motion.span key={i} className="absolute text-primary/30 font-light select-none pointer-events-none" style={{ fontSize: `${14 + (i * 6)}px`, left: `${8 + (i * 10) % 85}%`, top: `${3 + (i * 12) % 65}%` }} animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 45, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} aria-hidden="true">+</motion.span>
      ))}

      <div className="container relative z-10">
        <motion.div ref={headerPaint.ref} style={headerPaint.style}>
          <div className="space-y-4 mb-16">
            {statements.map((statement, i) => (
              <motion.div key={statement} initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }} className="flex items-center gap-4 group">
                <motion.span className="text-primary text-xl font-light" animate={isInView ? { rotate: [0, 90, 0] } : {}} transition={{ duration: 2, delay: i * 0.12 + 0.5 }}>+</motion.span>
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl text-foreground group-hover:text-foreground transition-colors">{statement}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative mb-16 rounded-xl overflow-hidden">
          <FluidGradientCanvas />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground/30">NEBU STUDIO</h2>
          </div>
        </div>

        <div className="border-t border-border/20 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}>
              <h2 className="font-display text-4xl sm:text-5xl mb-2">NEBU STUDIO</h2>
              <p className="text-muted-foreground text-xs tracking-wider">Web Design • E-commerce • Systems</p>
            </motion.div>
            <nav className="flex gap-6" aria-label="Footer navigation">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
          <p className="text-center text-muted-foreground/60 text-[10px] mt-10 tracking-wider">© {new Date().getFullYear()} NEBU STUDIO. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
