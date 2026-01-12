import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-[70dvh] flex items-center pt-20 pb-10 px-4">
      <div className="container max-w-2xl text-center">
        <p className="text-accent font-medium text-xs mb-3">
          {t("hero.eyebrow")}
        </p>

        <h1 className="font-display text-[clamp(1.75rem,7vw,3.5rem)] leading-[1.1] tracking-tight mb-4">
          {t("hero.headline1")}{" "}
          <span className="accent-underline">{t("hero.headline2")}</span>
        </h1>

        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-6 py-3"
          >
            <MessageCircle className="w-4 h-4" />
            {t("hero.cta.primary")}
          </a>
          
          <Link
            to="/process"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-3 px-4"
          >
            {t("hero.cta.secondary") || "Ver proceso"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
