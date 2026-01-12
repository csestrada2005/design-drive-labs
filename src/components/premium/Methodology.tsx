import { useState, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ChevronUp, ChevronDown } from "lucide-react";

const principles = [
  {
    es: "Quitamos fricción en cada paso del usuario.",
    en: "We remove friction at every user step.",
  },
  {
    es: "Mobile-first real: perfecto en teléfono.",
    en: "Real mobile-first: perfect on phone.",
  },
  {
    es: "Formularios simples: menos campos, más acción.",
    en: "Simple forms: fewer fields, more action.",
  },
  {
    es: "Social proof humano, no marketing.",
    en: "Human social proof, not marketing.",
  },
  {
    es: "Iteramos con datos reales: heatmaps y tests.",
    en: "We iterate with real data: heatmaps and tests.",
  },
  {
    es: "Soporte rápido para cerrar decisiones.",
    en: "Fast support to close decisions.",
  },
];

export const Methodology = () => {
  const { ref, isVisible } = useReveal();
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % principles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % principles.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + principles.length) % principles.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 30) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  return (
    <section id="metodologia" ref={ref as React.RefObject<HTMLElement>} className="py-10 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          {/* Header - Minimal */}
          <p
            className={`text-accent font-medium mb-1.5 text-center text-xs transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {language === "es" ? "Metodología" : "Methodology"}
          </p>
          <h2
            className={`font-display text-base sm:text-lg text-center mb-6 transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {language === "es" ? "CRO-first: funnel, no póster." : "CRO-first: funnel, not poster."}
          </h2>

          {/* Vertical Carousel */}
          <div
            className={`relative transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Up */}
            <button
              onClick={goPrev}
              className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full glass-card flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Cards container */}
            <div className="relative h-32 sm:h-36 overflow-hidden mx-6">
              {principles.map((principle, index) => {
                const offset = index - activeIndex;
                const normalizedOffset = ((offset % principles.length) + principles.length) % principles.length;
                const displayOffset = normalizedOffset > principles.length / 2 ? normalizedOffset - principles.length : normalizedOffset;
                
                const isActive = displayOffset === 0;
                const isPrev = displayOffset === -1;
                const isNext = displayOffset === 1;
                const isVisible = isActive || isPrev || isNext;

                return (
                  <div
                    key={index}
                    className={`absolute inset-x-0 transition-all duration-500 ease-out ${
                      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={{
                      transform: `translateY(${displayOffset * 100}%) scale(${isActive ? 1 : 0.9})`,
                      zIndex: isActive ? 10 : 5,
                    }}
                  >
                    <div
                      className={`glass-card p-4 flex items-center gap-3 transition-all duration-300 ${
                        isActive ? "bg-accent/5 border-accent/20" : "opacity-40"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ? "bg-accent" : "bg-accent/20"
                      }`}>
                        <Check className={`w-3 h-3 transition-colors ${isActive ? "text-accent-foreground" : "text-accent"}`} />
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                        isActive ? "text-foreground" : "text-foreground/60"
                      }`}>
                        {principle[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Down */}
            <button
              onClick={goNext}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full glass-card flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1 mt-6">
              {principles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-4 bg-accent" : "w-1 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p
            className={`text-center text-xs sm:text-sm text-muted-foreground mt-6 transition-all duration-500 delay-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {language === "es" ? "Primero convertimos. Luego escalamos." : "First we convert. Then we scale."}
          </p>
        </div>
      </div>
    </section>
  );
};
