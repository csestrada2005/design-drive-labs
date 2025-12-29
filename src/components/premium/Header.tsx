import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          isScrolled ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border" : "py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="font-display text-xl font-semibold tracking-tight">
            nombre<span className="text-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="hidden md:inline-flex px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
          >
            Hablemos
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden touch-target flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background flex flex-col transition-all duration-400 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="font-display text-xl font-semibold">
            nombre<span className="text-accent">.</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="touch-target flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-display text-4xl py-4 border-b border-border transition-all duration-400 ${
                isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-5 pb-8">
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full py-4 bg-foreground text-background text-center font-medium text-lg rounded-full"
          >
            Hablemos
          </a>
        </div>
      </div>
    </>
  );
};
