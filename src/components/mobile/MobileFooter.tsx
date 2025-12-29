export const MobileFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-5 border-t border-border">
      <div className="flex flex-col items-center gap-4">
        <a href="#" className="font-display font-bold text-lg">
          studio<span className="text-accent">.</span>
        </a>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#servicios" className="active:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#trabajo" className="active:text-foreground transition-colors">
            Trabajo
          </a>
          <a href="#contacto" className="active:text-foreground transition-colors">
            Contacto
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} studio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
