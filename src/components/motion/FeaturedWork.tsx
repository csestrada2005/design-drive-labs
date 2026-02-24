/**
 * FeaturedWork — Awwwards-level "Our Work" gallery
 *
 * - layoutId shared-element transitions
 * - Magnetic hover effect (spring-based)
 * - Responsive CSS grid (3×2 desktop, 2×3 mobile)
 * - Full keyboard accessibility + focus trap
 * - Glassmorphism backdrop + object-cover → object-contain crossfade
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useSpring, useInView, LayoutGroup } from "framer-motion";
import { X } from "lucide-react";

import workPapachoa from "@/assets/work-papachoa.png";
import workBazar from "@/assets/work-bazar.png";
import workJewelry from "@/assets/work-jewelry.png";
import workRawpaw from "@/assets/work-rawpaw.png";
import workSystem from "@/assets/work-system.png";
import workArmahas from "@/assets/work-armahas.png";

const PROJECTS = [
  { id: "papachoa", title: "Papachoa", image: workPapachoa },
  { id: "bazar", title: "Bazar Centenario", image: workBazar },
  { id: "jewelry", title: "Joyería Centenario", image: workJewelry },
  { id: "rawpaw", title: "Raw Paw", image: workRawpaw },
  { id: "system", title: "Custom System", image: workSystem },
  { id: "armahas", title: "Armahas", image: workArmahas },
];

type Project = (typeof PROJECTS)[number];

// Organic offsets to break grid rigidity (percentage-based transforms)
const OFFSETS = [
  "translate-x-2 -translate-y-3",
  "-translate-x-3 translate-y-2",
  "translate-x-4 translate-y-1",
  "-translate-x-2 -translate-y-2",
  "translate-x-1 translate-y-3",
  "-translate-x-4 -translate-y-1",
];

// ── Magnetic Circle ──────────────────────────────────────────────────────────
const MagneticCircle = ({
  project,
  index,
  isActive,
  onOpen,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onOpen: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  const springX = useSpring(0, { stiffness: 200, damping: 18 });
  const springY = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    springX.set(dx * 0.25);
    springY.set(dy * 0.25);
  }, [springX, springY]);

  const handleMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  return (
    <motion.div
      ref={containerRef}
      className={`flex items-center justify-center ${OFFSETS[index]}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        ref={btnRef}
        className="flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
        aria-label={`View ${project.title} project`}
        onClick={onOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        data-project-id={project.id}
      >
        {/* Only render the layoutId element when NOT expanded */}
        {!isActive && (
          <motion.div
            layoutId={project.id}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors duration-300"
            style={{ borderRadius: "50%" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        )}
        {/* Invisible placeholder to keep layout when circle morphs away */}
        {isActive && (
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" />
        )}
        <span className="mt-3 text-xs sm:text-sm font-display text-foreground/70 group-hover:text-primary transition-colors duration-300 text-center whitespace-nowrap">
          {project.title}
        </span>
      </motion.button>
    </motion.div>
  );
};

// ── Expanded View ────────────────────────────────────────────────────────────
const ExpandedView = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [morphComplete, setMorphComplete] = useState(false);

  // Lock body scroll + keyboard handlers
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Focus trap: keep Tab on the close button
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    // Focus the close button on open
    setTimeout(() => closeRef.current?.focus(), 100);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  // Return focus to the originating button on close
  useEffect(() => {
    const originBtn = document.querySelector(`[data-project-id="${project.id}"]`) as HTMLElement;
    return () => {
      setTimeout(() => originBtn?.focus(), 50);
    };
  }, [project.id]);

  const targetW = Math.min(window.innerWidth * 0.9, 1100);
  const targetH = Math.min(window.innerHeight * 0.8, 700);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glassmorphism backdrop */}
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(40px) saturate(1.3)",
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle radial gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Morphing image container via layoutId */}
      <motion.div
        layoutId={project.id}
        className="relative z-10 overflow-hidden"
        style={{
          width: targetW,
          height: targetH,
          borderRadius: 12,
        }}
        onLayoutAnimationComplete={() => setMorphComplete(true)}
      >
        {/* Close button — glassmorphic pill */}
        <motion.button
          ref={closeRef}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Close project view"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        {/* Image: object-cover during morph, crossfade to object-contain after */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Title — fades in after morph */}
      <motion.p
        className="absolute bottom-8 font-display text-xl sm:text-2xl text-white/80 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: morphComplete ? 1 : 0, y: morphComplete ? 0 : 12 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3 }}
      >
        {project.title}
      </motion.p>
    </motion.div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const FeaturedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <LayoutGroup>
      <section
        ref={sectionRef}
        className="py-24 sm:py-32 relative overflow-hidden"
        id="work"
        style={{ minHeight: "100vh" }}
      >
        <div className="container relative z-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Our <span className="text-primary">Work.</span>
            </h2>
          </motion.div>
        </div>

        {/* Responsive grid: 2-col mobile, 3-col desktop */}
        <div className="container relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 py-8 sm:py-12">
            {PROJECTS.map((project, i) => (
              <MagneticCircle
                key={project.id}
                project={project}
                index={i}
                isActive={activeProject?.id === project.id}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10">
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Want yours next?{" "}
              <a href="#contact" className="font-display text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4">
                Let's talk.
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {createPortal(
        <AnimatePresence mode="wait">
          {activeProject && (
            <ExpandedView
              key={activeProject.id}
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </LayoutGroup>
  );
};
