import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Palette, Code, Rocket } from "lucide-react";

const steps = [
  { icon: Search, titleKey: "process.step1.title" },
  { icon: Palette, titleKey: "process.step2.title" },
  { icon: Code, titleKey: "process.step3.title" },
  { icon: Rocket, titleKey: "process.step4.title" },
];

export const Process = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="proceso" ref={ref as React.RefObject<HTMLElement>} className="py-10 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        {/* Header - Minimal */}
        <div className="text-center mb-6 sm:mb-8">
          <p
            className={`text-accent font-medium mb-1.5 text-xs transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("process.title")}
          </p>
          <h2
            className={`font-display text-base sm:text-lg md:text-xl transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("process.headline")}
          </h2>
        </div>

        {/* Steps - Horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible">
          {steps.map((step, index) => (
            <div
              key={step.titleKey}
              className={`group flex-shrink-0 w-[70%] sm:w-auto snap-center glass-card p-3 sm:p-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 1) * 60}ms` }}
            >
              <div className="flex items-center gap-2.5">
                {/* Step number */}
                <span className="text-2xl sm:text-3xl font-display font-bold text-accent/20">
                  {index + 1}
                </span>

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                  <step.icon className="w-4 h-4 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
              </div>

              <h3 className="font-display text-xs sm:text-sm mt-2.5 group-hover:text-accent transition-colors duration-300">
                {t(step.titleKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};