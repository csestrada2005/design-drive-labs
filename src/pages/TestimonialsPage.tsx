import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    textEs: "Se siente premium. La gente entiende rápido qué hacemos. 🙏",
    textEn: "It feels premium. People quickly understand what we do. 🙏",
    name: "Sophie A.",
    roleEs: "Cafetería • Dubai",
    roleEn: "Coffee Shop • Dubai",
    initials: "SA",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    textEs: "La web se ve seria. Ya nos escriben más por WhatsApp. 👌",
    textEn: "The website looks serious. We get more WhatsApp messages now. 👌",
    name: "Khalid M.",
    roleEs: "Barbería • Dubai",
    roleEn: "Barbershop • Dubai",
    initials: "KM",
    color: "bg-amber-500",
  },
  {
    id: 3,
    textEs: "Ahora el sitio explica solo qué hacemos. Más fácil cotizar.",
    textEn: "Now the site explains itself. Easier to quote.",
    name: "Andrea V.",
    roleEs: "Eventos • CDMX",
    roleEn: "Events • CDMX",
    initials: "AV",
    color: "bg-violet-500",
  },
];

const TestimonialsContent = () => {
  const { language } = useLanguage();

  return (
    <main className="pt-24 pb-16 px-4">
      <div className="container max-w-2xl">
        {/* Header - Quote style */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Quote className="w-10 h-10 text-accent/30 mb-4" />
          <h1 className="font-display text-2xl sm:text-3xl mb-2">
            {language === "es" ? "Mensajes reales" : "Real messages"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {language === "es" 
              ? "De clientes después de entregar su proyecto."
              : "From clients after delivering their project."}
          </p>
        </div>

        {/* Testimonials - Stacked cards with offset */}
        <div className="space-y-5 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="glass-card p-6"
              style={{ marginLeft: index % 2 === 1 ? '1rem' : '0' }}
            >
              {/* WhatsApp badge */}
              <div className="flex items-center gap-1.5 mb-4">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="text-[10px] font-medium text-[#25D366]">WhatsApp</span>
              </div>

              <blockquote className="font-display text-base sm:text-lg leading-relaxed mb-5">
                "{language === "es" ? testimonial.textEs : testimonial.textEn}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-xs`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "es" ? testimonial.roleEs : testimonial.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            {language === "es" ? "¿Quieres ser el próximo?" : "Want to be next?"}
          </p>
          <Link to="/contact" className="btn-primary">
            {language === "es" ? "Empezar proyecto" : "Start project"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

const TestimonialsPage = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <TestimonialsContent />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default TestimonialsPage;
