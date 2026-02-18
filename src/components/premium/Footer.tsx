import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { label: language === "es" ? "Proceso" : "Process", href: "/process" },
    { label: language === "es" ? "Nosotros" : "About", href: "/about" },
    { label: language === "es" ? "Contacto" : "Contact", href: "/contact" },
  ];

  return (
    <footer className="py-8 sm:py-10 border-t border-border/30">
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <Link to="/" className="font-display text-lg font-semibold">
            Nebu Studio<span className="text-accent">.</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            © {year} Nebu Studio
          </p>
        </div>
      </div>
    </footer>
  );
};
