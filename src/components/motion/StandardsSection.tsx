import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useGlassParallax } from "@/hooks/useGlassParallax";
import { MetricsHUD } from "@/components/motion/MetricsHUD";
import { useLanguage } from "@/contexts/LanguageContext";

const STANDARD_KEYS = ["s1", "s2", "s3", "s4"] as const;

export const StandardsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { sectionRef, bgY, lightX, lightOp } = useGlassParallax(28);
  const { t } = useLanguage();

  return (
    <section
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-24 sm:py-32 relative overflow-hidden"
      id="standards">

      <MetricsHUD tags={["SPEED", "SEO"]} sectionId="standards" position="top-right" />
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
          "radial-gradient(ellipse 80% 60% at 60% 40%, hsl(0 100% 50% / 0.03), transparent 70%)"
        }} />

      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          x: lightX,
          opacity: lightOp,
          width: "35%",
          background:
          "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.035) 40%, hsl(0 0% 100% / 0.06) 50%, hsl(0 0% 100% / 0.035) 60%, transparent)"
        }} />

      <div className="container relative z-10">
        <div className="mb-16 sm:mb-20 max-w-2xl">
           <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
           </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground">
            {t("standards.title")}
          </h2>
           <motion.p
             className="text-foreground/80 text-sm leading-relaxed max-w-md"
             initial={{ opacity: 0, y: 14 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
             {t("standards.subtitle")}
          </motion.p>
        </div>

        <div
          className="grid sm:grid-cols-2 gap-px"
          style={{ border: "1px solid hsl(0 0% 100% / 0.07)" }}>

          {STANDARD_KEYS.map((key, i) =>
          <motion.div
            key={key}
            className="group relative p-7 sm:p-8 hover:bg-primary/[0.04] transition-colors duration-300"
            style={{
              borderRight: "1px solid hsl(0 0% 100% / 0.07)",
              borderBottom: "1px solid hsl(0 0% 100% / 0.07)"
            }}
             initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>

              <span className="block font-mono text-xs sm:text-[10px] tracking-[0.25em] text-primary/40 mb-4 group-hover:text-primary/70 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-lg sm:text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {t(`standards.${key}.label`)}
              </h3>

              <p className="text-foreground/90 text-sm leading-relaxed">{t(`standards.${key}.desc`)}</p>

              <motion.div
              className="absolute bottom-0 left-0 h-px bg-primary"
               initial={{ scaleX: 0 }}
               whileHover={{ scaleX: 1 }}
               style={{ transformOrigin: "left", width: "100%" }}
               transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />

            </motion.div>
          )}
        </div>
      </div>
    </section>);
};
