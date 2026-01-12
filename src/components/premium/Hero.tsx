import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { t } = useLanguage();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-[85dvh] flex items-center pt-16 pb-10 px-4">
      <div className="container max-w-3xl text-center">
        <p
          className={`text-accent font-medium text-xs mb-3 transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          className={`font-display text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.1] tracking-tight mb-4 transition-all duration-600 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.headline1")}{" "}
          <span className="accent-underline">{t("hero.headline2")}</span>
        </h1>

        <p
          className={`text-sm text-muted-foreground max-w-md mx-auto mb-6 transition-all duration-600 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`flex justify-center mb-3 transition-all duration-600 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service%20%F0%9F%99%82%0A%C2%A1Hola!%20Me%20interesa%20tu%20servicio%0A%0APlease%20reply%20in%20%2F%20Responde%20en%3A%0A%F0%9F%87%AC%F0%9F%87%A7%20English%20%7C%20%F0%9F%87%AA%F0%9F%87%B8%20Espa%C3%B1ol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary touch-target text-sm px-5 py-2.5"
          >
            <MessageCircle className="w-4 h-4" />
            {t("hero.cta.primary")}
          </a>
        </div>

        <p
          className={`text-[10px] text-muted-foreground/70 transition-all duration-600 delay-400 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("hero.microcopy")}
        </p>
      </div>
    </section>
  );
};