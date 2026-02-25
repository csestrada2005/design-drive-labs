import { ArrowRight } from "lucide-react";

interface MarqueeButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export const MarqueeButton = ({ text, href, onClick, variant = "primary", className = "" }: MarqueeButtonProps) => {
  const isPrimary = variant === "primary";

  const cls = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold text-sm ${
    isPrimary
      ? "px-7 py-3.5 bg-primary text-primary-foreground"
      : "px-7 py-3.5 border border-border text-foreground hover:border-primary/50"
  } ${className}`;

  const inner = (
    <>
      <span className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
        {text}
        {isPrimary && <ArrowRight className="w-4 h-4" />}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {text}
        {isPrimary && <ArrowRight className="w-4 h-4" />}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={cls} style={isPrimary ? { boxShadow: "0 4px 20px -4px hsl(0 100% 50% / 0.4)" } : {}}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} className={cls} style={isPrimary ? { boxShadow: "0 4px 20px -4px hsl(0 100% 50% / 0.4)" } : {}}>
      {inner}
    </a>
  );
};