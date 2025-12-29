import { useReveal } from "@/hooks/useMobileAnimations";
import { Layers, Globe, ShoppingBag } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Landing Pages",
    description: "Páginas diseñadas para convertir visitantes en clientes.",
  },
  {
    icon: Globe,
    title: "Sitios Web",
    description: "Presencia digital profesional que refleja tu marca.",
  },
  {
    icon: ShoppingBag,
    title: "Tiendas Online",
    description: "E-commerce optimizado para vender más.",
  },
];

export const MobileServices = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="servicios"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-5"
    >
      <div className={`stagger ${isVisible ? "visible" : ""}`}>
        {/* Header */}
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Servicios
        </span>
        <h2 className="font-display text-3xl font-bold mt-2 mb-8">
          Lo que hago mejor
        </h2>

        {/* Cards */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
  isVisible: boolean;
}

const ServiceCard = ({ service, index, isVisible }: ServiceCardProps) => {
  return (
    <div
      className={`p-6 rounded-2xl bg-card border border-border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100 + 200}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
        <service.icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">
        {service.title}
      </h3>
      <p className="text-muted-foreground">
        {service.description}
      </p>
    </div>
  );
};
