const links = [
  { label: "Trabajo", href: "#trabajo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a href="#" className="font-display text-xl font-semibold">
            nombre<span className="text-accent">.</span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">
            © {year}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
