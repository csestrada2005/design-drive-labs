import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { GeometryCanvas } from "@/components/motion/GeometryCanvas";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";

export const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const magneticPrimary = useMagnetic(0.35);
  const magneticGhost = useMagnetic(0.25);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 100,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 100,
    });
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 right-0 h-[70%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(0 100% 50% / 0.1), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: "10%",
          right: "5%",
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.06), transparent 70%)",
        }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          bottom: "20%",
          left: "10%",
          background: "radial-gradient(circle, hsl(20 100% 50% / 0.04), transparent 70%)",
        }}
        animate={{
          x: [0, -15, 10, 0],
          y: [0, 10, -15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[100dvh] py-24">
          {/* Left: Copy */}
          <div className="relative">
            {/* Vertical divider on desktop */}
            <div className="hidden lg:block absolute -right-2 top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(to bottom, transparent, hsl(0 100% 50% / 0.3), transparent)",
                }}
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-6 font-medium flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary/50" />
              Web Design & Development Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.92] mb-6"
            >
              <motion.span
                className="block overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                BUILD YOUR
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                NEXT WEBSITE
              </motion.span>
              <motion.span
                className="block text-primary overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                LIKE A PRODUCT.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-muted-foreground text-sm sm:text-base max-w-md mb-8 leading-relaxed"
            >
              Cuatre designs and builds high-converting websites, e-commerce, and lightweight systems for SMBs. Fast delivery. Clear process. Real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <a
                href="#contact"
                className="btn-primary text-sm group inline-block"
                ref={magneticPrimary.ref as React.RefObject<HTMLAnchorElement>}
                onMouseMove={magneticPrimary.onMouseMove}
                onMouseLeave={magneticPrimary.onMouseLeave}
              >
                Get a Proposal
                <ArrowRight className="w-4 h-4 inline ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="btn-ghost text-sm inline-block"
                ref={magneticGhost.ref as React.RefObject<HTMLAnchorElement>}
                onMouseMove={magneticGhost.onMouseMove}
                onMouseLeave={magneticGhost.onMouseLeave}
              >
                View Work
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-muted-foreground/50 text-[11px] tracking-wide flex items-center gap-3"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                15-day delivery available
              </span>
              <span>•</span>
              <span>Mobile-first</span>
              <span>•</span>
              <span>CRO-focused</span>
            </motion.p>
          </div>

          {/* Right: Canvas */}
          <div className="relative h-[400px] lg:h-[550px]">
            <GeometryCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

            {/* Central glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(0 100% 50% / 0.12), transparent 70%)",
              }}
            />

            {/* Corner accents */}
            <svg className="absolute top-4 right-4 w-12 h-12 text-primary/10" viewBox="0 0 48 48" aria-hidden="true">
              <line x1="48" y1="0" x2="48" y2="16" stroke="currentColor" strokeWidth="0.5" />
              <line x1="32" y1="0" x2="48" y2="0" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <svg className="absolute bottom-4 left-4 w-12 h-12 text-primary/10" viewBox="0 0 48 48" aria-hidden="true">
              <line x1="0" y1="32" x2="0" y2="48" stroke="currentColor" strokeWidth="0.5" />
              <line x1="0" y1="48" x2="16" y2="48" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
