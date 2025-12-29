import { useReveal, useCounter } from "@/hooks/useAnimations";

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 3, suffix: "+", label: "Años de experiencia" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 200, suffix: "%", label: "Aumento promedio en conversiones" },
];

export const Stats = () => {
  const { ref, isVisible } = useReveal(0.2);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 border-y border-border bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
}

const StatItem = ({ stat, index, isVisible }: StatItemProps) => {
  const count = useCounter(stat.value, 2000, isVisible);

  return (
    <div
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-gradient mb-2">
        {count}
        {stat.suffix}
      </p>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
};
