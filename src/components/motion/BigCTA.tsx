import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GradientMeshCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let time = 0;

    const animate = () => {
      time += 0.004;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Gradient orbs
      const orbs = [
        { x: w * 0.3 + Math.sin(time) * 50, y: h * 0.4 + Math.cos(time * 0.8) * 30, r: 120, color: "rgba(79, 124, 255, 0.12)" },
        { x: w * 0.7 + Math.cos(time * 0.6) * 40, y: h * 0.6 + Math.sin(time * 0.9) * 25, r: 100, color: "rgba(31, 111, 91, 0.08)" },
        { x: w * 0.5 + Math.sin(time * 1.2) * 60, y: h * 0.3 + Math.cos(time * 0.5) * 40, r: 90, color: "rgba(79, 124, 255, 0.06)" },
      ];

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export const BigCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="cta">
      <GradientMeshCanvas />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-[0.95]"
          >
            EVERY SERIOUS BUSINESS NEEDS A SERIOUS{" "}
            <span className="text-primary">WEBSITE.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed"
          >
            Tell us what you're building. We'll respond with a clear plan, timeline, and a proposal you can actually execute.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href="#contact" className="btn-primary text-sm group">
              Make it Real
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/522213497090"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
