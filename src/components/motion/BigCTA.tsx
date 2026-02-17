import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EasterEgg } from "@/components/motion/EasterEgg";
import { useMagnetic } from "@/hooks/useMagnetic";
import { MarqueeButton } from "@/components/motion/MarqueeButton";

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

      const orbs = [
        { x: w * 0.3 + Math.sin(time) * 50, y: h * 0.4 + Math.cos(time * 0.8) * 30, r: 120, color: "rgba(255, 50, 30, 0.12)" },
        { x: w * 0.7 + Math.cos(time * 0.6) * 40, y: h * 0.6 + Math.sin(time * 0.9) * 25, r: 100, color: "rgba(255, 120, 30, 0.08)" },
        { x: w * 0.5 + Math.sin(time * 1.2) * 60, y: h * 0.3 + Math.cos(time * 0.5) * 40, r: 90, color: "rgba(255, 50, 30, 0.06)" },
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
  const magneticPrimary = useMagnetic(0.35);
  const magneticGhost = useMagnetic(0.25);

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="cta">
      <GradientMeshCanvas />

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
            <MarqueeButton text="Make it Real" href="#contact" variant="primary" />
            <MarqueeButton text="WhatsApp" href="https://wa.me/522213497090" variant="ghost" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <EasterEgg />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};