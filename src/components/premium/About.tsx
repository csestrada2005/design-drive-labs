import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = ["TechFlow", "Moda Luxe", "Wellness Spa", "StartupX", "Brand Co", "Fintech App"];

const timeline = [
  { year: "2021", key: "about.timeline.2021" },
  { year: "2022", key: "about.timeline.2022" },
  { year: "2023", key: "about.timeline.2023" },
  { year: "2024", key: "about.timeline.2024" },
];

export const About = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-muted/30">
      <div className="container max-w-4xl">
        {/* Content */}
        <div className="text-center">
          <p className={`text-primary font-medium mb-4 transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("about.title")}
          </p>
          <h2 className={`font-display text-3xl md:text-4xl mb-6 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("about.headline")}
          </h2>

          <div className={`space-y-4 text-muted-foreground mb-10 max-w-2xl mx-auto transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
          </div>

          {/* Timeline */}
          <div className={`mb-10 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex flex-wrap justify-center gap-4">
              {timeline.map((item) => (
                <div key={item.year} className="flex-1 min-w-[140px] max-w-[180px] p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <p className="text-primary font-display text-lg font-semibold">{item.year}</p>
                  <p className="text-sm text-muted-foreground">{t(item.key)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div className={`transition-all duration-600 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-sm text-muted-foreground mb-4">{t("about.clients")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {clients.map((client) => (
                <span key={client} className="px-4 py-2 text-sm border border-border rounded-full text-foreground/70 hover:border-primary/40 hover:text-foreground transition-colors">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
