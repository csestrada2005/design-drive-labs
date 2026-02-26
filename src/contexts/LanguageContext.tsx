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
    en: "We design and build websites and systems that help brands sell more — made to attract customers, rank on Google, and grow with you.",
    es: "Diseñamos y construimos sitios web y sistemas que ayudan a las marcas a vender más — hechos para atraer clientes, posicionar en Google y crecer contigo.",
  },
  "hero.bullet1": { en: "More customers buying", es: "Más clientes comprando" },
  "hero.bullet2": { en: "Built to rank on Google", es: "Hecho para posicionar en Google" },
  "hero.bullet3": { en: "Automated operations", es: "Operaciones automatizadas" },
  "hero.viewWork": { en: "View Work", es: "Ver Proyectos" },
  "hero.accepting": { en: "Accepting projects", es: "Aceptando proyectos" },
  "hero.delivered": { en: "Projects delivered", es: "Proyectos entregados" },
  "hero.response": { en: "24h response", es: "Respuesta en 24h" },

  // ── Services / What We Build ──
  "services.title": { en: "WHAT WE", es: "QUÉ" },
  "services.titleAccent": { en: "BUILD", es: "HACEMOS" },
  "services.subtitle": {
    en: "Three types of projects we do best. Use the dial to explore each one.",
    es: "Tres tipos de proyectos que hacemos mejor. Usa el dial para explorar cada uno.",
  },
  "services.tier": { en: "Tier", es: "Nivel" },
  "services.bestFor": { en: "Best for", es: "Ideal para" },
  "services.explore": { en: "Explore", es: "Explorar" },

  "services.ecommerce": { en: "E-commerce Websites", es: "Sitios E-commerce" },
  "services.ecommerce.cat": { en: "Premium Web", es: "Web Premium" },
  "services.ecommerce.bestFor": {
    en: "Brands selling directly to customers who want to sell more online.",
    es: "Marcas que venden directo al cliente y quieren vender más online.",
  },
  "services.ecommerce.f1": {
    en: "Product pages and checkout designed to turn visitors into buyers",
    es: "Páginas de producto y checkout diseñados para convertir visitantes en compradores",
  },
  "services.ecommerce.f2": {
    en: "Built to appear first on Google from day one",
    es: "Hecho para aparecer primero en Google desde el día uno",
  },
  "services.ecommerce.f3": {
    en: "Polished animations that make your brand feel trustworthy",
    es: "Animaciones profesionales que hacen que tu marca genere confianza",
  },

  "services.marketing": { en: "Fully Packed Websites", es: "Sitios Web Completos" },
  "services.marketing.cat": { en: "Web + Growth", es: "Web + Crecimiento" },
  "services.marketing.bestFor": {
    en: "Businesses that want to turn website visitors into real leads.",
    es: "Negocios que quieren convertir visitantes en clientes potenciales reales.",
  },
  "services.marketing.f1": {
    en: "Landing pages designed to capture interested customers",
    es: "Landing pages diseñadas para captar clientes interesados",
  },
  "services.marketing.f2": {
    en: "Blog and content manager with built-in strategy",
    es: "Blog y gestor de contenido con estrategia incluida",
  },
  "services.marketing.f3": {
    en: "Dashboards to track every click and result",
    es: "Paneles para rastrear cada clic y resultado",
  },

  "services.systems": { en: "Systems & Apps", es: "Sistemas y Aplicaciones" },
  "services.systems.cat": { en: "Full Product", es: "Producto Completo" },
  "services.systems.bestFor": {
    en: "Founders and teams looking to replace manual work with software.",
    es: "Fundadores y equipos que buscan reemplazar trabajo manual con software.",
  },
  "services.systems.f1": {
    en: "Custom client management tools, portals, and internal systems",
    es: "Herramientas de gestión de clientes, portales y sistemas internos a medida",
  },
  "services.systems.f2": {
    en: "AI features and automated messaging",
    es: "Funciones de inteligencia artificial y mensajería automatizada",
  },
  "services.systems.f3": {
    en: "Backends that grow with your business",
    es: "Backends que crecen con tu negocio",
  },

  // ── Design Lab ──
  "lab.title": { en: "DESIGN LAB", es: "LABORATORIO" },
  "lab.subtitle": {
    en: "Interactive pieces we build into our projects. Touch, click, and explore.",
    es: "Piezas interactivas que integramos en nuestros proyectos. Toca, haz clic y explora.",
  },
  "lab.glassSurface": { en: "GLASS PANEL", es: "PANEL DE CRISTAL" },
  "lab.glassSub": { en: "Move cursor to refract light", es: "Mueve el cursor para refractar la luz" },
  "lab.gridScan": { en: "GRID SCAN", es: "ESCANEO DE GRILLA" },
  "lab.gridScanHover": { en: "Hover to accelerate", es: "Pasa el cursor para acelerar" },
  "lab.gridScanAccel": { en: "ACCELERATING…", es: "ACELERANDO…" },
  "lab.imageTrail": { en: "IMAGE TRAIL", es: "RASTRO DE IMÁGENES" },
  "lab.imageTrailSub": { en: "Move cursor to create", es: "Mueve el cursor para crear" },
  "lab.imageTrailOff": { en: "Trail disabled", es: "Rastro desactivado" },
  "lab.magnet": { en: "MAGNETIC", es: "MAGNÉTICO" },
  "lab.magnetSub": { en: "Move cursor near the button", es: "Mueve el cursor cerca del botón" },
  "lab.magnetTap": { en: "Tap the button", es: "Toca el botón" },
  "lab.staggerMenu": { en: "STAGGERED MENU", es: "MENÚ ANIMADO" },
  "lab.staggerSub": { en: "Tap to open staggered menu", es: "Toca para abrir el menú animado" },
  "lab.navDemo": { en: "NAVIGATION DEMO", es: "DEMO DE NAVEGACIÓN" },
  "lab.cardSwap": { en: "CARD SWAP", es: "CARTAS ANIMADAS" },
  "lab.interactive": { en: "INTERACTIVE", es: "INTERACTIVO" },
  "lab.autoDemo": { en: "AUTO DEMO", es: "DEMO AUTO" },

  // Demo card configs
  "lab.demo.glass.title": { en: "GLASS SURFACE", es: "SUPERFICIE DE CRISTAL" },
  "lab.demo.glass.cat": { en: "Components", es: "Componentes" },
  "lab.demo.grid.title": { en: "GRID SCAN", es: "ESCANEO DE GRILLA" },
  "lab.demo.grid.cat": { en: "Backgrounds", es: "Fondos" },
  "lab.demo.trail.title": { en: "IMAGE TRAIL", es: "RASTRO DE IMÁGENES" },
  "lab.demo.trail.cat": { en: "Animations", es: "Animaciones" },
  "lab.demo.magnet.title": { en: "MAGNET", es: "IMÁN" },
  "lab.demo.magnet.cat": { en: "Animations", es: "Animaciones" },
  "lab.demo.stagger.title": { en: "STAGGERED MENU", es: "MENÚ ANIMADO" },
  "lab.demo.stagger.cat": { en: "Components", es: "Componentes" },
  "lab.demo.swap.title": { en: "CARD SWAP", es: "CARTAS ANIMADAS" },
  "lab.demo.swap.cat": { en: "Components", es: "Componentes" },

  // Card swap sub labels
  "lab.swap.strategy": { en: "STRATEGY", es: "ESTRATEGIA" },
  "lab.swap.strategySub": { en: "Research · Analysis · Direction", es: "Investigación · Análisis · Dirección" },
  "lab.swap.design": { en: "DESIGN", es: "DISEÑO" },
  "lab.swap.designSub": { en: "Visual · Motion · Identity", es: "Visual · Movimiento · Identidad" },
  "lab.swap.develop": { en: "DEVELOP", es: "DESARROLLO" },
  "lab.swap.developSub": { en: "Code · Deploy · Iterate", es: "Código · Lanzamiento · Iteración" },

  // Staggered menu items
  "lab.menu.projects": { en: "Projects", es: "Proyectos" },
  "lab.menu.about": { en: "About", es: "Nosotros" },
  "lab.menu.services": { en: "Services", es: "Servicios" },
  "lab.menu.process": { en: "Process", es: "Proceso" },
  "lab.menu.contact": { en: "Contact", es: "Contacto" },

  // ── Process / How we work ──
  "process.title": { en: "How we work.", es: "Cómo trabajamos." },
  "process.s1.num": { en: "01", es: "01" },
  "process.s1.title": { en: "Research & Strategy", es: "Investigación y Estrategia" },
  "process.s1.desc": {
    en: "We study your market, audience, and competitors to build a plan based on real data.",
    es: "Estudiamos tu mercado, audiencia y competencia para crear un plan basado en datos reales.",
  },
  "process.s2.num": { en: "02", es: "02" },
  "process.s2.title": { en: "User Experience Design", es: "Diseño de Experiencia" },
  "process.s2.desc": {
    en: "We organize your site so visitors find what they need easily and take action.",
    es: "Organizamos tu sitio para que los visitantes encuentren lo que necesitan fácilmente y actúen.",
  },
  "process.s3.num": { en: "03", es: "03" },
  "process.s3.title": { en: "Visual Design", es: "Diseño Visual" },
  "process.s3.desc": {
    en: "A polished look and feel that's consistent, fast, and makes your brand stand out.",
    es: "Una apariencia profesional que es consistente, rápida y hace que tu marca destaque.",
  },
  "process.s4.num": { en: "04", es: "04" },
  "process.s4.title": { en: "Build & Connect", es: "Desarrollo y Conexiones" },
  "process.s4.desc": {
    en: "Clean code, smooth animations, and all the tools you need — delivered fast.",
    es: "Código limpio, animaciones fluidas y todas las herramientas que necesitas — entregado rápido.",
  },
  "process.s5.num": { en: "05", es: "05" },
  "process.s5.title": { en: "Launch & Improve", es: "Lanzamiento y Mejora" },
  "process.s5.desc": {
    en: "We track results, test what works, and keep improving after your site goes live.",
    es: "Rastreamos resultados, probamos qué funciona y seguimos mejorando después del lanzamiento.",
  },

  // ── Growth Impact ──
  "growth.title": { en: "GROWTH IMPACT", es: "IMPACTO EN CRECIMIENTO" },
  "growth.subtitle": {
    en: "We don't make \"pretty pages.\" We build tools that sell. These are real numbers on how good design drives business growth.",
    es: "No hacemos \"páginas bonitas\". Construimos herramientas que venden. Estos son números reales de cómo el buen diseño impulsa el crecimiento.",
  },
  "growth.holdReveal": { en: "Hold to see the data", es: "Mantén presionado para ver los datos" },
  "growth.m1.label": { en: "First Impressions", es: "Primera Impresión" },
  "growth.m1.sub": { en: "Shaped by how your website looks and feels", es: "Definida por cómo se ve y se siente tu sitio web" },
  "growth.m2.label": { en: "More Sales", es: "Más Ventas" },
  "growth.m2.sub": { en: "With professional user experience design", es: "Con diseño profesional de experiencia de usuario" },
  "growth.m3.label": { en: "Longer Visits", es: "Visitas Más Largas" },
  "growth.m3.sub": { en: "When your site has quality visuals and content", es: "Cuando tu sitio tiene contenido visual de calidad" },
  "growth.m4.label": { en: "Brand Trust", es: "Confianza de Marca" },
  "growth.m4.sub": { en: "People trust brands with polished, professional sites", es: "La gente confía en marcas con sitios profesionales y pulidos" },
  "growth.chartLine": { en: "Sales Rate Over Time (%)", es: "Tasa de Ventas en el Tiempo (%)" },
  "growth.chartBar": { en: "Visitor-to-Customer Rate (%)", es: "Tasa de Visitante a Cliente (%)" },
  "growth.chartBefore": { en: "Before", es: "Antes" },
  "growth.roiTitle": { en: "Good Design Costs Money.", es: "El Buen Diseño Cuesta Dinero." },
  "growth.roiAccent": { en: "Bad Design Costs Revenue.", es: "El Mal Diseño Cuesta Ingresos." },
  "growth.roiDesc": {
    en: "See what your revenue looks like now — and what it could look like with our design and technology working for you.",
    es: "Mira cómo se ve tu ingreso ahora — y cómo podría verse con nuestro diseño y tecnología trabajando para ti.",
  },
  "growth.roiCurrent": { en: "Current Revenue", es: "Ingreso Actual" },
  "growth.roiProjected": { en: "Projected Value With Us", es: "Valor Proyectado Con Nosotros" },
  "growth.roiNote": {
    en: "Revenue grows faster with good design and technology",
    es: "Los ingresos crecen más rápido con buen diseño y tecnología",
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
  "standards.title": { en: "WHAT YOU ALWAYS GET.", es: "LO QUE SIEMPRE RECIBES." },
  "standards.subtitle": { en: "Every project includes these features, guaranteed.", es: "Cada proyecto incluye estas características, garantizado." },
  "standards.s1.label": { en: "Mobile-First", es: "Primero Móvil" },
  "standards.s1.desc": {
    en: "Every element is designed to work perfectly on phones first, then scales up to bigger screens.",
    es: "Cada elemento está diseñado para funcionar perfecto en teléfonos primero, luego escala a pantallas más grandes.",
  },
  "standards.s2.label": { en: "Speed & Performance", es: "Velocidad y Rendimiento" },
  "standards.s2.desc": {
    en: "Your site loads in under 2 seconds with optimized files and fast performance scores.",
    es: "Tu sitio carga en menos de 2 segundos con archivos optimizados y puntajes de rendimiento altos.",
  },
  "standards.s3.label": { en: "Built to Sell More", es: "Hecho para Vender Más" },
  "standards.s3.desc": {
    en: "Clear layout, trust signals, and smooth flow designed to turn visitors into customers.",
    es: "Diseño claro, señales de confianza y flujo suave diseñado para convertir visitantes en clientes.",
  },
  "standards.s4.label": { en: "Clean Handoff", es: "Entrega Limpia" },
  "standards.s4.desc": {
    en: "You get the keys. Full documentation, nothing hidden. It's all yours.",
    es: "Tú recibes las llaves. Documentación completa, nada oculto. Todo es tuyo.",
  },

  // ── FAQ ──
  "faq.eyebrow": { en: "Common questions", es: "Preguntas frecuentes" },
  "faq.title": { en: "Before you", es: "Antes de" },
  "faq.titleAccent": { en: "decide.", es: "decidir." },
  "faq.subtitle": { en: "Straight answers. No fluff.", es: "Respuestas directas. Sin relleno." },
  "faq.q1": { en: "How much does a project cost?", es: "¿Cuánto cuesta un proyecto?" },
  "faq.a1": {
    en: "Every project is priced individually. We send you a detailed proposal after a free strategy call — no surprises, no hidden fees.",
    es: "Cada proyecto se cotiza individualmente. Te enviamos una propuesta detallada después de una llamada gratuita — sin sorpresas ni costos ocultos.",
  },
  "faq.q2": { en: "How long does a project take?", es: "¿Cuánto tiempo toma un proyecto?" },
  "faq.a2": {
    en: "Most projects launch in 4–8 weeks depending on size. We set clear milestones from the start so you always know where things stand.",
    es: "La mayoría de los proyectos se lanzan en 4–8 semanas según el tamaño. Establecemos metas claras desde el inicio para que siempre sepas cómo va todo.",
  },
  "faq.q3": { en: "What tools do you use?", es: "¿Qué herramientas usan?" },
  "faq.a3": {
    en: "We build with modern, proven tools — React, Next.js, Tailwind, Shopify, and custom backends. We choose what fits your goals, not what's trendy.",
    es: "Construimos con herramientas modernas y probadas — React, Next.js, Tailwind, Shopify y backends personalizados. Elegimos lo que se ajusta a tus metas, no lo que está de moda.",
  },
  "faq.q4": { en: "Do I own everything at the end?", es: "¿Soy dueño de todo al final?" },
  "faq.a4": {
    en: "Yes. Code, design files, images, domain access, and documentation — it's all yours. No lock-in, no strings attached.",
    es: "Sí. Código, archivos de diseño, imágenes, acceso al dominio y documentación — todo es tuyo. Sin ataduras.",
  },
  "faq.q5": { en: "Do you offer support after launch?", es: "¿Ofrecen soporte después del lanzamiento?" },
  "faq.a5": {
    en: "Yes! We offer post-launch support plans and are always available for updates. Most clients stay for ongoing improvements — but it's never required.",
    es: "¡Sí! Ofrecemos planes de soporte post-lanzamiento y siempre estamos disponibles para actualizaciones. La mayoría de los clientes se quedan para mejoras continuas — pero nunca es obligatorio.",
  },
  "faq.q6": { en: "Will my site show up on Google?", es: "¿Mi sitio aparecerá en Google?" },
  "faq.a6": {
    en: "Absolutely. We build every site to rank on Google from day one — clean code, fast loading, proper structure, and search-friendly setup included.",
    es: "Absolutamente. Construimos cada sitio para posicionar en Google desde el día uno — código limpio, carga rápida, estructura correcta y configuración amigable para buscadores incluida.",
  },
  "faq.q7": { en: "What do I get when the project is done?", es: "¿Qué recibo cuando termina el proyecto?" },
  "faq.a7": {
    en: "You get everything: documented code, a walkthrough of your admin panel, all passwords, and a recorded video explaining how it all works.",
    es: "Recibes todo: código documentado, un recorrido de tu panel de administración, todas las contraseñas y un video grabado explicando cómo funciona todo.",
  },
  "faq.q8": { en: "How many changes can I request?", es: "¿Cuántos cambios puedo solicitar?" },
  "faq.a8": {
    en: "Each phase includes a feedback round. We work closely with you so changes are focused and efficient — not endless back-and-forth.",
    es: "Cada fase incluye una ronda de retroalimentación. Trabajamos de cerca contigo para que los cambios sean enfocados y eficientes — sin ir y venir sin fin.",
  },
  "faq.ownTitle": { en: "What you", es: "Lo que" },
  "faq.ownTitleAccent": { en: "own.", es: "es tuyo." },
  "faq.ownSubtitle": {
    en: "Everything we build is yours. No lock-in. You never depend on us.",
    es: "Todo lo que construimos es tuyo. Sin ataduras. Nunca dependes de nosotros.",
  },
  "faq.own1": { en: "Full code and access to your project files", es: "Código completo y acceso a los archivos de tu proyecto" },
  "faq.own2": { en: "Design files (Figma) and brand images", es: "Archivos de diseño (Figma) e imágenes de marca" },
  "faq.own3": { en: "Domain, hosting, and all login credentials", es: "Dominio, hosting y todas las credenciales de acceso" },
  "faq.own4": { en: "Admin panel access with training", es: "Acceso al panel de administración con capacitación" },
  "faq.own5": { en: "Documentation and handoff guide", es: "Documentación y guía de entrega" },
  "faq.ownGuarantee": {
    en: "Clean handoff + documentation included with every project.",
    es: "Entrega limpia + documentación incluida en cada proyecto.",
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
  "contact.path.ecommerce": { en: "I need an online store", es: "Necesito una tienda online" },
  "contact.path.system": { en: "I need a custom system", es: "Necesito un sistema a medida" },
  "contact.path.seo": { en: "I need to rank on Google", es: "Necesito posicionar en Google" },
  "contact.form.name": { en: "Your name *", es: "Tu nombre *" },
  "contact.form.email": { en: "Email *", es: "Email *" },
  "contact.form.message": { en: "Tell us about your project *", es: "Cuéntanos sobre tu proyecto *" },
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
  "modal.s1": { en: "Business Website", es: "Sitio Web Empresarial" },
  "modal.s2": { en: "Sales Landing Page", es: "Landing Page de Ventas" },
  "modal.s3": { en: "Online Store", es: "Tienda Online" },
  "modal.s4": { en: "Booking / Reservations Site", es: "Sitio de Reservas / Citas" },
  "modal.s5": { en: "QR Digital Menu", es: "Menú Digital QR" },
  "modal.s6": { en: "Branding (Visual Identity)", es: "Branding (Identidad Visual)" },
  "modal.s7": { en: "Google Ranking (SEO)", es: "Posicionamiento en Google (SEO)" },
  "modal.s8": { en: "Client Management System (CRM)", es: "Sistema de Gestión de Clientes (CRM)" },
  "modal.s9": { en: "Custom Software", es: "Software a Medida" },
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
  "footer.tagline": { en: "Web Design • Online Stores • Systems", es: "Diseño Web • Tiendas Online • Sistemas" },
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
