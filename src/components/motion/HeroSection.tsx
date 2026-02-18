import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LaserTransition = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div className="fixed inset-0 z-[150] pointer-events-none" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Solid background so hero doesn't peek through */}
      <div className="absolute inset-0 bg-background" />
      {/* Red laser line sweeping bottom to top */}
      <motion.div
        className="absolute left-0 right-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, hsl(0 100% 50%) 30%, hsl(0 100% 60%) 50%, hsl(0 100% 50%) 70%, transparent 95%)",
          boxShadow: "0 0 30px 8px hsl(0 100% 50% / 0.6), 0 0 60px 15px hsl(0 100% 50% / 0.3)",
        }}
        initial={{ bottom: "0%" }}
        animate={{ bottom: "100%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Flash overlay that fades */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "hsl(0 100% 50% / 0.08)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 1, times: [0, 0.4, 1] }}
      />
    </motion.div>
  );
};

export const HeroSection = () => {
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [showLaser, setShowLaser] = useState(false);
  const isTransitioning = useRef(false);

  const handleLaserDone = useCallback(() => {
    // First scroll instantly while overlay still covers
    const hero = document.getElementById("hero");
    if (hero) {
      window.scrollTo({ top: hero.offsetHeight, behavior: "instant" as ScrollBehavior });
    }
    // Then remove laser and unlock scroll
    requestAnimationFrame(() => {
      setShowLaser(false);
      setHasTransitioned(true);
      document.body.style.overflow = "";
    });
  }, []);

  useEffect(() => {
    if (hasTransitioned) return;

    const trigger = () => {
      if (hasTransitioned || isTransitioning.current) return;
      isTransitioning.current = true;
      document.body.style.overflow = "hidden";
      setShowLaser(true);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      trigger();
    };

    const handleTouchStart = (e: TouchEvent) => {
      const startY = e.touches[0].clientY;
      const handleTouchMove = (me: TouchEvent) => {
        if (Math.abs(startY - me.touches[0].clientY) > 30) {
          me.preventDefault();
          trigger();
        }
        window.removeEventListener("touchmove", handleTouchMove);
      };
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "Space", "PageDown"].includes(e.code)) {
        e.preventDefault();
        trigger();
      }
    };

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasTransitioned]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLaser && <LaserTransition onDone={handleLaserDone} />}
      </AnimatePresence>

      <section
        className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
        id="hero"
        style={{
          backgroundImage: "url('/images/hero-logo.jpeg')",
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Scroll hint */}
        {!hasTransitioned && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-5 h-8 border-2 border-foreground/30 flex items-start justify-center pt-1.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-1.5 bg-foreground/50"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  );
};
