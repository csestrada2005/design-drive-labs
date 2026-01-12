import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

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
    <main className="pt-28 pb-20 px-4">
      <div className="container max-w-2xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-xs font-medium mb-2">
            {language === "es" ? "Testimonios" : "Testimonials"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-4">
            {language === "es" ? "Lo que dicen nuestros clientes" : "What our clients say"}
          </h1>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card p-6">
              {/* WhatsApp badge */}
              <div className="flex items-center gap-1.5 mb-4 text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">WhatsApp</span>
              </div>

              <blockquote className="font-display text-lg leading-relaxed mb-5">
                "{language === "es" ? testimonial.textEs : testimonial.textEn}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-sm`}>
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
        <div className="mt-16 text-center">
          <a href="/contact" className="btn-primary">
            {language === "es" ? "Ser el próximo caso de éxito" : "Be the next success story"}
          </a>
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
