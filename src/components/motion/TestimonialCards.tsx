import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "They didn't just build a site — they built a system that sells while we sleep.",
    name: "Client Name",
    role: "Founder",
    company: "D2C Brand",
  },
  {
    quote: "Improved conversion and performance from day one. The investment made sense fast.",
    name: "Client Name",
    role: "CEO",
    company: "SaaS Company",
  },
  {
    quote: "Finally a team that understands both design and performance. No trade-offs.",
    name: "Client Name",
    role: "Head of Growth",
    company: "E-commerce Co.",
  },
];

export const TestimonialCards = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 overflow-hidden">
      <div className="container max-w-5xl">
        <motion.p
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          What clients say
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              className="relative p-5 sm:p-6 rounded-xl border border-white/[0.06]"
              style={{ background: "hsl(var(--background) / 0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Quote mark */}
              <span className="absolute top-3 right-4 text-3xl leading-none text-primary/15 font-display select-none" aria-hidden="true">
                "
              </span>

              <p className="text-sm text-foreground/80 leading-relaxed mb-4 relative z-[1]">
                "{t.quote}"
              </p>

              <footer className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-mono text-muted-foreground/50">
                  {t.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/70">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground/50">
                    {t.role}, {t.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
