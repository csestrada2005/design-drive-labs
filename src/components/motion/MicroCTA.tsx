import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useServiceChooser } from "@/components/motion/ServiceChooserModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface MicroCTAProps {
  variant?: "both" | "primary";
  className?: string;
}

export const MicroCTA = ({ variant = "both", className = "" }: MicroCTAProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { open: openServiceModal } = useServiceChooser();
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}
       initial={{ opacity: 0, y: 14 }}
       animate={isInView ? { opacity: 1, y: 0 } : {}}
       transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={openServiceModal}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ boxShadow: "0 2px 16px -4px hsl(0 100% 50% / 0.35)" }}
      >
        {t("cta.bookStrategy")}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {variant === "both" && (
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:border-primary/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t("cta.viewWork")}
        </a>
      )}
    </motion.div>
  );
};
