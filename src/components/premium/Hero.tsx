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
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-[100dvh] flex items-center pt-28 pb-20 px-1">
      <div className="container max-w-4xl text-center">
        <p
          className={`text-accent font-medium text-sm sm:text-base mb-5 sm:mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          className={`font-display text-[clamp(2.25rem,9vw,5rem)] leading-[1.05] tracking-tight mb-7 sm:mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.headline1")}{" "}
          <span className="accent-underline">{t("hero.headline2")}</span>
          {t("hero.headline3")}
        </h1>

        <p
          className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-12 px-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`flex justify-center mb-5 px-4 sm:px-0 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service%20%F0%9F%99%82%0A%C2%A1Hola!%20Me%20interesa%20tu%20servicio%0A%0APlease%20reply%20in%20%2F%20Responde%20en%3A%0A%F0%9F%87%AC%F0%9F%87%A7%20English%20%7C%20%F0%9F%87%AA%F0%9F%87%B8%20Espa%C3%B1ol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary touch-target text-base"
          >
            <MessageCircle className="w-5 h-5" />
            {t("hero.cta.primary")}
          </a>
        </div>

        <p
          className={`text-sm text-muted-foreground mb-12 sm:mb-14 transition-all duration-700 delay-350 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("hero.microcopy")}
        </p>

        {/* Trust Points - Glass card style */}
        <div
          className={`inline-flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-6 glass-card px-6 sm:px-10 py-5 sm:py-6 mx-4 sm:mx-0 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {trustPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2.5 text-sm sm:text-base text-foreground/80">
              <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <span>{point}</span>
            </div>
          ))}
        </div>

        <p
          className={`text-xs text-muted-foreground/60 mt-5 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("trust.disclaimer")}
        </p>
      </div>
    </section>
  );
};