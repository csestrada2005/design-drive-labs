/**
 * FeaturedWork — "Selected Work" interactive gallery
 *
 * 5 projects, each opens a stacked-cards image viewer.
 * Japanese-tech minimal: no hard boxes, high contrast, premium motion.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView, useDragControls } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useScrollPaint } from "@/hooks/useScrollPaint";

// ── Storage base URL ─────────────────────────────────────────────────────────
const BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/project-mockups`;
const img = (project: string, n: number) => `${BASE}/${project}/${n}.png`;

// ── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "papachoa",
    title: "Papachoa",
    descriptor: "High-trust brand website",
    tags: ["Website", "Landing"],
    index: "01",
    images: [1, 2, 3, 4, 5].map((n) => img("papachoa", n)),
  },
  {
    id: "pawnshop",
    title: "Pawn Shop",
    descriptor: "Conversion-focused e-commerce",
    tags: ["E-commerce", "Website"],
    index: "02",
    images: [1, 2, 3, 4, 5].map((n) => img("pawnshop", n)),
  },
  {
    id: "jewelry",
    title: "Jewelry Catalog",
    descriptor: "Luxury product showcase",
    tags: ["E-commerce", "Landing"],
    index: "03",
    images: [1, 2, 3, 4, 5].map((n) => img("jewelry", n)),
  },
  {
    id: "rawpaw",
    title: "Raw Paw",
    descriptor: "D2C brand storefront",
    tags: ["Website", "E-commerce"],
    index: "04",
    images: [1, 2, 3, 4, 5].map((n) => img("rawpaw", n)),
  },
  {
    id: "system",
    title: "Custom System",
    descriptor: "Internal platform & automation",
    tags: ["System", "Dashboard"],
    index: "05",
    images: [1, 2, 3, 4, 5].map((n) => img("system", n)),
  },
];

type Project = (typeof PROJECTS)[number];

// ── Stacked Card Viewer ───────────────────────────────────────────────────────
const StackedViewer = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragControls = useDragControls();
  const total = project.images.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  // Stack offsets: cards behind current
  const getStackStyle = (offset: number) => {
    if (offset === 0) return { scale: 1, y: 0, rotateZ: 0, zIndex: 10, opacity: 1 };
    if (offset === 1) return { scale: 0.96, y: 10, rotateZ: 0.8, zIndex: 9, opacity: 0.7 };
    if (offset === 2) return { scale: 0.92, y: 20, rotateZ: 1.6, zIndex: 8, opacity: 0.5 };
    return { scale: 0.88, y: 28, rotateZ: 2.4, zIndex: 7, opacity: 0.3 };
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{ background: "hsl(0 0% 4% / 0.92)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Glass ghost sweep on open */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "110%" }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
        style={{
          width: "35%",
          background:
            "linear-gradient(105deg, transparent, hsl(0 0% 100% / 0.07) 50%, transparent)",
        }}
      />

      {/* Viewer container */}
      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1">
              {project.index} / Selected Work
            </p>
            <h3 className="font-display text-xl sm:text-2xl text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 2,
                    borderRadius: 1,
                    background: i === current ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.25)",
                  }}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="text-[10px] font-mono text-white/40">
              {current + 1}/{total}
            </span>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors"
              style={{ background: "hsl(0 0% 100% / 0.06)" }}
            >
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Card Stack */}
        <div
          className="relative"
          style={{ height: "min(56vw, 460px)", perspective: 1000 }}
        >
          {/* Render back cards (behind current) */}
          {[3, 2, 1].map((offset) => {
            const idx = (current + offset) % total;
            const style = getStackStyle(offset);
            return (
              <motion.div
                key={`back-${offset}`}
                className="absolute inset-0 rounded-sm overflow-hidden"
                animate={style}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                style={{ originY: 1 }}
              >
                <img
                  src={project.images[idx]}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0" style={{ background: "hsl(0 0% 0% / 0.25)" }} />
              </motion.div>
            );
          })}

          {/* Top card — animated in/out */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              className="absolute inset-0 rounded-sm overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ zIndex: 10, originY: 1 }}
              initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
              exit={{ x: direction > 0 ? "-110%" : "110%", opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
              onClick={next}
            >
              <img
                src={project.images[current]}
                alt={`${project.title} — ${current + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Subtle glass top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.04), transparent)" }}
              />
              {/* Tap hint */}
              {current === 0 && (
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
                  style={{ background: "hsl(0 0% 0% / 0.5)", backdropFilter: "blur(8px)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase">
                    tap or drag
                  </span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prev}
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
          >
            ← Prev
          </button>
          <p className="text-[10px] font-mono text-white/30 tracking-wider">
            {project.descriptor}
          </p>
          <button
            onClick={next}
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Project Row ───────────────────────────────────────────────────────────────
const ProjectRow = ({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onOpen}
        className="w-full text-left"
        aria-label={`View ${project.title}`}
      >
        <div
          className="flex items-center gap-6 sm:gap-10 py-6 sm:py-8 transition-all duration-300"
          style={{
            borderBottom: "1px solid hsl(0 0% 0% / 0.08)",
          }}
        >
          {/* Index */}
          <motion.span
            className="font-mono text-[10px] tracking-[0.25em] flex-shrink-0 w-7 hidden sm:block"
            animate={{ color: hovered ? "hsl(0 100% 50%)" : "hsl(0 0% 0% / 0.25)" }}
            transition={{ duration: 0.2 }}
          >
            {project.index}
          </motion.span>

          {/* Preview thumbnail */}
          <motion.div
            className="relative flex-shrink-0 overflow-hidden rounded-sm"
            animate={{
              width: hovered ? 80 : 52,
              height: hovered ? 56 : 36,
            }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src={project.images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ background: "hsl(0 0% 0% / 0.15)", opacity: hovered ? 0 : 1 }}
            />
          </motion.div>

          {/* Title + descriptor */}
          <div className="flex-1 min-w-0">
            <motion.h3
              className="font-display text-2xl sm:text-3xl md:text-4xl leading-none mb-1.5"
              animate={{ color: hovered ? "hsl(0 0% 0%)" : "hsl(0 0% 0% / 0.85)" }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {project.descriptor}
            </p>
          </div>

          {/* Tags */}
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[8px] font-mono tracking-[0.18em] uppercase"
                style={{
                  background: "hsl(0 0% 0% / 0.05)",
                  color: "hsl(0 0% 0% / 0.45)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View arrow */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-1.5"
            animate={{ x: hovered ? 0 : 4, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase hidden sm:block">
              View
            </span>
            <motion.div
              animate={{ rotate: hovered ? 0 : -10 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowUpRight className="w-4 h-4" style={{ color: hovered ? "hsl(0 100% 50%)" : "currentColor" }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover bottom bar */}
        <div
          className="absolute bottom-0 left-0 h-px w-full"
          style={{
            background: "hsl(0 100% 50%)",
            transformOrigin: "left",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </button>
    </motion.div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headerPaint = useScrollPaint({ xDrift: 16 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Lock scroll when viewer is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <>
      <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="work">
        <div className="container relative z-10">

          {/* Header */}
          <motion.div
            ref={headerPaint.ref}
            style={headerPaint.style}
            className="mb-14 sm:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[9px] font-mono tracking-[0.35em] uppercase text-primary mb-4">
              Selected Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
              WORK THAT <span className="text-primary">PERFORMS</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Interactive demos. Real outcomes.
            </p>
          </motion.div>

          {/* Project list */}
          <div>
            {PROJECTS.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Want yours next?{" "}
              <a
                href="#contact"
                className="font-display text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4"
              >
                Let's talk.
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Viewer overlay */}
      <AnimatePresence>
        {activeProject && (
          <StackedViewer
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
