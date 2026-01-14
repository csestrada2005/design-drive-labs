import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/process", labelEs: "Proceso", labelEn: "Process" },
    { href: "/about", labelEs: "Nosotros", labelEn: "About" },
    { href: "/testimonials", labelEs: "Clientes", labelEn: "Clients" },
    { href: "/contact", labelEs: "Contacto", labelEn: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 glass-nav shadow-sm" 
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link 
            to="/" 
            className="font-display text-xl font-semibold tracking-tight"
          >
            cuatre<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href} 
                className={`text-sm transition-colors ${
                  location.pathname === link.href 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {language === "es" ? link.labelEs : link.labelEn}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-3 py-1.5 text-xs font-medium rounded-full glass-card border-0"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full glass-card border-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          background: 'hsl(var(--background))',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
            cuatre<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-3 py-1.5 text-xs font-medium glass-card rounded-full border-0"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-10 h-10 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-display text-3xl py-3 border-b border-border/20 ${
                location.pathname === link.href ? "text-accent" : "text-foreground"
              }`}
            >
              {language === "es" ? link.labelEs : link.labelEn}
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-8 safe-bottom">
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary block w-full py-3.5 text-center rounded-full"
          >
            {language === "es" ? "Empezar proyecto" : "Start project"}
          </Link>
        </div>
      </div>
    </>
  );
};
