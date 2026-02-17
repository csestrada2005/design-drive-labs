import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const StatsStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Avg delivery: 15 days", icon: "⚡" },
    { label: "Conversion-first", icon: "📈" },
    { label: "Mobile-first", icon: "📱" },
    { label: "SEO-ready", icon: "🔍" },
  ];

  return (
    <section ref={ref} className="py-10 border-b border-border/30 relative overflow-hidden">
      {/* Subtle gradient underline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground text-xs tracking-wide uppercase font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
