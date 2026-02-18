import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * useGlassParallax — returns scroll-driven values for:
 *   bgY      → background moves slower than foreground (parallax depth)
 *   lightX   → horizontal position of a "light band" sweeping across
 *   lightOp  → opacity of the light band (fades in + out at edges)
 *
 * Usage:
 *   const { sectionRef, bgY, lightX, lightOp } = useGlassParallax();
 *
 *   <section ref={sectionRef} style={{ overflow: "hidden" }}>
 *     <motion.div style={{ y: bgY }} />          ← background layer
 *     <motion.div style={{ x: lightX, opacity: lightOp }} /> ← light band
 *     … foreground content …
 *   </section>
 */
export interface GlassParallaxResult {
  sectionRef: React.RefObject<HTMLElement>;
  bgY: MotionValue<string>;
  lightX: MotionValue<string>;
  lightOp: MotionValue<number>;
}

export const useGlassParallax = (strength = 40): GlassParallaxResult => {
  const sectionRef = useRef<HTMLElement>(null!);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background drifts upward by `strength` px relative to scroll
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${strength}px`, `-${strength}px`]
  );

  // Light band sweeps from -100% to 200% across the section width
  const lightX = useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]);

  // Opacity peaks at mid-scroll
  const lightOp = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.55, 0.55, 0]
  );

  return { sectionRef, bgY, lightX, lightOp };
};
