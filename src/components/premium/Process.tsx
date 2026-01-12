import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Palette, Code, Rocket } from "lucide-react";

const steps = [
  { icon: Search, titleKey: "process.step1.title", descKey: "process.step1.desc" },
  { icon: Palette, titleKey: "process.step2.title", descKey: "process.step2.desc" },
  { icon: Code, titleKey: "process.step3.title", descKey: "process.step3.desc" },
  { icon: Rocket, titleKey: "process.step4.title", descKey: "process.step4.desc" },
];

export const Process = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="proceso" ref={ref as React.RefObject<HTMLElement>} className="py-12 sm:py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <p
            className={`text-accent font-medium mb-2 text-xs sm:text-sm transition-all duration-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("process.title")}
          </p>
          <h2
            className={`font-display text-xl sm:text-2xl md:text-3xl transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("process.headline")}
          </h2>
        </div>

        {/* Steps - Compact grid on mobile */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.titleKey}
              className={`group relative glass-card p-4 sm:p-6 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              {/* Step number */}
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-4xl font-display font-bold text-foreground/[0.03] group-hover:text-accent/10 transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-105">
                <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <h3 className="font-display text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300">
                {t(step.titleKey)}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};