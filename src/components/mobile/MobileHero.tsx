import { useReveal } from "@/hooks/useMobileAnimations";
import { ArrowDown, Sparkles } from "lucide-react";

export const MobileHero = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-[100svh] flex flex-col justify-center pt-24 pb-12 px-5 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" />

      <div className={`relative stagger ${isVisible ? "visible" : ""}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Disponible ahora</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.5rem,10vw,4rem)] font-bold leading-[1.05] tracking-tight mb-6">
          Diseño web que
          <span className="text-gradient block">convierte</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-10 max-w-sm">
          Landing pages y sitios web diseñados para generar resultados reales.
        </p>

        {/* CTA - Large touch target */}
        <a
          href="#contacto"
          className="touch-target inline-flex items-center justify-center w-full py-5 bg-foreground text-background font-display font-semibold text-lg rounded-2xl active:scale-[0.98] transition-transform mb-4"
        >
          Empezar un proyecto
        </a>

        <a
          href="#servicios"
          className="touch-target inline-flex items-center justify-center w-full py-5 border-2 border-border font-display font-medium text-lg rounded-2xl active:scale-[0.98] active:bg-muted transition-all"
        >
          Ver servicios
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  );
};
