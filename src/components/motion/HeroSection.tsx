import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShutterOverlay = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [onDone]);

  const blinds = 8;
  return (
    <motion.div
      className="fixed inset-0 z-[150] pointer-events-auto"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {Array.from({ length: blinds }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i / blinds) * 100}%`,
            width: `${100 / blinds + 0.2}%`,
            background: "hsl(var(--background))",
            borderRight: "1px solid hsl(var(--primary) / 0.15)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.65,
            delay: i * 0.03,
            times: [0, 0.35, 0.65, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
        style={{
          background: "hsl(var(--primary))",
          boxShadow: "0 0 20px 4px hsl(var(--primary) / 0.5)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 0.55, times: [0, 0.3, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.span
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 0.65, times: [0, 0.3, 0.6, 1] }}
        >
          ◈ Transitioning
        </motion.span>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const isTransitioning = useRef(false);

  const handleTransitionDone = useCallback(() => {
    setShowOverlay(false);
    setHasTransitioned(true);
    document.body.style.overflow = "";
    // Scroll to just past the hero
    const hero = document.getElementById("hero");
    if (hero) {
      window.scrollTo({ top: hero.offsetHeight, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  useEffect(() => {
    if (hasTransitioned) return;

    const handleWheel = (e: WheelEvent) => {
      if (hasTransitioned || isTransitioning.current) return;
      e.preventDefault();
      isTransitioning.current = true;
      document.body.style.overflow = "hidden";
      setShowOverlay(true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (hasTransitioned || isTransitioning.current) return;
      const startY = e.touches[0].clientY;
      
      const handleTouchMove = (me: TouchEvent) => {
        const deltaY = startY - me.touches[0].clientY;
        if (Math.abs(deltaY) > 30 && !isTransitioning.current) {
          me.preventDefault();
          isTransitioning.current = true;
          document.body.style.overflow = "hidden";
          setShowOverlay(true);
        }
        window.removeEventListener("touchmove", handleTouchMove);
      };

      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasTransitioned || isTransitioning.current) return;
      if (["ArrowDown", "Space", "PageDown"].includes(e.code)) {
        e.preventDefault();
        isTransitioning.current = true;
        document.body.style.overflow = "hidden";
        setShowOverlay(true);
      }
    };

    // Lock scroll initially
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
        {showOverlay && <ShutterOverlay onDone={handleTransitionDone} />}
      </AnimatePresence>

      <section
        className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
        id="hero"
      >
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tighter uppercase"
          >
            <span className="block">WE BUILD</span>
            <span className="block text-primary">REVENUE</span>
            <span className="block">ENGINES.</span>
          </motion.h1>
        </div>

        {/* Scroll hint */}
        {!hasTransitioned && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
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
