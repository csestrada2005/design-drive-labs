import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const { t, language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Moda Luxe",
      type: "E-commerce",
      result: "+200%",
      resultLabel: language === "es" ? "ventas" : "sales",
      description: language === "es"
        ? "Tienda online de moda premium con experiencia de compra inmersiva"
        : "Premium fashion online store with immersive shopping experience",
      image: portfolio1,
    },
    {
      id: 2,
      title: "TechFlow",
      type: "Landing Page",
      result: "+350%",
      resultLabel: "leads",
      description: language === "es"
        ? "Página de captación para startup SaaS con animaciones fluidas"
        : "Lead capture page for SaaS startup with fluid animations",
      image: portfolio2,
    },
    {
      id: 3,
      title: "Wellness Spa",
      type: language === "es" ? "Sitio Web" : "Website",
      result: "+150%",
      resultLabel: language === "es" ? "reservas" : "bookings",
      description: language === "es"
        ? "Web para centro de bienestar con sistema de citas integrado"
        : "Wellness center website with integrated booking system",
      image: portfolio3,
    },
  ];

  return (
    <section id="trabajo" ref={ref as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-muted/40">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className={`text-accent font-medium mb-4 transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {t("portfolio.title")}
            </p>
            <h2 className={`font-display text-3xl md:text-4xl transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {t("portfolio.headline")}
            </h2>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-foreground/90 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-background text-foreground rounded-full font-medium text-sm">
                    {t("portfolio.cta")}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">{project.type}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {project.result} {project.resultLabel}
                  </span>
                </div>
                <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
