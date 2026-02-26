import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "en" | "es";

/* ══════════════════════════════════════════════════════════════
   TRANSLATION DICTIONARIES — EN / ES
   Simplified copy (≈ 8th-grade reading level), professional tone.
   ══════════════════════════════════════════════════════════════ */

const translations: Record<string, { en: string; es: string }> = {
  // ── Navigation / Menu ──
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.whatWeBuild": { en: "What We Build", es: "Qué Hacemos" },
  "nav.designLab": { en: "Design Lab", es: "Laboratorio" },
  "nav.howWeWork": { en: "How We Work", es: "Proceso" },
  "nav.results": { en: "Results", es: "Resultados" },
  "nav.ourProjects": { en: "Our Projects", es: "Proyectos" },
  "nav.standards": { en: "Standards", es: "Estándares" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "nav.bookCall": { en: "Book a Call", es: "Agendar Llamada" },
  "nav.bookStrategyCall": { en: "Book a Strategy Call", es: "Agendar Consultoría" },

  // ── Hero Section ──
  "hero.subhead": {
    en: "We design and engineer websites & systems for brands that sell — built to convert, rank, and scale.",
    es: "Diseñamos y construimos sitios web y sistemas para marcas que venden — hechos para convertir, posicionar y escalar.",
  },
  "hero.bullet1": { en: "Higher conversion rates", es: "Mayor tasa de conversión" },
  "hero.bullet2": { en: "SEO-first architecture", es: "Arquitectura SEO-first" },
  "hero.bullet3": { en: "Ops that run themselves", es: "Operaciones automatizadas" },
  "hero.viewWork": { en: "View Work", es: "Ver Proyectos" },
  "hero.accepting": { en: "Accepting projects", es: "Aceptando proyectos" },
  "hero.delivered": { en: "Projects delivered", es: "Proyectos entregados" },
  "hero.response": { en: "24h response", es: "Respuesta en 24h" },

  // ── Services / What We Build ──
  "services.title": { en: "WHAT WE", es: "QUÉ" },
  "services.titleAccent": { en: "BUILD", es: "HACEMOS" },
  "services.subtitle": {
    en: "Three distinct engagement levels. Interact with the dial to explore.",
    es: "Tres niveles de servicio. Usa el dial para explorar.",
  },
  "services.tier": { en: "Tier", es: "Nivel" },
  "services.bestFor": { en: "Best for", es: "Ideal para" },
  "services.explore": { en: "Explore", es: "Explorar" },
  "services.ecommerce": { en: "Ecommerce Storefronts", es: "Tiendas Online" },
  "services.ecommerce.cat": { en: "High-End Web", es: "Web Premium" },
  "services.ecommerce.bestFor": {
    en: "D2C & retail brands ready to sell more online.",
    es: "Marcas D2C y retail listas para vender más online.",
  },
  "services.ecommerce.f1": {
    en: "Conversion-optimized product pages & checkout",
    es: "Páginas de producto y checkout optimizados para conversión",
  },
  "services.ecommerce.f2": {
    en: "SEO-first architecture that ranks from day one",
    es: "Arquitectura SEO-first que posiciona desde el día uno",
  },
  "services.ecommerce.f3": {
    en: "Premium animations that build brand trust",
    es: "Animaciones premium que generan confianza de marca",
  },
  "services.marketing": { en: "Marketing Websites", es: "Sitios Web de Marketing" },
  "services.marketing.cat": { en: "Web + Growth", es: "Web + Crecimiento" },
  "services.marketing.bestFor": {
    en: "Businesses turning traffic into qualified leads.",
    es: "Negocios que convierten tráfico en leads calificados.",
  },
  "services.marketing.f1": {
    en: "Landing pages engineered for lead capture",
    es: "Landing pages diseñadas para captar leads",
  },
  "services.marketing.f2": {
    en: "CMS & blog with built-in content strategy",
    es: "CMS y blog con estrategia de contenido integrada",
  },
  "services.marketing.f3": {
    en: "Analytics dashboards to measure every click",
    es: "Dashboards de analítica para medir cada clic",
  },
  "services.systems": { en: "Systems & Web Apps", es: "Sistemas y Aplicaciones Web" },
  "services.systems.cat": { en: "Full Product", es: "Producto Completo" },
  "services.systems.bestFor": {
    en: "Founders & ops teams replacing manual workflows.",
    es: "Fundadores y equipos que reemplazan procesos manuales.",
  },
  "services.systems.f1": {
    en: "Custom CRMs, portals & internal tools",
    es: "CRMs personalizados, portales y herramientas internas",
  },
  "services.systems.f2": {
    en: "AI integrations & automated messaging",
    es: "Integraciones de IA y mensajería automatizada",
  },
  "services.systems.f3": {
    en: "Scalable backends built for growth",
    es: "Backends escalables diseñados para crecer",
  },

  // ── Design Lab ──
  "lab.title": { en: "DESIGN LAB", es: "LABORATORIO" },
  "lab.subtitle": {
    en: "Interactive UI components that enhance and personalize your web applications.",
    es: "Componentes interactivos de UI que mejoran y personalizan tus aplicaciones web.",
  },
  "lab.glassSurface": { en: "GLASS PANEL", es: "PANEL DE CRISTAL" },
  "lab.glassSub": { en: "Move cursor to refract light", es: "Mueve el cursor para refractar la luz" },
  "lab.gridScan": { en: "GRID SCAN", es: "ESCANEO DE GRILLA" },
  "lab.gridScanHover": { en: "Hover to accelerate", es: "Pasa el cursor para acelerar" },
  "lab.gridScanAccel": { en: "ACCELERATING…", es: "ACELERANDO…" },
  "lab.imageTrail": { en: "IMAGE TRAIL", es: "RASTRO DE IMÁGENES" },
  "lab.imageTrailSub": { en: "Move cursor to spawn", es: "Mueve el cursor para generar" },
  "lab.imageTrailOff": { en: "Trail disabled", es: "Rastro desactivado" },

  // ── Process / How we work ──
  "process.title": { en: "How we work.", es: "Cómo trabajamos." },
  "process.s1.num": { en: "01", es: "01" },
  "process.s1.title": { en: "Audit & Strategy", es: "Auditoría y Estrategia" },
  "process.s1.desc": {
    en: "We dissect your market, audience, and competitors to build on real insight.",
    es: "Analizamos tu mercado, audiencia y competencia para construir sobre datos reales.",
  },
  "process.s2.num": { en: "02", es: "02" },
  "process.s2.title": { en: "UX Structure", es: "Estructura UX" },
  "process.s2.desc": {
    en: "Information architecture designed for how users actually think and move.",
    es: "Arquitectura de información diseñada para cómo los usuarios realmente piensan y navegan.",
  },
  "process.s3.num": { en: "03", es: "03" },
  "process.s3.title": { en: "Design System", es: "Sistema de Diseño" },
  "process.s3.desc": {
    en: "A premium visual identity built for consistency, speed, and brand authority.",
    es: "Una identidad visual premium construida para consistencia, velocidad y autoridad de marca.",
  },
  "process.s4.num": { en: "04", es: "04" },
  "process.s4.title": { en: "Build & Integrations", es: "Desarrollo e Integraciones" },
  "process.s4.desc": {
    en: "Clean code, fluid motion, and every integration you need — shipped fast.",
    es: "Código limpio, animaciones fluidas y cada integración que necesitas — entregado rápido.",
  },
  "process.s5.num": { en: "05", es: "05" },
  "process.s5.title": { en: "Launch & Optimize", es: "Lanzamiento y Optimización" },
  "process.s5.desc": {
    en: "We track, test, and improve what matters after go-live.",
    es: "Rastreamos, probamos y mejoramos lo que importa después del lanzamiento.",
  },

  // ── Growth Impact ──
  "growth.title": { en: "GROWTH IMPACT", es: "IMPACTO EN CRECIMIENTO" },
  "growth.subtitle": {
    en: "We don't make \"pretty pages.\" We build systems that sell. These are research-backed statistics on how design impacts business.",
    es: "No hacemos \"páginas bonitas\". Construimos sistemas que venden. Estas son estadísticas respaldadas por investigación sobre cómo el diseño impacta los negocios.",
  },
  "growth.holdReveal": { en: "Hold to reveal the data", es: "Mantén presionado para ver los datos" },
  "growth.m1.label": { en: "First Impressions", es: "Primera Impresión" },
  "growth.m1.sub": { en: "Influenced by web design quality", es: "Influenciada por la calidad del diseño web" },
  "growth.m2.label": { en: "Higher Conversion", es: "Mayor Conversión" },
  "growth.m2.sub": { en: "With professional UX design", es: "Con diseño UX profesional" },
  "growth.m3.label": { en: "More Time on Site", es: "Más Tiempo en el Sitio" },
  "growth.m3.sub": { en: "With quality visual content", es: "Con contenido visual de calidad" },
  "growth.m4.label": { en: "Brand Trust", es: "Confianza de Marca" },
  "growth.m4.sub": { en: "Stronger credibility with polished design", es: "Mayor credibilidad con diseño profesional" },
  "growth.chartLine": { en: "Conversion Rate Over Time (%)", es: "Tasa de Conversión en el Tiempo (%)" },
  "growth.chartBar": { en: "Lead-to-Customer Rate (%)", es: "Tasa de Lead a Cliente (%)" },
  "growth.chartBefore": { en: "Before", es: "Antes" },
  "growth.roiTitle": { en: "Good Design Costs Money.", es: "El Buen Diseño Cuesta Dinero." },
  "growth.roiAccent": { en: "Bad Design Costs Revenue.", es: "El Mal Diseño Cuesta Ingresos." },
  "growth.roiDesc": {
    en: "See what your revenue looks like now — and what it could look like with our design and technology systems working for you.",
    es: "Mira cómo se ve tu ingreso ahora — y cómo podría verse con nuestros sistemas de diseño y tecnología trabajando para ti.",
  },
  "growth.roiCurrent": { en: "Current Revenue", es: "Ingreso Actual" },
  "growth.roiProjected": { en: "Projected Value With Us", es: "Valor Proyectado Con Nosotros" },
  "growth.roiNote": {
    en: "Revenue grows faster with strategic design & technology",
    es: "Los ingresos crecen más rápido con diseño y tecnología estratégica",
  },

  // ── Featured Work ──
  "work.title": { en: "Our", es: "Nuestros" },
  "work.titleAccent": { en: "Work.", es: "Proyectos." },
  "work.wantNext": { en: "Want yours next?", es: "¿Quieres ser el siguiente?" },
  "work.letsTalk": { en: "Let's talk.", es: "Hablemos." },
  "work.whatWeDid": { en: "What we did", es: "Qué hicimos" },
  "work.outcome": { en: "Outcome", es: "Resultado" },
  "work.seeBreakdown": { en: "See breakdown", es: "Ver detalle" },
  "work.back": { en: "Back", es: "Volver" },

  // ── Standards / Minimum Guaranteed Output ──
  "standards.title": { en: "MINIMUM GUARANTEED OUTPUT.", es: "ENTREGABLES MÍNIMOS GARANTIZADOS." },
  "standards.subtitle": { en: "The baseline features.", es: "Las características base." },
  "standards.s1.label": { en: "Mobile-First", es: "Mobile-First" },
  "standards.s1.desc": {
    en: "Every element is designed for thumb-first interaction before scaling up.",
    es: "Cada elemento está diseñado para interacción con el pulgar antes de escalar.",
  },
  "standards.s2.label": { en: "Speed & Performance", es: "Velocidad y Rendimiento" },
  "standards.s2.desc": {
    en: "Sub-2s load times, optimized assets, Core Web Vitals in the green.",
    es: "Tiempos de carga menores a 2s, assets optimizados, Core Web Vitals en verde.",
  },
  "standards.s3.label": { en: "AOV and CRO Foundations", es: "Fundamentos de AOV y CRO" },
  "standards.s3.desc": {
    en: "Hierarchy, trust signals, and friction removal baked into every layout.",
    es: "Jerarquía, señales de confianza y eliminación de fricción integrados en cada diseño.",
  },
  "standards.s4.label": { en: "Clean Handoff", es: "Entrega Limpia" },
  "standards.s4.desc": {
    en: "You get the keys. Full documentation, zero black boxes.",
    es: "Tú recibes las llaves. Documentación completa, cero cajas negras.",
  },

  // ── FAQ ──
  "faq.eyebrow": { en: "Common questions", es: "Preguntas frecuentes" },
  "faq.title": { en: "Before you", es: "Antes de" },
  "faq.titleAccent": { en: "decide.", es: "decidir." },
  "faq.subtitle": { en: "Straight answers. No fluff.", es: "Respuestas directas. Sin relleno." },
  "faq.q1": { en: "How much does a project cost?", es: "¿Cuánto cuesta un proyecto?" },
  "faq.a1": {
    en: "Every project is scoped individually. We provide a detailed proposal after a free strategy call — no surprises, no hidden fees.",
    es: "Cada proyecto se cotiza individualmente. Ofrecemos una propuesta detallada después de una consultoría gratuita — sin sorpresas ni costos ocultos.",
  },
  "faq.q2": { en: "What's the typical timeline?", es: "¿Cuál es el tiempo de entrega típico?" },
  "faq.a2": {
    en: "Most projects launch in 4–8 weeks depending on complexity. We agree on milestones upfront so you always know where things stand.",
    es: "La mayoría de los proyectos se lanzan en 4–8 semanas según la complejidad. Acordamos milestones desde el inicio para que siempre sepas cómo va todo.",
  },
  "faq.q3": { en: "What tech stack do you use?", es: "¿Qué tecnologías usan?" },
  "faq.a3": {
    en: "We build with modern, scalable tools — React, Next.js, Tailwind, Supabase, Shopify, and custom backends. We pick what fits your goals, not trends.",
    es: "Construimos con herramientas modernas y escalables — React, Next.js, Tailwind, Supabase, Shopify y backends personalizados. Elegimos lo que se ajusta a tus metas, no a tendencias.",
  },
  "faq.q4": { en: "Do I own everything at the end?", es: "¿Soy dueño de todo al final?" },
  "faq.a4": {
    en: "Yes. Code, design files, assets, domain access, and documentation — it's all yours. No lock-in, no hostage situations.",
    es: "Sí. Código, archivos de diseño, assets, acceso al dominio y documentación — todo es tuyo. Sin ataduras.",
  },
  "faq.q5": { en: "What kind of support do you offer after launch?", es: "¿Qué soporte ofrecen después del lanzamiento?" },
  "faq.a5": {
    en: "We offer post-launch support plans and are available for iterations. Most clients stay for ongoing optimization — but it's never required.",
    es: "Ofrecemos planes de soporte post-lanzamiento y estamos disponibles para iteraciones. La mayoría de los clientes se quedan para optimización continua — pero nunca es obligatorio.",
  },
  "faq.q6": { en: "How do you handle SEO and performance?", es: "¿Cómo manejan SEO y rendimiento?" },
  "faq.a6": {
    en: "SEO-first architecture is built in from day one — semantic HTML, Core Web Vitals optimization, structured data, and fast load times.",
    es: "La arquitectura SEO-first está integrada desde el día uno — HTML semántico, optimización de Core Web Vitals, datos estructurados y tiempos de carga rápidos.",
  },
  "faq.q7": { en: "What does the handoff process look like?", es: "¿Cómo es el proceso de entrega?" },
  "faq.a7": {
    en: "You get a complete handoff package: documented codebase, CMS walkthrough, credentials, and a recorded Loom session covering everything.",
    es: "Recibes un paquete de entrega completo: código documentado, tutorial del CMS, credenciales y un video grabado cubriendo todo.",
  },
  "faq.q8": { en: "How many revisions are included?", es: "¿Cuántas revisiones incluyen?" },
  "faq.a8": {
    en: "Each milestone includes a structured feedback round. We work collaboratively so revisions are focused and efficient, not endless.",
    es: "Cada milestone incluye una ronda de retroalimentación estructurada. Trabajamos de forma colaborativa para que las revisiones sean enfocadas y eficientes.",
  },
  "faq.ownTitle": { en: "What you", es: "Lo que" },
  "faq.ownTitleAccent": { en: "own.", es: "es tuyo." },
  "faq.ownSubtitle": {
    en: "Everything we build is yours. No lock-in. No dependencies on us.",
    es: "Todo lo que construimos es tuyo. Sin ataduras. Sin dependencias.",
  },
  "faq.own1": { en: "Full source code & repository access", es: "Código fuente completo y acceso al repositorio" },
  "faq.own2": { en: "Design files (Figma) & brand assets", es: "Archivos de diseño (Figma) y assets de marca" },
  "faq.own3": { en: "Domain, hosting & third-party credentials", es: "Dominio, hosting y credenciales de terceros" },
  "faq.own4": { en: "CMS / admin access with training", es: "Acceso CMS / admin con capacitación" },
  "faq.own5": { en: "Technical documentation & handoff guide", es: "Documentación técnica y guía de entrega" },
  "faq.ownGuarantee": {
    en: "Clear handoff + documentation included with every project.",
    es: "Entrega clara + documentación incluida en cada proyecto.",
  },

  // ── Contact / Choose Your Path ──
  "contact.eyebrow": { en: "Contact", es: "Contacto" },
  "contact.title": { en: "CHOOSE YOUR PATH.", es: "ELIGE TU CAMINO." },
  "contact.subtitle": {
    en: "Tell us what you need. We respond within 24 hours.",
    es: "Cuéntanos qué necesitas. Respondemos en menos de 24 horas.",
  },
  "contact.path.website": { en: "I need a website", es: "Necesito un sitio web" },
  "contact.path.landing": { en: "I need a landing page", es: "Necesito una landing page" },
  "contact.path.ecommerce": { en: "I need an e-commerce store", es: "Necesito una tienda online" },
  "contact.path.system": { en: "I need a system / CRM", es: "Necesito un sistema / CRM" },
  "contact.path.seo": { en: "I need SEO", es: "Necesito SEO" },
  "contact.form.name": { en: "Your name *", es: "Tu nombre *" },
  "contact.form.email": { en: "Email *", es: "Email *" },
  "contact.form.message": { en: "Describe your project *", es: "Describe tu proyecto *" },
  "contact.form.send": { en: "Send", es: "Enviar" },
  "contact.form.sent": { en: "Sent — talk soon", es: "Enviado — hablamos pronto" },
  "contact.form.wait": { en: "Please wait", es: "Por favor espera" },
  "contact.form.waitDesc": { en: "You can submit again in a moment.", es: "Puedes enviar de nuevo en un momento." },
  "contact.form.success": { en: "Message sent!", es: "¡Mensaje enviado!" },
  "contact.form.successDesc": { en: "We'll respond within 24 hours.", es: "Responderemos en menos de 24 horas." },
  "contact.form.errorTitle": { en: "Couldn't send", es: "No se pudo enviar" },
  "contact.form.errorDesc": {
    en: "Please try WhatsApp or email us directly.",
    es: "Intenta por WhatsApp o envíanos un email directamente.",
  },
  "contact.whatsapp": { en: "Message us on WhatsApp", es: "Escríbenos por WhatsApp" },
  "contact.or": { en: "or", es: "o" },

  // ── Service Chooser Modal ──
  "modal.title": { en: "WHAT DO YOU NEED?", es: "¿QUÉ NECESITAS?" },
  "modal.subtitle": {
    en: "Pick one option to message us on WhatsApp.",
    es: "Elige una opción para escribirnos por WhatsApp.",
  },
  "modal.opensWA": { en: "OPENS WHATSAPP", es: "ABRE WHATSAPP" },
  "modal.s1": { en: "Corporate Website", es: "Sitio Corporativo" },
  "modal.s2": { en: "Sales Landing Page", es: "Landing Page de Ventas" },
  "modal.s3": { en: "Online Store (E-commerce)", es: "Tienda Online (E-commerce)" },
  "modal.s4": { en: "Booking / Reservations Website", es: "Web de Reservas / Citas" },
  "modal.s5": { en: "QR Digital Menu", es: "Menú Digital QR" },
  "modal.s6": { en: "Branding (Visual Identity)", es: "Branding (Identidad Visual)" },
  "modal.s7": { en: "SEO (Local + Technical Base)", es: "SEO (Local + Base Técnica)" },
  "modal.s8": { en: "CRM Setup / Implementation", es: "Configuración / Implementación CRM" },
  "modal.s9": { en: "Custom Software / SaaS", es: "Software a Medida / SaaS" },
  "modal.s10": { en: "Monthly Maintenance", es: "Mantenimiento Mensual" },
  "modal.s11": { en: "Not sure yet (help me choose)", es: "No estoy seguro (ayúdame a elegir)" },

  // ── Section Label Toast ──
  "toast.whatWeBuild": { en: "WHAT WE BUILD", es: "QUÉ HACEMOS" },
  "toast.howWeWork": { en: "HOW WE WORK", es: "CÓMO TRABAJAMOS" },
  "toast.growthImpact": { en: "GROWTH IMPACT", es: "IMPACTO" },
  "toast.ourProjects": { en: "OUR PROJECTS", es: "PROYECTOS" },
  "toast.letsTalk": { en: "LET'S TALK", es: "HABLEMOS" },

  // ── Footer ──
  "footer.services": { en: "Services", es: "Servicios" },
  "footer.work": { en: "Work", es: "Proyectos" },
  "footer.process": { en: "Process", es: "Proceso" },
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.tagline": { en: "Web Design • E-commerce • Systems", es: "Diseño Web • E-commerce • Sistemas" },
  "footer.rights": { en: "ALL RIGHTS RESERVED.", es: "TODOS LOS DERECHOS RESERVADOS." },

  // ── Sticky Mobile CTA ──
  "sticky.work": { en: "Work", es: "Proyectos" },

  // ── Misc ──
  "cta.bookStrategy": { en: "Book a Strategy Call", es: "Agendar Consultoría" },
  "cta.viewWork": { en: "View Work", es: "Ver Proyectos" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  const t = useCallback(
    (key: string): string => translations[key]?.[language] || key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
