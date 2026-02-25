import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

/**
 * MicroCTA — Discrete, consistent conversion nudge placed at the end of key sections.
 * Primary: "Book a Strategy Call" → #contact
 * Secondary: "View Work" → #work
 *
 * Variants:
 * - "both"    → primary + secondary
 * - "primary" → primary only (for sections near the bottom)
 */
interface MicroCTAProps {
  variant?: "both" | "primary";
  className?: string;
}

export const MicroCTA = ({ variant = "both", className = "" }: MicroCTAProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <a
        href="#contact"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ boxShadow: "0 2px 16px -4px hsl(0 100% 50% / 0.35)" }}
      >
        Book a Strategy Call
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>

      {variant === "both" && (
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:border-primary/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Work
        </a>
      )}
    </motion.div>
  );
};
