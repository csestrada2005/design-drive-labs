/**
 * FeaturedWork — "Selected Work" interactive gallery
 *
 * 6 projects with static screenshot images.
 * "View" button opens a fullscreen image lightbox.
 */

import { useRef, useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { useScrollPaint } from "@/hooks/useScrollPaint";

import workPapachoa from "@/assets/work-papachoa.png";
import workBazar from "@/assets/work-bazar.png";
import workJewelry from "@/assets/work-jewelry.png";
import workRawpaw from "@/assets/work-rawpaw.png";
import workSystem from "@/assets/work-system.png";
import workArmahas from "@/assets/work-armahas.png";

// ── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "papachoa",
    title: "Papachoa",
    descriptor: "High-trust brand website",
    tags: ["Website", "Landing"],
    index: "01",
    image: workPapachoa,
  },
  {
    id: "bazar",
    title: "Bazar Centenario",
    descriptor: "Conversion-focused e-commerce",
    tags: ["E-commerce", "Website"],
    index: "02",
    image: workBazar,
  },
  {
    id: "jewelry",
    title: "Joyería Centenario",
    descriptor: "Luxury product showcase",
    tags: ["E-commerce", "Landing"],
    index: "03",
    image: workJewelry,
  },
  {
    id: "rawpaw",
    title: "Raw Paw",
    descriptor: "D2C brand storefront",
    tags: ["Website", "E-commerce"],
    index: "04",
    image: workRawpaw,
  },
  {
    id: "system",
    title: "Custom System",
    descriptor: "Internal platform & automation",
    tags: ["System", "Dashboard"],
    index: "05",
    image: workSystem,
  },
  {
    id: "armahas",
    title: "Armahas",
    descriptor: "Streetwear brand store",
    tags: ["E-commerce", "Website"],
    index: "06",
    image: workArmahas,
  },
];

type Project = (typeof PROJECTS)[number];

// ── Fullscreen Image Lightbox ─────────────────────────────────────────────────
const ImageLightbox = forwardRef<HTMLDivElement, {
  project: Project;
  onClose: () => void;
}>(({ project, onClose }, ref) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{
          background: "hsl(0 0% 4% / 0.95)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1">
              {project.index} / Selected Work
            </p>
            <h3 className="font-display text-xl sm:text-2xl text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.06)" }}
          >
            <X className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

        {/* Image */}
        <motion.div
          className="rounded-sm overflow-hidden bg-white/5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-contain max-h-[75vh]"
          />
        </motion.div>

        <p className="text-[10px] font-mono text-white/30 tracking-wider mt-4 text-center">
          {project.descriptor}
        </p>
      </div>
    </motion.div>
  );
});

ImageLightbox.displayName = "ImageLightbox";

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
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 1, 0.5, 1],
      }}
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
          style={{ borderBottom: "1px solid hsl(0 0% 0% / 0.08)" }}
        >
          {/* Index */}
          <motion.span
            className="font-mono text-[10px] tracking-[0.25em] flex-shrink-0 w-7 hidden sm:block"
            animate={{
              color: hovered
                ? "hsl(0 100% 50%)"
                : "hsl(0 0% 0% / 0.25)",
            }}
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
              src={project.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: "hsl(0 0% 0% / 0.15)",
                opacity: hovered ? 0 : 1,
              }}
            />
          </motion.div>

          {/* Title + descriptor */}
          <div className="flex-1 min-w-0">
            <motion.h3
              className="font-display text-2xl sm:text-3xl md:text-4xl leading-none mb-1.5"
              animate={{
                color: hovered
                  ? "hsl(0 0% 0%)"
                  : "hsl(0 0% 0% / 0.85)",
              }}
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
            animate={{
              x: hovered ? 0 : 4,
              opacity: hovered ? 1 : 0.4,
            }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase hidden sm:block">
              View
            </span>
            <motion.div
              animate={{ rotate: hovered ? 0 : -10 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowUpRight
                className="w-4 h-4"
                style={{
                  color: hovered
                    ? "hsl(0 100% 50%)"
                    : "currentColor",
                }}
              />
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
            transition:
              "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
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

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <>
      <section
        ref={ref}
        className="py-24 sm:py-32 relative overflow-hidden"
        id="work"
      >
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
              ​
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
              WORK THAT <span className="text-primary">PERFORMS</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Our projects.
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

      {/* Lightbox overlay */}
      <AnimatePresence>
        {activeProject && (
          <ImageLightbox
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
