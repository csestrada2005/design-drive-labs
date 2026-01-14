import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { ArrowLeft } from "lucide-react";

const NotFoundContent = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center">
        <h1 className="font-display text-7xl sm:text-9xl text-accent mb-4">404</h1>
        <p className="text-xl sm:text-2xl font-display mb-2">
          {language === "es" ? "Página no encontrada" : "Page not found"}
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          {language === "es" 
            ? "La página que buscas no existe o fue movida." 
            : "The page you're looking for doesn't exist or was moved."}
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "es" ? "Volver al inicio" : "Back to home"}
        </Link>
      </div>
    </main>
  );
};

const NotFound = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative flex flex-col">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <NotFoundContent />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default NotFound;