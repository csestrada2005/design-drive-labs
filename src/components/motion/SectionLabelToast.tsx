import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const TRACKED_SECTIONS = [
  { id: "modes", key: "toast.whatWeBuild" },
  { id: "process", key: "toast.howWeWork" },
  { id: "growth", key: "toast.growthImpact" },
  { id: "work", key: "toast.ourProjects" },
  { id: "contact", key: "toast.letsTalk" },
];

export const SectionLabelToast = () => {
  const [label, setLabel] = useState<string | null>(null);
  const cooldown = useRef(false);
  const lastId = useRef<string | null>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      if (cooldown.current) return;

      const viewportMid = window.scrollY + window.innerHeight * 0.45;

      for (const sec of TRACKED_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        if (viewportMid >= top && viewportMid <= top + 250 && lastId.current !== sec.id) {
          lastId.current = sec.id;
          cooldown.current = true;
          setLabel(t(sec.key));

          setTimeout(() => setLabel(null), 1400);
          setTimeout(() => { cooldown.current = false; }, 2000);
          return;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [t]);

  if (reduced) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase"
            style={{
              background: "hsl(var(--background) / 0.75)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
              color: "hsl(var(--primary))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
