import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const SectionSeparator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="h-24 flex items-center overflow-hidden">
      <motion.div
        className="h-2 bg-primary rounded-full"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        style={{
          boxShadow: "0 0 20px hsl(0 100% 50% / 0.4), 0 0 60px hsl(0 100% 50% / 0.15)",
        }}
      />
    </div>
  );
};
