import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Header / Navbar
  "nav.about": { es: "Sobre nosotros", en: "About us" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.cta": { es: "Agendar consultoría", en: "Book consultation" },

  // Hero
  "hero.eyebrow": { es: "Somos Cuatre.", en: "We are Cuatre." },
  "hero.headline1": { es: "Creamos sitios web que", en: "We create websites that" },
  "hero.headline2": { es: "generan clientes", en: "generate clients" },
  "hero.headline3": { es: ", no solo visitas.", en: ", not just visits." },
  "hero.subtitle": {
    es: "Landing pages, sitios corporativos y tiendas online. Diseño estratégico enfocado en conversión.",
    en: "Landing pages, corporate websites and online stores. Strategic design focused on conversion.",
  },
  "hero.cta.primary": { es: "Agendar consultoría gratis", en: "Book free consultation" },
  "hero.microcopy": { es: "Respondemos en menos de 24 horas.", en: "We respond within 24 hours." },

  // Trust Points (replacing fake metrics)
  "trust.point1": { es: "Proyectos seleccionados para mantener calidad", en: "Selected projects to maintain quality" },
  "trust.point2": { es: "Diseño con intención: claridad, confianza y acción", en: "Intentional design: clarity, trust and action" },
  "trust.point3": { es: "Mobile-first + velocidad + SEO base", en: "Mobile-first + speed + basic SEO" },
  "trust.disclaimer": { 
    es: "Resultados dependen de tu industria, oferta y punto de partida.", 
    en: "Results depend on your industry, offer and starting point." 
  },

  // Process
  "process.title": { es: "Proceso", en: "Process" },
  "process.headline": { es: "Cómo trabajamos", en: "How we work" },
  "process.step1.title": { es: "Diagnóstico", en: "Diagnosis" },
  "process.step1.desc": { 
    es: "Entendemos tu negocio, cliente y oferta. Definimos el objetivo de conversión antes de diseñar.", 
    en: "We understand your business, customer and offer. We define the conversion goal before designing." 
  },
  "process.step2.title": { es: "Diseño", en: "Design" },
  "process.step2.desc": { 
    es: "Estructura alineada a tu marca y enfocada en conversión. Cada sección tiene un propósito.", 
    en: "Structure aligned with your brand and focused on conversion. Every section has a purpose." 
  },
  "process.step3.title": { es: "Desarrollo", en: "Development" },
  "process.step3.desc": { 
    es: "Código limpio, carga rápida, responsive y optimizado para buscadores desde el inicio.", 
    en: "Clean code, fast loading, responsive and search engine optimized from the start." 
  },
  "process.step4.title": { es: "Optimización y entrega", en: "Optimization & delivery" },
  "process.step4.desc": { 
    es: "Refinamos copy y CTAs, eliminamos fricción y entregamos listo para lanzar.", 
    en: "We refine copy and CTAs, remove friction and deliver ready to launch." 
  },

  // Testimonials
  "testimonials.title": { es: "Mensajes de nuestros clientes", en: "Messages from our clients" },
  "testimonials.headline": { es: "Mensajes que nos han mandado después de entregar.", en: "Messages they sent us after delivery." },

  // About
  "about.title": { es: "Sobre nosotros", en: "About us" },
  "about.headline": { es: "Obsesionados con los detalles", en: "Obsessed with details" },
  "about.bio1": {
    es: "Somos un estudio pequeño a propósito. Tomamos proyectos seleccionados para poder dar atención directa y personalizada a cada cliente.",
    en: "We're a small studio on purpose. We take selected projects so we can give direct and personalized attention to each client.",
  },
  "about.bio2": {
    es: "Cada sección de tu web tiene un propósito. No diseñamos para que se vea bien — diseñamos para que funcione y convierta.",
    en: "Every section of your website has a purpose. We don't design to look good — we design to work and convert.",
  },
  "about.clients": { es: "Trabajamos con negocios en crecimiento en Dubái y México.", en: "We work with growing businesses in Dubai and Mexico." },

  // Contact
  "contact.title": { es: "Contacto", en: "Contact" },
  "contact.headline": { es: "¿Hablamos?", en: "Let's talk?" },
  "contact.subtitle": {
    es: "Cuéntanos qué necesitas. Respondemos en menos de 24 horas.",
    en: "Tell us what you need. We respond within 24 hours.",
  },
  "contact.whatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "contact.whatsapp.desc": { es: "Respuesta rápida", en: "Quick response" },
  "contact.email": { es: "Email", en: "Email" },
  "contact.location": { es: "Ubicación", en: "Location" },
  "contact.form.name": { es: "Nombre", en: "Name" },
  "contact.form.email": { es: "Email", en: "Email" },
  "contact.form.message": { es: "¿En qué podemos ayudarte?", en: "How can we help you?" },
  "contact.form.placeholder": { es: "Cuéntanos sobre tu proyecto...", en: "Tell us about your project..." },
  "contact.form.submit": { es: "Enviar", en: "Send" },
  "contact.form.success": { es: "¡Enviado!", en: "Sent!" },
  "contact.form.response": { es: "Consultoría gratis, sin compromiso.", en: "Free consultation, no strings attached." },

  // Scarcity
  "scarcity.text": { es: "Tomamos pocos proyectos al mes para mantener calidad.", en: "We take few projects per month to maintain quality." },

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