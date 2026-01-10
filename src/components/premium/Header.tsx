import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#sobre-mi", label: t("nav.about") },
    { href: "#contacto", label: t("nav.contact") },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 bg-background/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/50 shadow-sm" 
            : "py-5 bg-transparent"
        }`}
        style={{
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <div className="container flex items-center justify-between">
          <a 
            href="#" 
            className="font-display text-xl font-semibold tracking-tight transition-transform duration-300 hover:scale-105"
          >
            cuatre<span className="text-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <a
              href="#contacto"
              className="btn-primary py-2.5 px-5 text-sm"
            >
              {t("nav.cta")}
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
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
          <span className="font-display text-xl font-semibold">cuatre<span className="text-accent">.</span></span>
          <div className="flex items-center gap-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center border border-border rounded-full"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>
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

        <div className="px-5 pb-8 safe-bottom">
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary block w-full py-4 text-center text-lg rounded-full"
          >
            {t("nav.cta")}
          </a>
        </div>
      </div>
    </>
  );
};
