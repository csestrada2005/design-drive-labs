import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroLogo from "@/assets/hero-logo.jpeg";

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // Laser animation — triggers once on first scroll attempt
  const [laserFired, setLaserFired] = useState(false);
  const laserDone = useRef(false);

  useEffect(() => {
    if (laserDone.current) return;
    const handleScroll = () => {
      if (laserDone.current) return;
      laserDone.current = true;
      setLaserFired(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true, once: true });
    // Also handle wheel for when smooth scroll hasn't started yet
    const handleWheel = () => {
      if (laserDone.current) return;
      laserDone.current = true;
      setLaserFired(true);
    };
    window.addEventListener("wheel", handleWheel, { passive: true, once: true });
    window.addEventListener("touchmove", handleWheel, { passive: true, once: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleWheel);
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
      style={{ opacity, scale, y }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroLogo})`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(var(--background) / 0.7) 100%)",
        }}
      />

      {/* Laser animation — one-time on first scroll */}
      <AnimatePresence>
        {laserFired && (
          <>
            {/* Horizontal laser sweep */}
            <motion.div
              key="laser-h"
              className="absolute pointer-events-none"
              style={{
                left: 0,
                right: 0,
                height: 2,
                top: "50%",
                background: "linear-gradient(90deg, transparent, hsl(0 100% 50%) 20%, hsl(0 100% 70%) 50%, hsl(0 100% 50%) 80%, transparent)",
                boxShadow: "0 0 30px hsl(0 100% 50% / 0.8), 0 0 60px hsl(0 100% 50% / 0.4), 0 0 120px hsl(0 100% 50% / 0.2)",
                zIndex: 50,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1], ease: [0.25, 1, 0.5, 1] }}
            />
            {/* Vertical laser sweep */}
            <motion.div
              key="laser-v"
              className="absolute pointer-events-none"
              style={{
                top: 0,
                bottom: 0,
                width: 2,
                left: "50%",
                background: "linear-gradient(180deg, transparent, hsl(0 100% 50%) 20%, hsl(0 100% 70%) 50%, hsl(0 100% 50%) 80%, transparent)",
                boxShadow: "0 0 30px hsl(0 100% 50% / 0.8), 0 0 60px hsl(0 100% 50% / 0.4), 0 0 120px hsl(0 100% 50% / 0.2)",
                zIndex: 50,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1], ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            />
            {/* Flash */}
            <motion.div
              key="laser-flash"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, hsl(0 100% 50% / 0.15), transparent 60%)",
                zIndex: 49,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
