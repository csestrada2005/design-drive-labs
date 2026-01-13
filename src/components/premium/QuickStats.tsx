import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 15, suffix: "+", labelEs: "Proyectos entregados", labelEn: "Projects delivered" },
  { value: 100, suffix: "%", labelEs: "Clientes satisfechos", labelEn: "Satisfied clients" },
  { value: 24, prefix: "<", suffix: "h", labelEs: "Tiempo de respuesta", labelEn: "Response time" },
];

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, value]);

  return (
    <p ref={ref} className="font-display text-2xl sm:text-4xl md:text-5xl mb-2 tabular-nums">
      {prefix}{count}{suffix}
    </p>
  );
};

export const QuickStats = () => {
  const { language } = useLanguage();

  return (
    <section className="py-14 sm:py-20 px-4 border-y border-border/30 relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.labelEn} className="text-center">
              <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                {language === "es" ? stat.labelEs : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};
