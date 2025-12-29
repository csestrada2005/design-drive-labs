import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrollProgress } from "@/hooks/useAnimations";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#sobre-mi", label: "Sobre mí" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progress = useScrollProgress();

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
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/50 z-[60]">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${progress * 100}%`,
            background: "var(--gradient-primary)",
          }}
        />
      </div>

      <header
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container">
          <nav
            className={`flex items-center justify-between px-6 py-4 transition-all duration-500 ${
              isScrolled
                ? "bg-card/95 backdrop-blur-xl rounded-2xl shadow-soft border border-border/50"
                : ""
            }`}
          >
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">Studio</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <a
              href="#contacto"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors group"
            >
              Hablemos
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden touch-target flex items-center justify-center -mr-2"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-lg">Studio</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="touch-target flex items-center justify-center -mr-2"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-4xl py-4 border-b border-border/30 transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 80 + 150}ms` : "0ms" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-6 pb-8">
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background rounded-2xl font-medium text-lg transition-all duration-500 ${
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "450ms" : "0ms" }}
            >
              Empezar proyecto
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
