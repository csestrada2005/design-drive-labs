import { useScrollProgress, usePrefersReducedMotion } from "@/hooks/useScrollspy";

export const ScrollProgress = () => {
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-transform duration-150 origin-left"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
};
