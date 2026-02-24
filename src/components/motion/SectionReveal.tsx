import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * SectionReveal — replaces SectionSeparator.
 * Uses a scroll-driven clip-path circle that expands as the section enters viewport,
 * creating a fluid "peeling" transition between sections.
 */
export const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Circle clip expands from 0% to 150% (overshoot to ensure full reveal)
  const clipRadius = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  if (prefersReduced) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        style={{
          clipPath: useTransform(clipRadius, (r) => `circle(${r} at 50% 50%)`),
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
