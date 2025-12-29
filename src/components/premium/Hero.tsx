import { useReveal } from "@/hooks/useAnimations";
import { Mail, MessageCircle } from "lucide-react";

export const Hero = () => {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen flex flex-col justify-center pt-20 pb-12"
    >
      <div className="container">
        <div className="max-w-3xl">
          {/* Intro line */}
          <p
            className={`text-muted-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Hola, soy <span className="text-foreground font-medium">[Tu Nombre]</span> — diseñador web
          </p>

          {/* Main headline - distinctive typography */}
          <h1
            className={`font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.1] tracking-tight mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Creo sitios web que{" "}
            <span className="accent-underline">generan clientes</span>, no solo visitas.
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-xl mb-10 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Landing pages, sitios corporativos y tiendas online. 
            Diseño estratégico que convierte.
          </p>

          {/* Contact options - WhatsApp & Email */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20un%20proyecto%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#22c55e] transition-colors active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbeme por WhatsApp
            </a>
            <a
              href="mailto:hola@tudominio.com?subject=Consulta%20proyecto%20web"
              className="touch-target inline-flex items-center justify-center gap-3 px-7 py-4 border-2 border-border bg-card font-medium rounded-full hover:bg-muted transition-colors active:scale-[0.98]"
            >
              <Mail className="w-5 h-5" />
              Enviar email
            </a>
          </div>

          {/* Quick stats */}
          <div
            className={`flex flex-wrap gap-8 mt-16 pt-8 border-t border-border transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {[
              { value: "50+", label: "proyectos" },
              { value: "3", label: "años" },
              { value: "100%", label: "dedicación" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
