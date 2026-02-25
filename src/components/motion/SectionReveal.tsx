import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SectionReveal — scroll-triggered fade + slide-up reveal.
 * Previous clip-path approach collapsed section height to zero.
 * This version keeps sections in flow and reveals them on viewport entry.
 */
export const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
