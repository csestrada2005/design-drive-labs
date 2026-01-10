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
    <section id="proceso" ref={ref as React.RefObject<HTMLElement>} className="py-20 sm:py-28 md:py-36">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p
            className={`text-accent font-medium mb-3 sm:mb-4 text-sm sm:text-base transition-all duration-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("process.title")}
          </p>
          <h2
            className={`font-display text-2xl sm:text-3xl md:text-4xl transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("process.headline")}
          </h2>
        </div>

        {/* Steps - Glass cards */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.titleKey}
              className={`group relative glass-card p-7 sm:p-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-5xl sm:text-6xl font-display font-bold text-foreground/[0.03] group-hover:text-accent/10 transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-13 h-13 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-110">
                <step.icon className="w-6 h-6" />
              </div>

              <h3 className="font-display text-lg sm:text-xl mb-3 group-hover:text-accent transition-colors duration-300">
                {t(step.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};