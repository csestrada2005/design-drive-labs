import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;
const OWN_KEYS = ["own1", "own2", "own3", "own4", "own5"] as const;

const AccordionItem = ({ qKey, aKey, index }: { qKey: string; aKey: string; index: number }) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 pr-4">
          <span className="text-xs sm:text-[10px] font-mono text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm sm:text-base font-medium text-foreground/90">{t(qKey)}</span>
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
              {t(aKey)}
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
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-20 sm:py-28 relative overflow-hidden" id="faq">
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
            {t("faq.eyebrow")}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3">
            {t("faq.title")} <span className="text-primary">{t("faq.titleAccent")}</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {FAQ_KEYS.map((key, i) => (
            <AccordionItem key={key} qKey={`faq.${key}`} aKey={`faq.a${i + 1}`} index={i} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-xl border border-white/[0.06]"
          style={{ background: "hsl(var(--background) / 0.5)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display text-xl sm:text-2xl mb-2">
            {t("faq.ownTitle")} <span className="text-primary">{t("faq.ownTitleAccent")}</span>
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            {t("faq.ownSubtitle")}
          </p>

          <ul className="space-y-3">
            {OWN_KEYS.map((key, i) => (
              <motion.li
                key={key}
                className="flex items-center gap-3 text-sm text-foreground/80"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {t(`faq.${key}`)}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              {t("faq.ownGuarantee")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
