/**
 * FeaturedWork — Premium "Our Work" gallery
 *
 * - Origin-based expansion animation
 * - Magnetic hover + grayscale-to-color + arrow indicator
 * - Responsive CSS grid (3×2 desktop, 2×3 mobile)
 * - Full keyboard accessibility + focus trap
 * - Glassmorphism backdrop
 * - useReducedMotion support
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useSpring, useInView, useReducedMotion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

import workPapachoa from "@/assets/work-papachoa.png";
import workBazar from "@/assets/work-bazar.png";
import workJewelry from "@/assets/work-jewelry.png";
import workRawpaw from "@/assets/work-rawpaw.png";
import workSystem from "@/assets/work-system.png";
import workArmahas from "@/assets/work-armahas.png";

const PROJECTS = [
  {
    id: "papachoa", title: "Papachoa", image: workPapachoa,
    tag: "E-commerce", context: "Restaurant chain scaling online orders.",
    whatWeDid: "Custom storefront · checkout optimization · SEO",
    outcome: "Improved order flow + page speed + organic reach",
  },
  {
    id: "bazar", title: "Bazar Centenario", image: workBazar,
    tag: "Online Store", context: "Multi-vendor marketplace going digital.",
    whatWeDid: "Product catalog · payments · vendor dashboard",
    outcome: "Streamlined ops + faster time-to-purchase",
  },
  {
    id: "jewelry", title: "Joyería Centenario", image: workJewelry,
    tag: "Brand & Web", context: "Luxury jewelry brand building online presence.",
    whatWeDid: "Brand identity · premium web · product photography",
    outcome: "Elevated brand perception + qualified lead flow",
  },
  {
    id: "rawpaw", title: "Raw Paw", image: workRawpaw,
    tag: "D2C Brand", context: "Pet food startup scaling paid traffic.",
    whatWeDid: "Landing pages · conversion tracking · A/B testing",
    outcome: "Higher ROAS + lower acquisition cost",
  },
  {
    id: "system", title: "Custom System", image: workSystem,
    tag: "CRM / System", context: "Service business replacing manual workflows.",
    whatWeDid: "Custom CRM · automated messaging · internal portal",
    outcome: "Ops automated + team efficiency doubled",
  },
  {
    id: "armahas", title: "Armahas", image: workArmahas,
    tag: "Web Platform", context: "Growing brand needing a lead-gen engine.",
    whatWeDid: "Marketing site · lead capture · analytics",
    outcome: "Increased inbound leads + clearer funnel",
  },
];

type Project = (typeof PROJECTS)[number];

interface OriginRect {
  x: number;
  y: number;
  size: number;
}

// Organic offsets to break grid rigidity
const OFFSETS = [
  "translate-x-2 -translate-y-3",
  "-translate-x-3 translate-y-2",
  "translate-x-4 translate-y-1",
  "-translate-x-2 -translate-y-2",
  "translate-x-1 translate-y-3",
  "-translate-x-4 -translate-y-1",
];

// ── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (origin: OriginRect) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();

  const springX = useSpring(0, { stiffness: 200, damping: 18 });
  const springY = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    springX.set(dx * 0.15);
    springY.set(dy * 0.15);
  }, [springX, springY, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  const handleClick = () => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onOpen({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      size: Math.min(rect.width, rect.height),
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`flex items-center justify-center ${OFFSETS[index]}`}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: index * 0.1 }}
      style={prefersReducedMotion ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl w-full"
        aria-label={`View ${project.title} project`}
        onClick={handleClick}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-project-id={project.id}
      >
        <div ref={cardRef} className="relative overflow-hidden rounded-xl aspect-[4/3]">
          {/* Image — grayscale by default, full color on hover */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Arrow indicator */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.12)",
            }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>

          {/* Case study overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Tag + index */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">
                {project.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-base sm:text-lg text-white group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            {/* Context line */}
            <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
              {project.context}
            </p>

            {/* Expanded details on hover */}
            <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-out">
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] font-mono tracking-wider uppercase text-white/40">What we did</p>
                <p className="text-[11px] text-white/70 leading-relaxed">{project.whatWeDid}</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-white/40 pt-1">Outcome</p>
                <p className="text-[11px] text-primary/80 leading-relaxed">{project.outcome}</p>
              </div>
            </div>

            {/* CTA */}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              See breakdown <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

// ── Expanded View ────────────────────────────────────────────────────────────
const ExpandedView = ({
  project,
  origin,
  onClose,
}: {
  project: Project;
  origin: OriginRect;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    setTimeout(() => closeRef.current?.focus(), 100);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useEffect(() => {
    const originBtn = document.querySelector(`[data-project-id="${project.id}"]`) as HTMLElement;
    return () => { setTimeout(() => originBtn?.focus(), 50); };
  }, [project.id]);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const targetW = Math.min(vw * 0.9, 1100);
  const targetH = Math.min(vh * 0.8, 700);
  const originXOffset = origin.x - vw / 2;
  const originYOffset = origin.y - vh / 2;
  const initialScale = origin.size / targetW;

  const openAnim = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { scale: initialScale, borderRadius: "50%", opacity: 0.9, x: originXOffset, y: originYOffset },
        animate: { scale: 1, borderRadius: 12, opacity: 1, x: 0, y: 0 },
        exit: { scale: initialScale, borderRadius: "50%", opacity: 0, x: originXOffset, y: originYOffset },
      };

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
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Image container */}
      <motion.div
        className="relative z-10 overflow-hidden"
        style={{ width: targetW, height: targetH }}
        {...openAnim}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          ref={closeRef}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{
            background: "rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Close project view"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Title */}
      <motion.p
        className="absolute bottom-8 font-display text-xl sm:text-2xl text-white/80 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ delay: 0.4, duration: 0.3 }}
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
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<OriginRect | null>(null);

  const handleOpen = useCallback((project: Project, origin: OriginRect) => {
    setOriginRect(origin);
    setActiveProject(project);
  }, []);

  return (
    <>
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

        <div className="container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 py-8 sm:py-12">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={(origin) => handleOpen(project, origin)}
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
        <AnimatePresence>
          {activeProject && originRect && (
            <ExpandedView
              key={activeProject.id}
              project={activeProject}
              origin={originRect}
              onClose={() => { setActiveProject(null); setOriginRect(null); }}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
