import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * StickyMobileCTA — persistent bottom bar on mobile only (< sm breakpoint).
 * Appears after 25% scroll OR past the hero. Hides near the contact section.
 * Tap targets ≥ 44px. Respects safe-area and reduced-motion.
 */
export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? scrollY / docHeight : 0;
      const vh = window.innerHeight;

      const contactEl = document.getElementById("contact");
      const contactTop = contactEl
        ? contactEl.getBoundingClientRect().top + scrollY
        : Infinity;

      // Show after 25% scroll OR past hero (1vh), hide near contact
      const pastThreshold = scrollPct >= 0.25 || scrollY > vh * 0.8;
      const beforeContact = scrollY < contactTop - vh * 0.5;

      setVisible(pastThreshold && beforeContact);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const animProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : { initial: { y: 72, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 72, opacity: 0 }, transition: { duration: 0.28, ease: "easeOut" as const } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...animProps}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
          style={{
            paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)",
            background: "linear-gradient(to top, hsl(var(--background)) 80%, hsl(var(--background) / 0))",
            paddingTop: 8,
          }}
          role="navigation"
          aria-label="Quick actions"
        >
          <div className="px-3 pb-1 flex gap-2">
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                height: 44,
                boxShadow: "0 2px 12px -2px hsl(0 100% 50% / 0.35)",
              }}
              aria-label="Book a call — go to contact form"
            >
              Book a Call
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#work"
              className="flex items-center justify-center px-4 rounded-full border border-border text-foreground text-xs font-semibold active:scale-95 transition-all hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ height: 44 }}
              aria-label="See our work — go to portfolio"
            >
              See Work
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
