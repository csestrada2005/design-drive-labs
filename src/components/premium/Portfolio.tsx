import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";

const projects = [
  {
    id: 1,
    title: "Moda Luxe",
    type: "E-commerce",
    result: "+200% ventas",
    description: "Tienda online de moda premium con experiencia de compra inmersiva.",
  },
  {
    id: 2,
    title: "TechFlow",
    type: "Landing Page",
    result: "+350% leads",
    description: "Página de captación para startup SaaS con animaciones fluidas.",
  },
  {
    id: 3,
    title: "Wellness Studio",
    type: "Sitio Web",
    result: "+150% reservas",
    description: "Web para centro de bienestar con sistema de citas integrado.",
  },
];

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section
      id="trabajo"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-muted/40"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className={`text-accent font-medium mb-4 transition-all duration-600 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Trabajo
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl transition-all duration-600 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Proyectos seleccionados
            </h2>
          </div>
        </div>

        {/* Projects - Simple list */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(activeId === project.id ? null : project.id)}
              className={`group cursor-pointer card-elevated p-6 md:p-8 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${activeId === project.id ? "bg-foreground text-background" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      activeId === project.id ? "text-accent" : "text-accent"
                    }`}>
                      {project.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeId === project.id 
                        ? "bg-accent text-accent-foreground" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {project.result}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl">
                    {project.title}
                  </h3>
                </div>

                <p className={`text-sm md:max-w-xs ${
                  activeId === project.id ? "text-background/70" : "text-muted-foreground"
                }`}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
