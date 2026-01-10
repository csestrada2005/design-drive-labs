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
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-4xl">
        {/* Content */}
        <div className="text-center">
          <p className={`text-primary font-medium mb-4 transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.title")}
          </p>
          <h2 className={`font-display text-3xl md:text-4xl mb-6 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.headline")}
          </h2>

          <div className={`space-y-4 text-muted-foreground mb-10 max-w-2xl mx-auto transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
          </div>

          {/* Values */}
          <div className={`mb-10 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((item, index) => (
                <div 
                  key={item.key} 
                  className="group flex-1 min-w-[140px] max-w-[180px] p-4 bg-card rounded-xl border border-border transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                  style={{ transitionDelay: isVisible ? `${(index + 3) * 60}ms` : "0ms" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-primary font-display text-lg font-semibold group-hover:scale-105 transition-transform duration-300">
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