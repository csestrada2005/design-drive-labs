import { useReveal, useCounter } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";

export const Stats = () => {
  const { ref, isVisible } = useReveal(0.3);
  const { t } = useLanguage();

  const stats = [
    { value: 50, suffix: "+", label: t("stats.projects") },
    { value: 98, suffix: "%", label: t("stats.clients") },
    { value: 200, suffix: "%", label: t("stats.conversion") },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 bg-foreground text-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  stat: { value: number; suffix: string; label: string };
  index: number;
  isVisible: boolean;
}

const StatItem = ({ stat, index, isVisible }: StatItemProps) => {
  const count = useCounter(stat.value, 2000, isVisible);

  return (
    <div
      className={`text-center transition-all duration-600 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="font-display text-4xl md:text-5xl font-semibold text-accent mb-2">
        {count}{stat.suffix}
      </p>
      <p className="text-background/70 text-sm max-w-[200px] mx-auto">{stat.label}</p>
    </div>
  );
};
