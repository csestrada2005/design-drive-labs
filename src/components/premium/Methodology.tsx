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
    <section id="metodologia" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
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
            className={`font-display text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-14 transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {language === "es"
              ? "CRO-first: diseñamos el sitio como un funnel, no como un póster."
              : "CRO-first: we design the site as a funnel, not a poster."}
          </h2>

          {/* Principles */}
          <div
            className={`space-y-3 sm:space-y-4 mb-10 sm:mb-14 transition-all duration-600 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {principles.map((principle, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card rounded-xl border border-border hover:border-accent/30 transition-colors"
                style={{ transitionDelay: `${(index + 2) * 50}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {principle[language]}
                </p>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p
            className={`text-center text-base sm:text-lg font-medium text-muted-foreground transition-all duration-600 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {language === "es"
              ? "Primero convertimos. Luego escalamos el tráfico."
              : "First we convert. Then we scale traffic."}
          </p>
        </div>
      </div>
    </section>
  );
};