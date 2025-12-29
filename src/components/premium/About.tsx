import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import aboutPhoto from "@/assets/about-photo.jpg";

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
    <section id="sobre-mi" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-foreground text-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <div className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img src={aboutPhoto} alt="Daniel García" className="w-full h-full object-cover" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/30 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className={`text-accent font-medium mb-4 transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {t("about.title")}
            </p>
            <h2 className={`font-display text-3xl md:text-4xl mb-6 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {t("about.headline")}
            </h2>

            <div className={`space-y-4 text-background/70 mb-10 transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p>{t("about.bio1")}</p>
              <p>{t("about.bio2")}</p>
            </div>

            {/* Timeline */}
            <div className={`mb-10 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex flex-wrap gap-4">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex-1 min-w-[140px] p-4 bg-background/5 rounded-xl border border-background/10">
                    <p className="text-accent font-display text-lg font-semibold">{item.year}</p>
                    <p className="text-sm text-background/60">{t(item.key)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className={`transition-all duration-600 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="text-sm text-background/50 mb-4">{t("about.clients")}</p>
              <div className="flex flex-wrap gap-3">
                {clients.map((client) => (
                  <span key={client} className="px-4 py-2 text-sm border border-background/20 rounded-full text-background/70">
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
