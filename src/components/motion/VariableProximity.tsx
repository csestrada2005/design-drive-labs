import { useRef, useEffect, useState, useCallback } from "react";

interface VariableProximityProps {
  label: string;
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  radius?: number;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
}

function parseFontVariationSettings(settings: string) {
  const result: Record<string, number> = {};
  const pairs = settings.split(",").map((s) => s.trim());
  for (const pair of pairs) {
    const match = pair.match(/'([^']+)'\s+([\d.]+)/);
    if (match) result[match[1]] = parseFloat(match[2]);
  }
  return result;
}

function buildFontVariationSettings(settings: Record<string, number>) {
  return Object.entries(settings)
    .map(([key, value]) => `'${key}' ${Math.round(value)}`)
    .join(", ");
}

export const VariableProximity = ({
  label,
  className = "",
  containerRef,
  radius = 100,
  fromFontVariationSettings,
  toFontVariationSettings,
}: VariableProximityProps) => {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [letterSettings, setLetterSettings] = useState<string[]>([]);
  const animFrameRef = useRef<number>();

  const fromSettings = parseFontVariationSettings(fromFontVariationSettings);
  const toSettings = parseFontVariationSettings(toFontVariationSettings);

  const updateLetters = useCallback(
    (mouseX: number, mouseY: number) => {
      const newSettings: string[] = [];
      for (let i = 0; i < spanRefs.current.length; i++) {
        const span = spanRefs.current[i];
        if (!span) {
          newSettings.push(fromFontVariationSettings);
          continue;
        }
        const rect = span.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          (mouseX - letterCenterX) ** 2 + (mouseY - letterCenterY) ** 2
        );
        const t = Math.max(0, 1 - distance / radius);
        // Ease
        const eased = t * t;
        const interpolated: Record<string, number> = {};
        for (const key of Object.keys(fromSettings)) {
          const from = fromSettings[key] ?? 0;
          const to = toSettings[key] ?? from;
          interpolated[key] = from + (to - from) * eased;
        }
        newSettings.push(buildFontVariationSettings(interpolated));
      }
      setLetterSettings(newSettings);
    },
    [fromFontVariationSettings, fromSettings, toSettings, radius]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        updateLetters(e.clientX, e.clientY);
      });
    };

    const handleMouseLeave = () => {
      setLetterSettings([]);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [containerRef, updateLetters]);

  const letters = label.split("");

  return (
    <span className={className} aria-label={label}>
      {letters.map((char, i) => (
        <span
          key={i}
          ref={(el) => { spanRefs.current[i] = el; }}
          style={{
            fontVariationSettings:
              letterSettings[i] || fromFontVariationSettings,
            transition: "font-variation-settings 0.1s ease-out",
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};
