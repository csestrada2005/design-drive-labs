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
  "nav.work": { es: "Trabajo", en: "Work" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.about": { es: "Sobre nosotros", en: "About us" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.cta": { es: "Agendar consultoría", en: "Book consultation" },

  // Hero
  "hero.eyebrow": { es: "Somos cuatre", en: "We are cuatre" },
  "hero.headline1": { es: "Creamos sitios web que", en: "We create websites that" },
  "hero.headline2": { es: "generan clientes", en: "generate clients" },
  "hero.headline3": { es: ", no solo visitas.", en: ", not just visits." },
  "hero.subtitle": {
    es: "Landing pages, sitios web corporativos y tiendas online. Diseño estratégico enfocado en conversión.",
    en: "Landing pages, corporate websites and online stores. Strategic design focused on conversion.",
  },
  "hero.cta.primary": { es: "Agendar consultoría gratis", en: "Book free consultation" },
  "hero.cta.secondary": { es: "Ver trabajo", en: "View work" },
  "hero.microcopy": { es: "Respondemos en menos de 24 horas.", en: "We respond within 24 hours." },

  // Stats / Metrics
  "stats.projects": { es: "Proyectos entregados", en: "Projects delivered" },
  "stats.clients": { es: "Clientes satisfechos", en: "Satisfied clients" },
  "stats.conversion": { es: "Mejora media en conversiones", en: "Average conversion improvement" },
  "stats.disclaimer": { es: "Resultados varían según industria y oferta.", en: "Results vary by industry and offer." },

  // Services
  "services.title": { es: "Servicios", en: "Services" },
  "services.headline": { es: "Diseño con propósito.", en: "Design with purpose." },
  "services.subheadline": { es: "Resultados reales.", en: "Real results." },
  "services.consultation.headline": { es: "¿No sabes qué necesitas?", en: "Not sure what you need?" },
  "services.consultation.subheadline": { es: "Te orientamos en 15 minutos. Sin compromiso.", en: "We'll guide you in 15 minutes. No strings attached." },
  "services.consultation.cta": { es: "Agendar consultoría gratis", en: "Book free consultation" },
  "services.landing.title": { es: "Landing pages", en: "Landing pages" },
  "services.landing.desc": {
    es: "Páginas diseñadas para convertir. Cada elemento está pensado para guiar al visitante hacia la acción que importa, con diseño premium y estrategia de conversión integrada.",
    en: "Pages designed to convert. Every element is crafted to guide visitors toward the action that matters, with premium design and integrated conversion strategy.",
  },
  "services.web.title": { es: "Sitios web", en: "Websites" },
  "services.web.desc": {
    es: "Tu presencia digital profesional. Sitios elegantes que transmiten confianza, cuentan tu historia y posicionan tu marca donde merece estar.",
    en: "Your professional digital presence. Elegant sites that convey trust, tell your story and position your brand where it deserves to be.",
  },
  "services.ecommerce.title": { es: "Tiendas online + IA", en: "Online stores + AI" },
  "services.ecommerce.desc": {
    es: "Tiendas inteligentes que venden mientras duermes. Con automatizaciones que recuperan carritos abandonados, responden clientes al instante y optimizan cada venta.",
    en: "Smart stores that sell while you sleep. With automations that recover abandoned carts, respond to customers instantly and optimize every sale.",
  },
  "services.cta.label": { es: "Consultoría gratis", en: "Free consultation" },

  // Process
  "process.title": { es: "Proceso", en: "Process" },
  "process.headline": { es: "Cómo trabajamos", en: "How we work" },
  "process.step1.title": { es: "Diagnóstico", en: "Diagnosis" },
  "process.step1.desc": { es: "Analizamos tu negocio, competencia y objetivos para definir la mejor estrategia.", en: "We analyze your business, competition and goals to define the best strategy." },
  "process.step2.title": { es: "Diseño", en: "Design" },
  "process.step2.desc": { es: "Creamos propuestas visuales que reflejan tu marca y maximizan conversiones.", en: "We create visual proposals that reflect your brand and maximize conversions." },
  "process.step3.title": { es: "Desarrollo", en: "Development" },
  "process.step3.desc": { es: "Construimos tu sitio con código limpio, rápido y optimizado para buscadores.", en: "We build your site with clean, fast code optimized for search engines." },
  "process.step4.title": { es: "Optimización y entrega", en: "Optimization & delivery" },
  "process.step4.desc": { es: "Ajustamos cada detalle y te entregamos un sitio listo para generar resultados.", en: "We fine-tune every detail and deliver a site ready to generate results." },

  // Portfolio
  "portfolio.title": { es: "Trabajo", en: "Work" },
  "portfolio.headline": { es: "Proyectos seleccionados", en: "Selected projects" },
  "portfolio.cta": { es: "Ver proyecto", en: "View project" },

  // Testimonials
  "testimonials.title": { es: "Testimonios", en: "Testimonials" },
  "testimonials.headline": { es: "Lo que dicen nuestros clientes", en: "What our clients say" },

  // About
  "about.title": { es: "Sobre nosotros", en: "About us" },
  "about.headline": { es: "Diseñamos para que funcione", en: "We design to make it work" },
  "about.bio1": {
    es: "Somos un equipo especializado en crear sitios web que generan resultados. Más de 3 años ayudando a negocios a destacar online.",
    en: "We are a team specialized in creating websites that generate results. 3+ years helping businesses stand out online.",
  },
  "about.bio2": {
    es: "Nuestro enfoque es simple: cada decisión de diseño tiene un propósito. No buscamos solo que se vea bien, buscamos que funcione y convierta.",
    en: "Our approach is simple: every design decision has a purpose. We don't just make it look good, we make it work and convert.",
  },
  "about.clients": { es: "Hemos trabajado con", en: "We've worked with" },
  "about.timeline.2021": { es: "Inicio del equipo", en: "Team founded" },
  "about.timeline.2022": { es: "50 proyectos entregados", en: "50 projects delivered" },
  "about.timeline.2023": { es: "Especialización en conversión", en: "Conversion specialization" },
  "about.timeline.2024": { es: "Expansión internacional", en: "International expansion" },

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

  // Portfolio
  "portfolio.subtitle": { es: "Una muestra de cómo diseñamos para que convierta.", en: "A showcase of how we design for conversion." },
  "portfolio.swipe": { es: "Desliza para ver más", en: "Swipe to see more" },
  "portfolio.demo": { es: "Demo", en: "Demo" },
  "portfolio.prev": { es: "Imagen anterior", en: "Previous image" },
  "portfolio.next": { es: "Imagen siguiente", en: "Next image" },
  "portfolio.goto": { es: "Ir a imagen", en: "Go to image" },
  
  // Portfolio Projects
  "portfolio.bumba.summary": { 
    es: "Tienda online de mentas energéticas y de enfoque para emprendedores. Construida en React e integrada con Shopify para una experiencia rápida, premium y orientada a conversión.",
    en: "Online store for energy and focus mints for entrepreneurs. Built in React and integrated with Shopify for a fast, premium, conversion-oriented experience."
  },
  "portfolio.bumba.results": { 
    es: "Optimizado para conversión: jerarquía clara, CTA directo y flujo de compra sin fricción.",
    en: "Optimized for conversion: clear hierarchy, direct CTA and frictionless purchase flow."
  },
  "portfolio.studio.summary": { 
    es: "Concepto de diseño — disponible para personalización. Landing minimalista con enfoque en captación de leads y estética editorial.",
    en: "Design concept — available for customization. Minimalist landing focused on lead capture and editorial aesthetics."
  },
  "portfolio.luxe.summary": { 
    es: "Concepto de diseño — disponible para personalización. Tienda online con experiencia de compra premium y checkout optimizado.",
    en: "Design concept — available for customization. Online store with premium shopping experience and optimized checkout."
  },
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
