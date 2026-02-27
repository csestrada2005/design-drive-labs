import { useState, useRef, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: string;
  title: string;
  image: string;
  tag: string;
  context: string;
  whatWeDid: string;
  outcome: string;
}

interface ProjectFlipCardProps {
  project: Project;
  index: number;
}

export const ProjectFlipCard = ({ project, index }: ProjectFlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();

  const toggle = useCallback(() => setFlipped((f) => !f), []);

  if (prefersReduced) {
    return (
      <motion.div
        ref={containerRef}
        className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.06 }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
        aria-label={`${project.title} — ${flipped ? t("work.back") : t("work.seeBreakdown")}`}
      >
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: flipped ? 0 : 1, pointerEvents: flipped ? "none" : "auto" }}
        >
          <CardFront project={project} index={index} />
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: flipped ? 1 : 0, pointerEvents: flipped ? "auto" : "none" }}
        >
          <CardBack project={project} onBack={toggle} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative aspect-square sm:aspect-[4/3] cursor-pointer"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
      aria-label={`${project.title} — ${flipped ? t("work.back") : t("work.seeBreakdown")}`}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <CardFront project={project} index={index} />
        </div>
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardBack project={project} onBack={toggle} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CardFront = ({ project, index }: { project: Project; index: number }) => (
  <div className="relative w-full h-full">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-contain bg-black/40"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
    <div className="absolute top-3 left-3 flex items-center gap-2">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded-full text-white/70"
        style={{ background: "hsl(0 0% 100% / 0.1)" }}
      >
        {project.tag}
      </span>
    </div>
    <div
      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
      style={{ background: "hsl(0 0% 100% / 0.12)" }}
    >
      <RotateCcw className="w-3 h-3 text-white/70" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="font-display text-lg sm:text-xl text-white leading-tight">
        {project.title}
      </h3>
      <p className="text-[11px] text-white/60 mt-1">{project.context}</p>
    </div>
  </div>
);

const CardBack = ({ project, onBack }: { project: Project; onBack: () => void }) => {
  const { t } = useLanguage();

  return (
    <div
      className="relative w-full h-full flex flex-col p-3 sm:p-6 overflow-y-auto"
      style={{
        background: "hsl(var(--card))",
        borderRadius: "0.75rem",
        border: "1px solid hsl(0 0% 100% / 0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-primary">
          {project.tag}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onBack(); }}
          className="sm:hidden flex items-center gap-1 text-[10px] text-muted-foreground active:scale-95 transition-transform min-h-[36px] min-w-[36px] justify-center"
          aria-label={t("work.back")}
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <h3 className="font-display text-base sm:text-2xl text-foreground leading-tight mb-2 sm:mb-4">
        {project.title}
      </h3>

      <div>
        <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1 sm:mb-1.5">
          {t("work.whatWeDid")}
        </p>
        <ul className="space-y-0.5 sm:space-y-1">
          {project.whatWeDid.split(" · ").map((item) => (
            <li key={item} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/90 leading-snug sm:leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome only on desktop */}
      <div className="hidden sm:block mt-3">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
          {t("work.outcome")}
        </p>
        <p className="text-sm text-primary/90 leading-relaxed">
          {project.outcome}
        </p>
      </div>
    </div>
  );
};
