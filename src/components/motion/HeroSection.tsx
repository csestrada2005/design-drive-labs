import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroLogo from "@/assets/hero-logo.jpeg";
import { useMouseParallax } from "@/hooks/useAnimations";

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mouse = useMouseParallax();

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // Multi-layer parallax depths
  const bgX = mouse.x * 8;
  const bgY = mouse.y * 8;
  const gridX = mouse.x * -15;
  const gridY = mouse.y * -15;
  const textX = mouse.x * 20;
  const textY = mouse.y * 20;

  return (
    <motion.section
      ref={ref}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
      style={{ opacity, scale, y }}
    >
      {/* Background image — depth layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroLogo})`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          x: bgX,
          y: bgY,
        }}
      />

      {/* Grid overlay — depth layer 2 */}
      <motion.div
        className="absolute inset-[-20px] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          x: gridX,
          y: gridY,
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
