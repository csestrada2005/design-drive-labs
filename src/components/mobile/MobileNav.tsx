import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useMobileAnimations";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItems = [
    { label: "Servicios", href: "#servicios" },
    { label: "Trabajo", href: "#trabajo" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-muted z-[60]">
        <div
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "pt-2" : "pt-4"
        }`}
      >
        <div className="container">
          <nav
            className={`flex items-center justify-between px-5 py-4 transition-all duration-300 ${
              isScrolled
                ? "bg-background/90 backdrop-blur-xl rounded-2xl shadow-sm border border-border/50"
                : ""
            }`}
          >
            <a href="#" className="font-display font-bold text-xl">
              studio<span className="text-accent">.</span>
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="touch-target flex items-center justify-center -mr-3"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Full screen menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 pt-6">
            <span className="font-display font-bold text-xl">
              studio<span className="text-accent">.</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="touch-target flex items-center justify-center -mr-3"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-display text-5xl font-bold py-4 border-b border-border/30 transition-all duration-500 ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 100 + 200}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-5 pb-8 pb-safe-bottom">
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className={`block w-full py-5 bg-foreground text-background text-center font-display font-semibold text-lg rounded-2xl transition-all duration-500 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
            >
              Empezar proyecto
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
