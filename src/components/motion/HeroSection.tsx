import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroLogo from "@/assets/hero-logo.jpeg";

/* ── Glitch line component ── */
const GlitchLine = ({ delay, y }: { delay: number; y: string }) => (
  <motion.div
    className="absolute left-0 right-0 pointer-events-none"
    style={{
      top: y,
      height: 2,
      background: "hsl(0 100% 50%)",
      boxShadow: "0 0 20px hsl(0 100% 50% / 0.8), 0 0 60px hsl(0 100% 50% / 0.4)",
      zIndex: 52,
    }}
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{
      scaleX: [0, 1, 1, 0],
      opacity: [0, 1, 0.8, 0],
      x: ["-5%", "0%", "3%", "0%"],
    }}
    transition={{
      duration: 0.3,
      delay,
      ease: "easeOut",
    }}
  />
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // Aggressive boot animation — triggers once on ANY input
  const [bootPhase, setBootPhase] = useState<"idle" | "glitch" | "done">("idle");
  const bootDone = useRef(false);

  useEffect(() => {
    if (bootDone.current) return;

    const trigger = () => {
      if (bootDone.current) return;
      bootDone.current = true;
      setBootPhase("glitch");
      setTimeout(() => {
        setBootPhase("done");
        // Auto-scroll to BuildModes
        setTimeout(() => {
          document.getElementById("build")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }, 1800);
    };

    // Use capturing phase to intercept before Lenis
    const opts = { passive: true, capture: true };
    window.addEventListener("wheel", trigger, opts);
    window.addEventListener("touchstart", trigger, opts);
    window.addEventListener("keydown", trigger, opts);
    // Also a fallback timeout — if user scrolled but Lenis ate the event
    const scrollCheck = setInterval(() => {
      if (window.scrollY > 5) trigger();
    }, 100);

    return () => {
      window.removeEventListener("wheel", trigger, opts as EventListenerOptions);
      window.removeEventListener("touchstart", trigger, opts as EventListenerOptions);
      window.removeEventListener("keydown", trigger, opts as EventListenerOptions);
      clearInterval(scrollCheck);
    };
  }, []);

  return (
    <>
      <motion.section
        ref={ref}
        className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
        id="hero"
        style={{ opacity, scale, y }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroLogo})`,
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(var(--background) / 0.7) 100%)",
          }}
        />
      </motion.section>

      {/* Full-screen glitch overlay — fixed so it covers everything */}
      <AnimatePresence>
        {bootPhase === "glitch" && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Multiple horizontal glitch scan lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <GlitchLine key={`gl-${i}`} delay={i * 0.06} y={`${10 + i * 11}%`} />
            ))}

            {/* Full screen flash — white */}
            <motion.div
              key="flash-white"
              className="absolute inset-0"
              style={{ background: "hsl(0 0% 100%)", zIndex: 55 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0, 0.4, 0] }}
              transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 0.5], ease: "easeOut" }}
            />

            {/* Red flash overlay */}
            <motion.div
              key="flash-red"
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, hsl(0 100% 50% / 0.3), transparent 70%)",
                zIndex: 54,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 0.6, 0] }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />

            {/* CRT-style noise bars */}
            <motion.div
              key="noise-bars"
              className="absolute inset-0"
              style={{
                zIndex: 53,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 0% / 0.08) 2px, hsl(0 0% 0% / 0.08) 4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.5, 0] }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            />

            {/* Vertical glitch displacement blocks */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`vblock-${i}`}
                className="absolute"
                style={{
                  left: `${15 + i * 22}%`,
                  top: 0,
                  bottom: 0,
                  width: `${6 + i * 3}%`,
                  background: `hsl(0 100% 50% / ${0.06 + i * 0.03})`,
                  zIndex: 51,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 1, 0],
                  opacity: [0, 0.8, 0.4, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              />
            ))}

            {/* Final black-to-clear wipe */}
            <motion.div
              key="wipe"
              className="absolute inset-0"
              style={{ background: "hsl(0 0% 0%)", zIndex: 50 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
