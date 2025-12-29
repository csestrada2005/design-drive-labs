import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { label: t("nav.work"), href: "#trabajo" },
    { label: t("nav.services"), href: "#servicios" },
    { label: t("nav.about"), href: "#sobre-mi" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a href="#" className="font-display text-xl font-semibold">
            daniel<span className="text-accent">.</span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">© {year}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};
