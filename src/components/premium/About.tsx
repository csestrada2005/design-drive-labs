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
    focused: { es: "Enfocados", en: "Focused" },
    detail: { es: "Obsesivos", en: "Obsessive" },
    fast: { es: "Directos", en: "Direct" },
  };

  return (
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-10 sm:py-16 md:py-24">
      <div className="container max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <p className={`text-primary font-medium mb-1.5 text-xs transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.title")}
          </p>
          <h2 className={`font-display text-base sm:text-lg md:text-xl mb-3 transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.headline")}
          </h2>

          <p className={`text-sm text-muted-foreground mb-6 max-w-md mx-auto transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.bio1")}
          </p>

          {/* Values - Minimal inline */}
          <div className={`flex justify-center gap-4 sm:gap-6 mb-4 transition-all duration-500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {values.map((item) => (
              <div key={item.key} className="flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground/80">
                  {valueLabels[item.key as keyof typeof valueLabels][language]}
                </span>
              </div>
            ))}
          </div>

          <p className={`text-[10px] text-muted-foreground/70 transition-all duration-500 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.clients")}
          </p>
        </div>
      </div>
    </section>
  );
};