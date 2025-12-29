import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#trabajo", label: t("nav.work") },
    { href: "#servicios", label: t("nav.services") },
    { href: "#sobre-mi", label: t("nav.about") },
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
          isScrolled ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border" : "py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="font-display text-xl font-semibold tracking-tight">
            daniel<span className="text-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-full hover:bg-muted transition-colors"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <a
              href="#contacto"
              className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              {t("nav.cta")}
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden touch-target flex items-center justify-center"
            aria-label="Open menu"
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
          <span className="font-display text-xl font-semibold">daniel<span className="text-accent">.</span></span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-full"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <button onClick={() => setIsMobileMenuOpen(false)} className="touch-target flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
          </div>
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
            {t("nav.cta")}
          </a>
        </div>
      </div>
    </>
  );
};
