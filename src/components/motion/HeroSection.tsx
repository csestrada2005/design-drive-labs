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
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* Technical grid background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[100dvh] py-24">
          {/* Left: Copy */}
          <div className="relative">
            {/* Vertical divider on desktop */}
            <div className="hidden lg:block absolute -right-2 top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full h-full bg-foreground"
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
              <span className="w-8 h-px bg-foreground" />
              Web Design & Development Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.88] mb-6"
            >
              <motion.span
                className="block overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                WE BUILD
              </motion.span>
              <motion.span
                className="block text-primary overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                REVENUE
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                ENGINES.
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
              className="text-muted-foreground text-[11px] tracking-wide flex items-center gap-3"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary" />
                15-day delivery available
              </span>
              <span>•</span>
              <span>Mobile-first</span>
              <span>•</span>
              <span>CRO-focused</span>
            </motion.p>
          </div>

          {/* Right: Canvas in a bordered technical box */}
          <div className="relative h-[400px] lg:h-[550px]">
            <motion.div
              className="relative w-full h-full border-2 border-foreground bg-background"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GeometryCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

              {/* Label */}
              <div className="absolute bottom-0 left-0 bg-foreground text-background px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium">
                FIG 1.0 — INTERACTION
              </div>

              {/* Corner marks */}
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
