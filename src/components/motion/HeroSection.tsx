import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    </motion.section>
  );
};
