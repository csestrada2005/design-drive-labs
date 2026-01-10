import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { t } = useLanguage();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-[100dvh] flex items-center pt-24 pb-16 px-1">
      <div className="container max-w-4xl text-center">
        <p
          className={`text-accent font-medium text-sm sm:text-base mb-4 sm:mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          className={`font-display text-[clamp(2rem,8vw,4.5rem)] leading-[1.1] tracking-tight mb-6 sm:mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.headline1")}{" "}
          <span className="accent-underline">{t("hero.headline2")}</span>
          {t("hero.headline3")}
        </h1>

        <p
          className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`flex justify-center mb-4 px-4 sm:px-0 transition-all duration-700 delay-300 ${
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
          className={`text-sm text-muted-foreground mb-10 sm:mb-12 transition-all duration-700 delay-350 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("hero.microcopy")}
        </p>

        <div
          className={`grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 pt-6 sm:pt-8 border-t border-border mx-4 sm:mx-0 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { value: "50+", label: t("stats.projects") },
            { value: "40+", label: t("stats.clients") },
            { value: "+180%", label: t("stats.conversion") },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-2xl sm:text-3xl font-semibold">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <p
          className={`text-xs text-muted-foreground/60 mt-4 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("stats.disclaimer")}
        </p>
      </div>
    </section>
  );
};
