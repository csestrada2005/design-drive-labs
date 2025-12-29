import { useReveal } from "@/hooks/useMobileAnimations";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-commerce Moda",
    category: "Tienda Online",
    stat: "+200%",
    statLabel: "conversión",
  },
  {
    title: "SaaS Platform",
    category: "Aplicación Web",
    stat: "50k",
    statLabel: "usuarios",
  },
  {
    title: "Estudio Creativo",
    category: "Landing Page",
    stat: "3x",
    statLabel: "más leads",
  },
];

export const MobileWork = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="trabajo"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-5 bg-muted/50"
    >
      <div className={`stagger ${isVisible ? "visible" : ""}`}>
        {/* Header */}
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Trabajo
        </span>
        <h2 className="font-display text-3xl font-bold mt-2 mb-8">
          Proyectos recientes
        </h2>

        {/* Projects */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-2xl bg-background border border-border p-6 transition-all duration-700 active:scale-[0.98] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] rounded-xl bg-muted mb-5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xl">✦</span>
                  </div>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold mt-1">
                    {project.title}
                  </h3>
                </div>

                {/* Stat */}
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-accent">
                    {project.stat}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {project.statLabel}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-active:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
