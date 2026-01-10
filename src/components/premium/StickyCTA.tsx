import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useScrollspy";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 glass-nav safe-bottom md:hidden transition-all ${
        prefersReducedMotion ? "" : "duration-400"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container px-5 py-4">
        <a
          href="#contacto"
          className="btn-primary w-full py-4 text-center group"
        >
          <span>{t("nav.cta")}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};