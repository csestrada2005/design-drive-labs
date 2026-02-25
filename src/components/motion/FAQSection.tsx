import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const FAQS = [
  {
    q: "How much does a project cost?",
    a: "Every project is scoped individually. We provide a detailed proposal after a free strategy call — no surprises, no hidden fees.",
  },
  {
    q: "What's the typical timeline?",
    a: "Most projects launch in 4–8 weeks depending on complexity. We agree on milestones upfront so you always know where things stand.",
  },
  {
    q: "What tech stack do you use?",
    a: "We build with modern, scalable tools — React, Next.js, Tailwind, Supabase, Shopify, and custom backends. We pick what fits your goals, not trends.",
  },
  {
    q: "Do I own everything at the end?",
    a: "Yes. Code, design files, assets, domain access, and documentation — it's all yours. No lock-in, no hostage situations.",
  },
  {
    q: "What kind of support do you offer after launch?",
    a: "We offer post-launch support plans and are available for iterations. Most clients stay for ongoing optimization — but it's never required.",
  },
  {
    q: "How do you handle SEO and performance?",
    a: "SEO-first architecture is built in from day one — semantic HTML, Core Web Vitals optimization, structured data, and fast load times.",
  },
  {
    q: "What does the handoff process look like?",
    a: "You get a complete handoff package: documented codebase, CMS walkthrough, credentials, and a recorded Loom session covering everything.",
  },
  {
    q: "How many revisions are included?",
    a: "Each milestone includes a structured feedback round. We work collaboratively so revisions are focused and efficient, not endless.",
  },
];

const OWNERSHIP = [
  "Full source code & repository access",
  "Design files (Figma) & brand assets",
  "Domain, hosting & third-party credentials",
  "CMS / admin access with training",
  "Technical documentation & handoff guide",
];

const AccordionItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 pr-4">
          <span className="text-xs sm:text-[10px] font-mono text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm sm:text-base font-medium text-foreground/90">{q}</span>
        </span>
         <motion.div
           animate={{ rotate: open ? 180 : 0 }}
           transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-8 pr-4 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden" id="faq">
      <div className="container relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-12"
           initial={{ opacity: 0, y: 14 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
            Common questions
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3">
            Before you <span className="text-primary">decide.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Straight answers. No fluff.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={isInView ? { opacity: 1 } : {}}
           transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>

        {/* What You Own block */}
        <motion.div
          className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl border border-white/[0.06]"
          style={{ background: "hsl(var(--background) / 0.5)" }}
           initial={{ opacity: 0, y: 18 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display text-xl sm:text-2xl mb-2">
            What you <span className="text-primary">own.</span>
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            Everything we build is yours. No lock-in. No dependencies on us.
          </p>

          <ul className="space-y-3">
            {OWNERSHIP.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-sm text-foreground/80"
                 initial={{ opacity: 0, x: -8 }}
                 animate={isInView ? { opacity: 1, x: 0 } : {}}
                 transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Guarantee microcopy */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Clear handoff + documentation included with every project.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
