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
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-36">
      <div className="container max-w-4xl">
        {/* Content */}
        <div className="text-center">
          <p className={`text-primary font-medium mb-4 transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.title")}
          </p>
          <h2 className={`font-display text-3xl md:text-4xl mb-7 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.headline")}
          </h2>

          <div className={`space-y-5 text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-base sm:text-lg">{t("about.bio1")}</p>
            <p className="text-base sm:text-lg">{t("about.bio2")}</p>
          </div>

          {/* Values - Glass cards */}
          <div className={`mb-12 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex flex-wrap justify-center gap-5">
              {values.map((item, index) => (
                <div 
                  key={item.key} 
                  className="group flex-1 min-w-[160px] max-w-[200px] glass-card p-6"
                  style={{ transitionDelay: isVisible ? `${(index + 3) * 70}ms` : "0ms" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-primary font-display text-lg font-semibold group-hover:scale-105 transition-transform duration-300 mb-1">
                    {valueLabels[item.key as keyof typeof valueLabels][language].title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {valueLabels[item.key as keyof typeof valueLabels][language].desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clients line */}
          <div className={`transition-all duration-600 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-sm text-muted-foreground">
              {t("about.clients")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};