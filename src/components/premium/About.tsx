import { useReveal } from "@/hooks/useAnimations";
import { CheckCircle2 } from "lucide-react";

const skills = [
  { name: "Diseño UI/UX", level: 95 },
  { name: "Desarrollo Frontend", level: 90 },
  { name: "Optimización CRO", level: 85 },
  { name: "Estrategia Digital", level: 88 },
];

const clients = [
  "TechFlow", "Moda Luxe", "Wellness Studio", "Fintech App", "StartupX", "Brand Co"
];

const highlights = [
  "Más de 50 proyectos entregados",
  "Especializado en conversión",
  "Comunicación transparente",
  "Entrega en tiempo y forma",
];

export const About = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="sobre-mi"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="aspect-[4/5] rounded-3xl bg-background/10 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                  <p className="text-background/60 text-sm">Tu foto profesional</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-accent/20 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-3xl blur-2xl" />

            {/* Experience badge */}
            <div className="absolute bottom-8 -right-4 md:right-8 bg-background text-foreground p-6 rounded-2xl shadow-medium">
              <p className="text-4xl font-serif font-bold text-gradient">3+</p>
              <p className="text-sm text-muted-foreground">Años de experiencia</p>
            </div>
          </div>

          {/* Content side */}
          <div className="stagger-children" ref={isVisible ? (el) => el?.classList.add('visible') : undefined}>
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
              Sobre mí
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              Diseñador enfocado en
              <span className="text-gradient"> resultados</span>
            </h2>

            <div className="space-y-4 text-background/70 mb-8">
              <p>
                Hola, soy [Tu Nombre]. Llevo más de 3 años ayudando a empresas y
                emprendedores a destacar en el mundo digital con sitios web que no
                solo se ven increíbles, sino que también convierten.
              </p>
              <p>
                Mi filosofía es simple: cada pixel debe tener un propósito. No diseño
                solo para que se vea bonito, diseño para que funcione y genere
                resultados medibles.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-background/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Skills with progress bars */}
            <div className="space-y-5 mb-10">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-background/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-background/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1500 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        background: "var(--gradient-primary)",
                        transitionDelay: `${index * 150 + 500}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Client logos */}
            <div>
              <p className="text-sm text-background/50 mb-4">
                Empresas que han confiado en mí
              </p>
              <div className="flex flex-wrap gap-3">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="px-4 py-2 bg-background/5 border border-background/10 rounded-full text-sm text-background/70"
                  >
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
