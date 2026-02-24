import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HeroTransition — one-time "Glass Slide + Blur Lock" overlay.
 * Renders a fixed glass panel that plays once when the user first scrolls
 * past the hero section. Stored in sessionStorage so it never reruns in the
 * same visit.
 */
export const HeroTransition = () => {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const hasPlayed = useRef(false);

  useEffect(() => {
    // Already played this session → skip immediately
    if (sessionStorage.getItem("nebu_hero_transition") === "done") {
      hasPlayed.current = true;
      setPhase("done");
      return;
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const onScroll = () => {
      if (hasPlayed.current) return;
      const scrollY = window.scrollY;
      const heroH = heroEl.offsetHeight;

      // Trigger once the user has scrolled ~12% of the hero height
      if (scrollY > heroH * 0.12) {
        hasPlayed.current = true;
        setPhase("playing");

        // After animation completes mark as done
        setTimeout(() => {
          setPhase("done");
          sessionStorage.setItem("nebu_hero_transition", "done");
        }, 850);

        window.removeEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          key="glass-transition"
          className="fixed inset-0 z-[999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Glass blur layer */}
          <motion.div
            className="absolute inset-0"
            initial={{ backgroundColor: "hsl(0 0% 0% / 0)" }}
            animate={{ backgroundColor: "hsl(0 0% 2% / 0.55)" }}
            exit={{
              backgroundColor: "hsl(0 0% 0% / 0)",
              transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Subtle glass sheen — horizontal highlight line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.06), transparent)" }}
            initial={{ top: "40%", opacity: 0 }}
            animate={{ top: "52%", opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Next section slide-up reveal indicator — a thin red progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: "hsl(0 100% 50%)", transformOrigin: "left" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0.6, 0] }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
