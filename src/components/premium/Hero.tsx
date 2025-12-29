import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);
  const { t } = useLanguage();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="min-h-screen flex items-center pt-20 pb-12">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p
              className={`text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t("hero.greeting")} <span className="text-foreground font-medium">Daniel García</span> — {t("hero.role")}
            </p>

            <h1
              className={`font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.1] tracking-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {t("hero.headline1")}{" "}
              <span className="accent-underline">{t("hero.headline2")}</span>
              {t("hero.headline3")}
            </h1>

            <p
              className={`text-lg text-muted-foreground max-w-xl mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {t("hero.subtitle")}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 mb-10 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#22c55e] transition-colors active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                {t("hero.cta.whatsapp")}
              </a>
              <a
                href="mailto:hola@danielgarcia.dev"
                className="touch-target inline-flex items-center justify-center gap-3 px-6 py-4 border-2 border-border bg-card font-medium rounded-full hover:bg-muted transition-colors active:scale-[0.98]"
              >
                <Mail className="w-5 h-5" />
                {t("hero.cta.email")}
              </a>
            </div>

            <div
              className={`flex flex-wrap gap-8 pt-6 border-t border-border transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { value: "50+", label: t("hero.stat.projects") },
                { value: "3", label: t("hero.stat.years") },
                { value: "100%", label: t("hero.stat.dedication") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Daniel García - Web Designer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-accent/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
