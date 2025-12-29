import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MessageCircle } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { t } = useLanguage();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-[100dvh] flex items-center pt-24 pb-16 px-1">
      <div className="container max-w-4xl text-center">
        <p
          className={`text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t("hero.greeting")} <span className="text-foreground font-medium">Daniel García</span>
          <span className="hidden sm:inline"> — {t("hero.role")}</span>
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
          className={`flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 mb-10 sm:mb-12 px-4 sm:px-0 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-medium rounded-2xl hover:bg-[#22c55e] transition-colors active:scale-[0.98] text-base"
          >
            <MessageCircle className="w-5 h-5" />
            {t("hero.cta.whatsapp")}
          </a>
          <a
            href="mailto:hola@danielgarcia.dev"
            className="touch-target inline-flex items-center justify-center gap-3 px-6 py-4 border-2 border-border bg-card font-medium rounded-2xl hover:bg-muted transition-colors active:scale-[0.98] text-base"
          >
            <Mail className="w-5 h-5" />
            {t("hero.cta.email")}
          </a>
        </div>

        <div
          className={`grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 pt-6 sm:pt-8 border-t border-border mx-4 sm:mx-0 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { value: "50+", label: t("hero.stat.projects") },
            { value: "3", label: t("hero.stat.years") },
            { value: "100%", label: t("hero.stat.dedication") },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-2xl sm:text-3xl font-semibold">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
