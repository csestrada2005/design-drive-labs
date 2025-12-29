import { useParallax, useMouseParallax, useReveal } from "@/hooks/useAnimations";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { ref: parallaxRef, offset } = useParallax(0.5);
  const mouse = useMouseParallax();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background elements with parallax */}
      <div
        className="absolute top-20 right-[10%] w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse-soft"
        style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }}
      />
      <div
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float"
        style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)` }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)]" />

      <div className="container relative">
        <div
          ref={parallaxRef as React.RefObject<HTMLDivElement>}
          className="max-w-4xl mx-auto text-center"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Disponible para proyectos</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Diseño experiencias
            <br />
            <span className="text-gradient">digitales únicas</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Landing pages, sitios web y e-commerce diseñados estratégicamente
            para convertir visitantes en clientes fieles.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#contacto"
              className="touch-target inline-flex items-center justify-center gap-2 px-8 py-4 text-background rounded-full font-medium text-lg group transition-all duration-300 hover:shadow-glow active:scale-[0.98]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Empezar proyecto
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#portafolio"
              className="touch-target inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border rounded-full font-medium text-lg hover:bg-muted/50 transition-all active:scale-[0.98]"
            >
              Ver trabajos
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Descubre más
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
