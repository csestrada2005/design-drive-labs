import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

export const Hero = () => {
  const { language } = useLanguage();

  return (
    <section className="min-h-[80dvh] flex flex-col items-center justify-center pt-16 pb-8 px-4">
      <div className="container max-w-2xl text-center">
        {/* Eyebrow */}
        <p className="text-accent font-medium text-xs tracking-widest uppercase mb-4">
          {language === "es" ? "Estudio de diseño web" : "Web design studio"}
        </p>

        {/* Main headline */}
        <h1 className="font-display text-[clamp(2rem,8vw,4rem)] leading-[1.05] tracking-tight mb-5">
          {language === "es" ? (
            <>
              Sitios web que<br />
              <span className="text-accent">convierten</span>
            </>
          ) : (
            <>
              Websites that<br />
              <span className="text-accent">convert</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8">
          {language === "es" 
            ? "Landing pages, sitios corporativos y tiendas online. Diseño estratégico enfocado en resultados."
            : "Landing pages, corporate sites and online stores. Strategic design focused on results."}
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/522213497090"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-7 py-3.5 mb-4"
        >
          <MessageCircle className="w-4 h-4" />
          {language === "es" ? "Empezar proyecto" : "Start project"}
        </a>

        {/* Microcopy */}
        <p className="text-[11px] text-muted-foreground/60">
          {language === "es" ? "Respuesta en menos de 24h" : "Response within 24h"}
        </p>
      </div>

    </section>
  );
};
