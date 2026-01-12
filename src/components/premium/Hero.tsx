import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Check } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { t } = useLanguage();

  const trustPoints = [
    t("trust.point1"),
    t("trust.point2"),
    t("trust.point3"),
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-[90dvh] flex items-center pt-20 pb-12 px-4 sm:px-6">
      <div className="container max-w-4xl text-center">
        <p
          className={`text-accent font-medium text-sm mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          className={`font-display text-[clamp(1.75rem,7vw,4rem)] leading-[1.1] tracking-tight mb-5 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.headline1")}{" "}
          <span className="accent-underline">{t("hero.headline2")}</span>
          {t("hero.headline3")}
        </h1>

        <p
          className={`text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 px-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`flex justify-center mb-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service%20%F0%9F%99%82%0A%C2%A1Hola!%20Me%20interesa%20tu%20servicio%0A%0APlease%20reply%20in%20%2F%20Responde%20en%3A%0A%F0%9F%87%AC%F0%9F%87%A7%20English%20%7C%20%F0%9F%87%AA%F0%9F%87%B8%20Espa%C3%B1ol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary touch-target text-sm sm:text-base px-6 py-3"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            {t("hero.cta.primary")}
          </a>
        </div>

        <p
          className={`text-xs text-muted-foreground mb-8 transition-all duration-700 delay-350 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("hero.microcopy")}
        </p>

        {/* Trust Points - Compact on mobile */}
        <div
          className={`glass-card px-4 py-4 sm:px-8 sm:py-5 mx-2 sm:mx-0 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                <div className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-accent" />
                </div>
                <span className="text-left">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <p
          className={`text-[10px] sm:text-xs text-muted-foreground/60 mt-4 px-4 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("trust.disclaimer")}
        </p>
      </div>
    </section>
  );
};