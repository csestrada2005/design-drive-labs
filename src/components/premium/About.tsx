import { useReveal } from "@/hooks/useAnimations";

const clients = ["TechFlow", "Moda Luxe", "Wellness Studio", "StartupX", "Brand Co"];

export const About = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="sobre-mi"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-foreground text-background"
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo placeholder */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="aspect-[4/5] rounded-2xl bg-background/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center text-5xl">
                  👋
                </div>
                <p className="text-background/50 text-sm">Tu foto aquí</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className={`text-accent font-medium mb-4 transition-all duration-600 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Sobre mí
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl mb-6 transition-all duration-600 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Diseño para que funcione
            </h2>

            <div
              className={`space-y-4 text-background/70 mb-10 transition-all duration-600 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p>
                Soy [Tu Nombre], diseñador web especializado en crear sitios que 
                generan resultados. Más de 3 años ayudando a negocios a destacar online.
              </p>
              <p>
                Mi enfoque es simple: cada decisión de diseño debe tener un propósito. 
                No busco solo que se vea bien, busco que funcione y convierta.
              </p>
            </div>

            {/* Clients */}
            <div
              className={`transition-all duration-600 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-sm text-background/50 mb-4">He trabajado con</p>
              <div className="flex flex-wrap gap-3">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="px-4 py-2 text-sm border border-background/20 rounded-full text-background/70"
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
