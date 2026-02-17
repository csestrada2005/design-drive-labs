import { motion } from "framer-motion";

export const MarqueeTicker = () => {
  const text = "HEADLESS COMMERCE — VECTOR DATABASES — RAG PIPELINES — FASTAPI SYSTEMS — LOGISTICS ALGORITHMS — CONVERSION RATE OPTIMIZATION — ";
  const repeated = text.repeat(4);

  return (
    <section className="py-6 border-y border-border/30 overflow-hidden relative" aria-label="Marquee">
      {/* Decorative dots */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-1.5 ml-4 z-10" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/10" />
      </div>

      {/* Primary marquee */}
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-muted-foreground/40 text-sm tracking-[0.15em] uppercase font-mono font-medium">
          {repeated}
        </span>
        <span className="text-muted-foreground/40 text-sm tracking-[0.15em] uppercase font-mono font-medium">
          {repeated}
        </span>
      </div>

      {/* Reverse layer behind */}
      <div className="flex whitespace-nowrap animate-marquee-reverse mt-2 opacity-30">
        <span className="text-muted-foreground/20 text-[10px] tracking-[0.2em] uppercase font-mono">
          {repeated}
        </span>
        <span className="text-muted-foreground/20 text-[10px] tracking-[0.2em] uppercase font-mono">
          {repeated}
        </span>
      </div>

      {/* Edge fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />
    </section>
  );
};
