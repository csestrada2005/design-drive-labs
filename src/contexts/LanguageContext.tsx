import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Header
  "nav.work": { es: "Trabajo", en: "Work" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.about": { es: "Sobre mí", en: "About" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.cta": { es: "Hablemos", en: "Let's talk" },

  // Hero
  "hero.greeting": { es: "Hola, soy", en: "Hi, I'm" },
  "hero.role": { es: "diseñador web", en: "web designer" },
  "hero.headline1": { es: "Creo sitios web que", en: "I create websites that" },
  "hero.headline2": { es: "generan clientes", en: "generate clients" },
  "hero.headline3": { es: ", no solo visitas.", en: ", not just visits." },
  "hero.subtitle": {
    es: "Landing pages, sitios corporativos y tiendas online. Diseño estratégico que convierte.",
    en: "Landing pages, corporate sites and online stores. Strategic design that converts.",
  },
  "hero.cta.whatsapp": { es: "Escríbeme por WhatsApp", en: "Message me on WhatsApp" },
  "hero.cta.email": { es: "Enviar email", en: "Send email" },
  "hero.stat.projects": { es: "proyectos", en: "projects" },
  "hero.stat.years": { es: "años", en: "years" },
  "hero.stat.dedication": { es: "dedicación", en: "dedication" },

  // Stats
  "stats.projects": { es: "proyectos entregados con éxito", en: "successfully delivered projects" },
  "stats.clients": { es: "clientes satisfechos", en: "satisfied clients" },
  "stats.conversion": { es: "aumento medio en conversiones", en: "average conversion increase" },

  // Services
  "services.title": { es: "Servicios", en: "Services" },
  "services.headline": { es: "Diseño con propósito.", en: "Design with purpose." },
  "services.subheadline": { es: "Resultados reales.", en: "Real results." },
  "services.landing.title": { es: "Landing Pages", en: "Landing Pages" },
  "services.landing.desc": {
    es: "Páginas enfocadas en convertir. Diseño persuasivo, carga rápida y resultados medibles.",
    en: "Conversion-focused pages. Persuasive design, fast loading and measurable results.",
  },
  "services.web.title": { es: "Sitios Web", en: "Websites" },
  "services.web.desc": {
    es: "Presencia digital que refleja quién eres. Navegación intuitiva y diseño memorable.",
    en: "Digital presence that reflects who you are. Intuitive navigation and memorable design.",
  },
  "services.ecommerce.title": { es: "E-commerce", en: "E-commerce" },
  "services.ecommerce.desc": {
    es: "Tiendas que venden. Experiencia de compra sin fricciones y gestión sencilla.",
    en: "Stores that sell. Frictionless shopping experience and easy management.",
  },

  // Portfolio
  "portfolio.title": { es: "Trabajo", en: "Work" },
  "portfolio.headline": { es: "Proyectos seleccionados", en: "Selected projects" },
  "portfolio.cta": { es: "Ver caso de estudio", en: "View case study" },

  // Testimonials
  "testimonials.title": { es: "Testimonios", en: "Testimonials" },
  "testimonials.headline": { es: "Lo que dicen mis clientes", en: "What my clients say" },

  // About
  "about.title": { es: "Sobre mí", en: "About me" },
  "about.headline": { es: "Diseño para que funcione", en: "I design to make it work" },
  "about.bio1": {
    es: "Soy Daniel García, diseñador web especializado en crear sitios que generan resultados. Más de 3 años ayudando a negocios a destacar online.",
    en: "I'm Daniel García, a web designer specialized in creating result-driven sites. 3+ years helping businesses stand out online.",
  },
  "about.bio2": {
    es: "Mi enfoque es simple: cada decisión de diseño debe tener un propósito. No busco solo que se vea bien, busco que funcione y convierta.",
    en: "My approach is simple: every design decision must have a purpose. I don't just make it look good, I make it work and convert.",
  },
  "about.clients": { es: "He trabajado con", en: "I've worked with" },
  "about.timeline.2021": { es: "Inicio como freelance", en: "Started freelancing" },
  "about.timeline.2022": { es: "50 proyectos entregados", en: "50 projects delivered" },
  "about.timeline.2023": { es: "Especialización en conversión", en: "Conversion specialization" },
  "about.timeline.2024": { es: "Expansión internacional", en: "International expansion" },

  // Contact
  "contact.title": { es: "Contacto", en: "Contact" },
  "contact.headline": { es: "¿Hablamos?", en: "Let's talk?" },
  "contact.subtitle": {
    es: "Reserva tu consulta gratuita. Respondo en menos de 24 horas.",
    en: "Book your free consultation. I respond within 24 hours.",
  },
  "contact.whatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "contact.whatsapp.desc": { es: "Respuesta rápida", en: "Quick response" },
  "contact.email": { es: "Email", en: "Email" },
  "contact.location": { es: "Ubicación", en: "Location" },
  "contact.form.name": { es: "Nombre", en: "Name" },
  "contact.form.email": { es: "Email", en: "Email" },
  "contact.form.message": { es: "¿En qué puedo ayudarte?", en: "How can I help you?" },
  "contact.form.placeholder": { es: "Cuéntame sobre tu proyecto...", en: "Tell me about your project..." },
  "contact.form.submit": { es: "Reservar consulta gratuita", en: "Book free consultation" },
  "contact.form.success": { es: "¡Enviado!", en: "Sent!" },
  "contact.form.response": { es: "Respuesta garantizada en 24h", en: "Guaranteed response in 24h" },

  // Footer
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
