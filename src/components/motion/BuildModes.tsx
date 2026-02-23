import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const modes = [
{ label: "Websites", sub: "Premium brand experiences", num: "01" },
{ label: "Landing Pages", sub: "Built to convert", num: "02" },
{ label: "E-commerce", sub: "Stores that sell", num: "03" },
{ label: "Software / Systems", sub: "CRMs, portals & automation", num: "04" },
{ label: "SEO / Performance", sub: "Rank, load, dominate", num: "05" }];


const ModeRow = ({
  mode,
  index,
  total




}: {mode: (typeof modes)[number];index: number;total: number;}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex items-center gap-6 sm:gap-10 py-7 sm:py-9 cursor-default select-none"
      style={{ borderBottom: index < total - 1 ? "1px solid hsl(0 0% 100% / 0.07)" : "none" }}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 1, 0.5, 1] }}
      whileHover="hovered">

      {/* Number */}
      <span className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground/40 w-8 flex-shrink-0 group-hover:text-primary transition-colors duration-300">
        {mode.num}
      </span>

      {/* Label */}
      <div className="flex-1 overflow-hidden">
        <motion.h3
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none text-foreground group-hover:text-primary transition-colors duration-300"
          variants={{ hovered: { x: 12 } }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}>

          {mode.label}
        </motion.h3>
      </div>

      {/* Sub-label (slides in on hover) */}
      <motion.span
        className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground hidden sm:block text-right min-w-[160px]"
        variants={{ hovered: { opacity: 1, x: 0 } }}
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}>

        {mode.sub}
      </motion.span>

      {/* Red sweep line on hover */}
      <motion.div
        className="absolute left-0 bottom-0 h-px bg-primary"
        variants={{
          hovered: { scaleX: 1, opacity: 1 }
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.4 }} />

    </motion.div>);

};

export const BuildModes = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
      id="modes">

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>

          


          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground">
            What we{" "}
            <span className="text-primary">build.</span>
          </h2>
        </motion.div>

        {/* Modes list */}
        <div className="relative">
          {/* Left accent line */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-primary/30 origin-top h-full pointer-events-none"
            style={{ scaleY: lineScaleY }} />


          <div className="pl-0">
            {modes.map((mode, i) =>
            <ModeRow key={mode.num} mode={mode} index={i} total={modes.length} />
            )}
          </div>
        </div>
      </div>
    </section>);

};