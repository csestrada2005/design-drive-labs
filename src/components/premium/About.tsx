import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Eye, Zap } from "lucide-react";

const values = [
  { icon: Target, key: "focused" },
  { icon: Eye, key: "detail" },
  { icon: Zap, key: "fast" },
];

export const About = () => {
  const { ref, isVisible } = useReveal();
  const { t, language } = useLanguage();

  const valueLabels = {
    focused: {
      es: { title: "Enfocados", desc: "Cada decisión tiene un propósito claro" },
      en: { title: "Focused", desc: "Every decision has a clear purpose" },
    },
    detail: {
      es: { title: "Obsesivos", desc: "Los detalles hacen la diferencia" },
      en: { title: "Obsessive", desc: "Details make the difference" },
    },
    fast: {
      es: { title: "Directos", desc: "Comunicación clara, entregas rápidas" },
      en: { title: "Direct", desc: "Clear communication, fast delivery" },
    },
  };

  return (
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-12 sm:py-20 md:py-28">
      <div className="container max-w-3xl px-4 sm:px-6">
        {/* Content */}
        <div className="text-center">
          <p className={`text-primary font-medium mb-2 text-xs sm:text-sm transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.title")}
          </p>
          <h2 className={`font-display text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-5 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.headline")}
          </h2>

          <div className={`space-y-3 text-muted-foreground mb-8 max-w-xl mx-auto transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-sm sm:text-base">{t("about.bio1")}</p>
            <p className="text-sm sm:text-base">{t("about.bio2")}</p>
          </div>

          {/* Values - Compact grid */}
          <div className={`mb-8 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {values.map((item, index) => (
                <div 
                  key={item.key} 
                  className="group glass-card p-3 sm:p-4"
                  style={{ transitionDelay: isVisible ? `${(index + 3) * 50}ms` : "0ms" }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-primary font-display text-xs sm:text-sm font-semibold mb-0.5">
                    {valueLabels[item.key as keyof typeof valueLabels][language].title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                    {valueLabels[item.key as keyof typeof valueLabels][language].desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clients line */}
          <div className={`transition-all duration-600 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("about.clients")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};