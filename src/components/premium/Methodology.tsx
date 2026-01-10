import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const principles = [
  {
    es: "Quitamos fricción y cuellos de botella en cada paso (entender → confiar → actuar).",
    en: "We remove friction and bottlenecks at every step (understand → trust → act).",
  },
  {
    es: "Mobile-first real: se ve y se siente perfecto en teléfono.",
    en: "Real mobile-first: looks and feels perfect on phone.",
  },
  {
    es: "Formularios y flujos simples: menos campos, más acción.",
    en: "Simple forms and flows: fewer fields, more action.",
  },
  {
    es: "Social proof que se siente humano (opiniones reales, no marketing).",
    en: "Social proof that feels human (real opinions, not marketing).",
  },
  {
    es: "Iteramos con comportamiento real: heatmaps, grabaciones y pruebas rápidas.",
    en: "We iterate with real behavior: heatmaps, recordings and quick tests.",
  },
  {
    es: "Soporte rápido (WhatsApp/chat) para cerrar decisiones sin vueltas.",
    en: "Fast support (WhatsApp/chat) to close decisions without delays.",
  },
  {
    es: "FOMO/sensación de demanda solo si encaja con tu marca (sutil, elegante).",
    en: "FOMO/demand feeling only if it fits your brand (subtle, elegant).",
  },
];

export const Methodology = () => {
  const { ref, isVisible } = useReveal();
  const { language } = useLanguage();

  return (
    <section id="metodologia" ref={ref as React.RefObject<HTMLElement>} className="py-20 sm:py-28 md:py-36">
      <div className="container px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <p
            className={`text-accent font-medium mb-3 sm:mb-4 text-center text-sm sm:text-base transition-all duration-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {language === "es" ? "Nuestra metodología" : "Our methodology"}
          </p>
          <h2
            className={`font-display text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-16 transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {language === "es"
              ? "CRO-first: diseñamos el sitio como un funnel, no como un póster."
              : "CRO-first: we design the site as a funnel, not a poster."}
          </h2>

          {/* Principles - Glass cards */}
          <div className="space-y-4 sm:space-y-5 mb-12 sm:mb-16">
            {principles.map((principle, index) => (
              <div
                key={index}
                className={`group flex items-start gap-4 sm:gap-5 glass-card p-5 sm:p-6 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isVisible ? `${(index + 2) * 70}ms` : "0ms" }}
              >
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Check className="w-4 h-4 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {principle[language]}
                </p>
              </div>
            ))}
          </div>

          {/* Closing line - Glass pill */}
          <div
            className={`flex justify-center transition-all duration-600 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-center text-base sm:text-lg font-medium text-foreground/80 glass-card px-8 py-4">
              {language === "es"
                ? "Primero convertimos. Luego escalamos el tráfico."
                : "First we convert. Then we scale traffic."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};