/**
 * Perla Suite · Frontend Architecture & Micro-Interactions Engine
 * - Radial Cursor Spotlight Tracking (requestAnimationFrame, zero DOM thrashing)
 * - Instant Full-Page Bilingual Engine (ES <-> EN)
 * - IntersectionObserver Staggered Reveal Transitions
 * - Executive Conversion Command Console (Scale Selector + Token Generation)
 * - Segmented Transformation Inspector ("Antes y Después")
 * - 40+ PMS Command-Palette Live Filter
 * - Multi-Brand Portfolio Discount Configurator
 */

document.addEventListener("DOMContentLoaded", () => {
  const refreshLucideIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  /* ==========================================================================
     1. DARK / LIGHT MODE & BILINGUAL (ES / EN) STATE
     ========================================================================== */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const langToggleBtn = document.getElementById("langToggle");
  const langEsBadge = document.getElementById("langEsBadge");
  const langEnBadge = document.getElementById("langEnBadge");

  let currentLang = localStorage.getItem("perla_lang") || "es";
  const savedTheme = localStorage.getItem("perla_theme") || "dark";

  function updateThemeLabel() {
    if (!themeLabel) return;
    const currentTheme = htmlEl.getAttribute("data-theme") || "dark";
    if (currentLang === "en") {
      themeLabel.textContent = currentTheme === "dark" ? "Light" : "Dark";
    } else {
      themeLabel.textContent = currentTheme === "dark" ? "Claro" : "Oscuro";
    }
  }

  function setTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("perla_theme", theme);
    updateThemeLabel();
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ==========================================================================
     2. FULL-PAGE INSTANT TRANSLATION ENGINE (ES <-> EN)
     ========================================================================== */
  const esToEnDictionary = {
    // Navbar & CTA
    "Inicio": "Home",
    "Visión": "Vision",
    "Transformación": "Transformation",
    "PMS (+40)": "PMS (40+)",
    "Roadmap": "Roadmap",
    "Modelo": "Pricing",
    "Soberanía & Equipo": "Sovereignty & Team",
    "Solicitar Acceso Beta": "Request Beta Access",
    "Solicitar acceso al Beta Privado": "Request Private Beta Access",
    "Solicitar Acceso al Beta Privado": "Request Private Beta Access",

    // Section 1: Hero & Command Console
    "BETA PRIVADO · ARQUITECTURA LEAN-EDGE": "PRIVATE BETA · LEAN-EDGE ARCHITECTURE",
    "La inteligencia hotelera que tu región esperaba.": "The hospitality intelligence your region was waiting for.",
    "Más rápida. Más cercana. Diseñada para multiplicar tus ingresos directos.": "Faster. Closer. Engineered to multiply your direct revenue.",
    "Reclama el control de tu información y transforma la experiencia de tus visitantes en un motor constante de reservas directas.": "Reclaim ownership of your guest data and turn every stay into a continuous direct-booking engine.",
    "Perla Suite es la solución de Guest Intelligence creada para responder a las verdaderas necesidades de la hospitalidad en nuestra región. Impulsada por una arquitectura Lean-Edge ultra-rápida, unificamos en tiempo real la información dispersa de tus huéspedes, interceptamos eventualidades en la propiedad antes del check-out y monetizamos la lealtad de tu comunidad con respuestas en submilisegundos y cero costos inflados por habitación.": "Perla Suite is the Guest Intelligence platform built for the real operational demands of regional hospitality. Powered by an ultra-fast Lean-Edge architecture, we unify fragmented guest profiles in real time, intercept on-property issues before check-out, and monetize guest loyalty with sub-millisecond response times and zero per-room fee penalties.",
    "CONSOLA DE DESPLIEGUE · PASE FUNDADOR BETA PRIVADO ($0)": "DEPLOYMENT CONSOLE · PRIVATE BETA FOUNDER PASS ($0)",
    "Beneficio exclusivo primeros hoteles:": "Exclusive early-adopter benefit:",
    "50% de descuento de por vida": "50% lifetime discount",
    "· Cupos limitados por región": "· Limited spots per region",
    "CORREO CORPORATIVO DE LA PROPIEDAD": "PROPERTY CORPORATE EMAIL",
    "ESCALA DE OPERACIÓN": "OPERATION SCALE",
    "1 Propiedad": "1 Property",
    "2–4 Propiedades": "2–4 Properties",
    "Cadena 5+": "5+ Chain",
    "Ultra-rápido:": "Ultra-fast:",
    "Carga de tableros y análisis en submilisegundos gracias a nuestra tecnología ligera.": "Sub-millisecond dashboard & analytics loading powered by our lightweight Lean-Edge stack.",
    "Soberanía de Datos:": "Data Sovereignty:",
    "Tus datos de huéspedes te pertenecen a ti, no a silos de terceros.": "Your guest records belong exclusively to you—never locked in third-party silos.",
    "100% libre de spam:": "100% spam-free:",
    "Puedes cancelar tu solicitud en cualquier momento.": "You can cancel your request at any time.",

    // Hero Bento Telemetry
    "CORE CDP · RESOLUCIÓN DE IDENTIDAD OTA": "CORE CDP · OTA IDENTITY RESOLUTION",
    "LATENCIA MOTOR:": "ENGINE LATENCY:",
    "De correos enmascarados a relaciones directas de alto valor": "From masked OTA aliases to high-value direct guest relationships",
    "Desenmascaramiento automático de alias de agencias y consolidación del historial de consumo (PMS, Spa, A&B) en un único registro maestro.": "Automated unmasking of OTA proxy emails and consolidation of total guest spend (PMS, Spa, F&B) into a single golden profile.",
    "ENTRADA OTA ENMASCARADA": "MASKED OTA INPUT",
    "Comisión OTA: 18%–25% · Sin contacto post-estadía": "OTA Commission: 18%–25% · Zero post-stay contact",
    "PERFIL ÚNICO ENRIQUECIDO": "ENRICHED GOLDEN PROFILE",
    "VIP Oro · 4 Estadías": "Gold VIP · 4 Stays",
    "Canal Directo Activo": "Direct Channel Active",
    "INTERCEPCIÓN EN PROPIEDAD · IN-STAY": "ON-PROPERTY INTERCEPTION · IN-STAY",
    "Tiempo de respuesta analítica y detección preventiva vía WhatsApp antes del check-out.": "Analytical response time and preventive WhatsApp issue detection before check-out.",
    "Habitación 308 · Detección A&B / Clima": "Room 308 · F&B / HVAC Detection",
    "Resuelto pre-checkout": "Resolved pre-checkout",
    "Alerta enviada a recepción 36h antes de que el huésped publique en TripAdvisor o Google.": "Alert dispatched to front desk 36h before the guest posts a review on TripAdvisor or Google.",

    // Section 2: Visión y Misión
    "02 / VISIÓN Y MISIÓN CORPORATIVA": "02 / CORPORATE VISION & MISSION",
    "Nacida en la Isla de Margarita.": "Born in Margarita Island.",
    "Construida para la soberanía hotelera regional.": "Built for regional hospitality sovereignty.",
    "Democratizamos la inteligencia de datos corporativa para que hoteles, posadas y cadenas compitan al más alto estándar internacional sin ceder la propiedad de su información.": "We democratize enterprise data intelligence so hotels, boutique inns, and chains compete at the highest global standard without surrendering ownership of their data.",
    "02.1 · NUESTRA MISIÓN": "02.1 · OUR MISSION",
    "“Nacida de la esencia turística de la isla de Margarita para todo el mercado de la hospitalidad, nuestra misión es democratizar el acceso a la inteligencia de datos y a la analítica corporativa. Empoderamos a hoteles, posadas y operadores locales para unificar la información de sus clientes, proteger activamente su reputación en tiempo real y transformar datos dispersos en ingresos directos, elevando el estándar de nuestra hospitalidad regional frente al mundo.”": "“Born from the tourism essence of Margarita Island for the entire hospitality market, our mission is to democratize access to data intelligence and corporate analytics. We empower hotels, inns, and local operators to unify guest information, actively protect their reputation in real time, and turn scattered data into direct revenue—elevating regional hospitality standards worldwide.”",
    "ORIGEN: ISLA DE MARGARITA": "ORIGIN: MARGARITA ISLAND",
    "ENFOQUE: INGRESOS DIRECTOS & REPUTACIÓN": "FOCUS: DIRECT REVENUE & REPUTATION",
    "02.2 · NUESTRA VISIÓN": "02.2 · OUR VISION",
    "“Ser la plataforma de inteligencia de huéspedes y gestión de reputación líder y de mayor confianza en la región, posicionando a Perla Host como el motor tecnológico indispensable para que el ecosistema turístico local compita al más alto nivel internacional con soberanía de datos, eficiencia radical y servicio de excelencia.”": "“To be the region's leading and most trusted guest intelligence and reputation management platform, positioning Perla Host as the indispensable technology engine for the local tourism ecosystem to compete at the highest international level with data sovereignty, radical efficiency, and service excellence.”",
    "MOTOR: PERLA HOST": "ENGINE: PERLA HOST",
    "ESTÁNDAR: SOBERANÍA & EFICIENCIA RADICAL": "STANDARD: SOVEREIGNTY & RADICAL EFFICIENCY",

    // Section 3: Ventaja Competitiva
    "03 / VENTAJA COMPETITIVA": "03 / COMPETITIVE ADVANTAGE",
    "El \"Antes y Después\":": "The \"Before & After\":",
    "Transformación Operativa Real.": "Real Operational Transformation.",
    "MODO DE INSPECCIÓN": "INSPECTION MODE",
    "Contraste Directo": "Side-by-Side Contrast",
    "Métodos Rígidos (Antes)": "Legacy Methods (Before)",
    "Con Perla Suite (Después)": "With Perla Suite (After)",
    "Gestión de la Información": "Information Management",
    "Resolución de Identidad & CDP": "Identity Resolution & CDP",
    "EL \"ANTES\" · MÉTODOS TRADICIONALES Y SOFTWARE RÍGIDO": "THE \"BEFORE\" · LEGACY METHODS & RIGID SOFTWARE",
    "EL \"DESPUÉS\" · CON PERLA SUITE": "THE \"AFTER\" · WITH PERLA SUITE",
    "Perfiles de huéspedes fragmentados entre el PMS, spa y restaurantes, con correos enmascarados de OTAs (": "Guest profiles fragmented across PMS, spa, and restaurants, with masked OTA emails (",
    ") que impiden el contacto posterior.": ") that block post-stay communication.",
    "Perfil Único de Huésped (Rich Guest Profile):": "Unified Golden Guest Profile (Rich Guest Profile):",
    "Unificación automática de historiales, desenmascaramiento de correos de OTAs y resolución de identidad mediante inteligencia de datos.": "Automated history consolidation, OTA proxy email unmasking, and data-driven identity resolution.",
    "Protección de la Reputación": "Reputation Protection",
    "Intercepción In-Stay (12h)": "In-Stay Interception (12h)",
    "El gerente se entera de una mala experiencia días después, cuando el cliente publica una reseña negativa en TripAdvisor o Google.": "Management learns about a bad stay days later, after the guest posts a negative public review on TripAdvisor or Google.",
    "Intercepción Activa en la Propiedad:": "Active On-Property Interception:",
    "Encuestas automáticas por WhatsApp a las 12 horas del check-in que detectan quejas y alertan al equipo para resolverlas antes del check-out.": "Automated WhatsApp micro-surveys 12 hours after check-in that detect friction and alert staff to resolve issues before check-out.",
    "Estrategia de Marketing": "Marketing Strategy",
    "+100 Atributos de Segmentación": "100+ Segmentation Attributes",
    "Campañas masivas e impersonales dirigidas a bases de datos sucias, generando bajas tasas de apertura y dependencia constante de comisiones de OTAs.": "Impersonal mass blasts sent to unverified databases, yielding low open rates and permanent reliance on costly OTA commissions.",
    "Audiencias Hiper-Segmentadas:": "Hyper-Segmented Audiences:",
    "Creación de públicos rentables utilizando más de 100 atributos (gasto histórico, hábitos de consumo, lealtad) para activar campañas directas de alto ROI.": "Build high-converting audiences using 100+ attributes (historical spend, stay habits, loyalty tier) to trigger high-ROI direct campaigns.",
    "Análisis de Oportunidades": "Opportunity Analytics",
    "NLP por Departamento": "Departmental NLP",
    "Lectura manual de cientos de opiniones en internet sin poder priorizar los departamentos que afectan la satisfacción del cliente.": "Manual reading of hundreds of online reviews without clear prioritization of which departments impact guest satisfaction.",
    "Analítica de Sentimiento por Departamento:": "Departmental Sentiment Analytics:",
    "Clasificación automática de comentarios (A&B, Limpieza, Recepción) para corregir cuellos de botella operativos en tiempo récord.": "Automated classification of guest feedback (F&B, Housekeeping, Front Desk) to eliminate operational bottlenecks in record time.",

    // Benchmark Table
    "BENCHMARK TÉCNICO Y COMERCIAL": "TECHNICAL & COMMERCIAL BENCHMARK",
    "Tabla Comparativa de Capacidades Competitivas": "Competitive Capabilities Comparison Matrix",
    "Compara las ventajas técnicas y comerciales de nuestra plataforma frente a los métodos tradicionales y las suites convencionales del mercado:": "Compare the technical and commercial advantages of our platform against manual spreadsheets and legacy hospitality suites:",
    "Capacidad / Función": "Capability / Function",
    "Métodos Tradicionales / Hojas de Cálculo": "Manual Methods / Spreadsheets",
    "Suites Tradicionales": "Legacy Enterprise Suites",
    "Perla Suite (Nuestra Plataforma)": "Perla Suite (Our Platform)",
    "Modelo Comercial y Precios": "Commercial & Pricing Model",
    "Procesos manuales no escalables": "Unscalable manual workflows",
    "Licencias costosas y penalizaciones por número de habitaciones.": "Expensive licenses and per-room count penalties.",
    "Esquema Corporativo por Portafolio:": "Portfolio-Based Corporate Model:",
    "Tarifa plana que incluye descuentos progresivos por cada propiedad sumada a tu cadena.": "Flat rate with progressive multi-property discounts for every hotel added to your group.",
    "Soberanía de Datos": "Data Sovereignty",
    "Vulnerable y descentralizada": "Vulnerable and decentralized",
    "Datos atrapados en silos de proveedores externos (Vendor Lock-in).": "Data trapped in external vendor silos (Vendor Lock-in).",
    "Soberanía Absoluta:": "Absolute Sovereignty:",
    "Control total de la base de datos alojada en la infraestructura propia del grupo hotelero.": "Full ownership of the guest database hosted on the hotel group's dedicated infrastructure.",
    "Rendimiento Tecnológico": "Technological Performance",
    "Consultas lentas en la nube con altos tiempos de respuesta.": "Slow cloud queries with high response latency.",
    "Arquitectura Lean-Edge:": "Lean-Edge Architecture:",
    "Carga ultra-rápida de paneles y análisis en submilisegundos (": "Ultra-fast dashboard rendering and sub-millisecond analytics (",
    "Unificación de Datos OTAs": "OTA Data Unification",
    "Imposible de gestionar": "Impossible to manage manually",
    "Módulos complejos o con costos adicionales.": "Complex add-on modules with extra fees.",
    "Integración Nativa:": "Native Integration:",
    "Unificación automática de perfiles y desenmascaramiento de correos ocultos de agencias.": "Automated profile deduplication and unmasking of hidden OTA proxy emails.",
    "Gestión de Incidencias": "Incident Management",
    "Reacción pasiva tras el checkout": "Passive reaction after check-out",
    "Reportes post-estadía cuando la mala reseña ya es pública.": "Post-stay reports after a negative review is already public.",
    "Intercepción Activa:": "Active Interception:",
    "Alertas en la propiedad durante la estadía para solucionar quejas antes de la salida del huésped.": "On-property real-time alerts during the stay to resolve complaints before guest departure.",
    "Enfoque Regional": "Regional Focus",
    "Genérico": "Generic",
    "Diseñado para estándares rígidos de mercados internacionales.": "Built for rigid foreign market templates.",
    "Optimizado para Nuestra Región:": "Optimized for Our Region:",
    "Adaptado a las dinámicas operativas y necesidades comerciales locales.": "Tailored to local operational dynamics and regional commercial realities.",

    // Section 4: PMS Ecosystem
    "04 / ECOSISTEMA DE CONEXIONES (INTEGRATIONS & PMS)": "04 / INTEGRATION ECOSYSTEM (PMS & ERP)",
    "Conéctate en minutos con tus sistemas operativos existentes.": "Connect in minutes with your existing property systems.",
    "Sin fricciones ni interrupciones en tu recepción. Nuestra tecnología Lean-Edge se integra de forma nativa e indirecta con las soluciones PMS más desplegadas en la región.": "Zero friction or front-desk disruption. Our Lean-Edge technology integrates natively and seamlessly with the most widely deployed PMS solutions in the region.",
    "API NATIVO": "NATIVE API",
    "HÍBRIDO": "HYBRID",
    "Especializado en Alojamiento Híbrido": "Specialized in Hybrid Hospitality",
    "Conectores Regionales LATAM": "LATAM Regional Connectors",
    "Explorar matriz completa": "Explore full matrix",
    "DIRECTORIO DE HOMOLOGACIÓN · 40 SISTEMAS PMS & ERP HOTELEROS": "CERTIFIED DIRECTORY · 40 HOSPITALITY PMS & ERP SYSTEMS",

    // Section 5: Roadmap
    "05 / EVOLUCIÓN DEL PRODUCTO (PUBLIC ROADMAP)": "05 / PRODUCT EVOLUTION (PUBLIC ROADMAP)",
    "Ingeniería Evolutiva Hacia el Canal Directo Propio.": "Evolutionary Engineering Toward Your Own Direct Channel.",
    "Cada trimestre desbloquea una nueva capa de rentabilidad: desde la limpieza e identidad de datos hasta la desintermediación de las OTAs.": "Each quarter unlocks a new layer of profitability: from data cleansing and identity resolution to full OTA disintermediation.",
    "FASE 01 · Q1": "PHASE 01 · Q1",
    "2-3 semanas": "2–3 weeks",
    "MÓDULO BASE ACTIVO": "CORE MODULE ACTIVE",
    "Integración Activa:": "Active Integration:",
    "Conexión nativa y lista con sistemas PMS para la ingesta de datos.": "Production-ready native connection with PMS platforms for real-time data ingestion.",
    "Resolución de Identidad:": "Identity Resolution:",
    "Unificación automática de registros duplicados y desenmascaramiento de correos electrónicos ocultos de las OTAs.": "Automated deduplication of guest records and unmasking of hidden OTA proxy emails.",
    "Perfiles Enriquecidos:": "Enriched Profiles:",
    "Consolidación del historial de los huéspedes en un único perfil centralizado.": "Consolidation of complete guest stay history into a single centralized profile.",
    "FASE 02 · Q2": "PHASE 02 · Q2",
    "4-6 Semanas": "4–6 Weeks",
    "PRÓXIMAMENTE · EN DESARROLLO": "COMING SOON · IN DEVELOPMENT",
    "Bandeja de Entrada Unificada:": "Unified Review Inbox:",
    "Consolidación de reseñas públicas (Google, TripAdvisor, Booking.com) en un solo panel.": "Centralization of public reviews (Google, TripAdvisor, Booking.com) into one command panel.",
    "Intercepción en Tiempo Real:": "Real-Time Interception:",
    "Envío de encuestas vía WhatsApp para detectar y resolver quejas en la propiedad antes del checkout.": "Automated WhatsApp surveys to detect and resolve on-property complaints before check-out.",
    "Análisis de Sentimiento:": "Sentiment Analysis:",
    "Clasificación automática de los comentarios por departamentos (Limpieza, A&B, Recepción) para detectar cuellos de botella.": "Automated categorization of feedback by department (Housekeeping, F&B, Front Desk) to pinpoint bottlenecks.",
    "FASE 03 · Q3": "PHASE 03 · Q3",
    "3-4 Semanas": "3–4 Weeks",
    "PLANIFICADO": "PLANNED",
    "Segmentación Hiper-Targeteada:": "Hyper-Targeted Segmentation:",
    "Creación de audiencias rentables utilizando más de 100 atributos (gasto histórico, hábitos de reserva, lealtad).": "Creation of high-margin audiences using 100+ attributes (historical spend, booking habits, loyalty).",
    "Campañas Automatizadas:": "Automated Campaigns:",
    "Secuencias de mensajes automatizados (ofertas pre-llegada, recuperación de clientes) a través del canal preferido del huésped.": "Automated messaging flows (pre-arrival upsells, win-back campaigns) via the guest's preferred channel.",
    "Niveles de Lealtad Dinámicos:": "Dynamic Loyalty Tiers:",
    "Asignación de insignias (VIP, Gold) basadas en el gasto total acumulado en la propiedad y consumos extra.": "Automatic badge assignment (VIP, Gold) based on cumulative property spend and ancillary consumption.",
    "FASE 04 · LARGO PLAZO": "PHASE 04 · LONG TERM",
    "Fase de Escalamiento": "Scaling Phase",
    "VISIÓN ESTRATÉGICA": "STRATEGIC VISION",
    "Canal Directo (Motor OTA Propio)": "Direct Channel (Proprietary Booking Engine)",
    "Evolución Comercial:": "Commercial Evolution:",
    "Transformación de la plataforma de inteligencia en un motor integral de reservas directas.": "Transformation of the intelligence platform into a full-scale direct booking engine.",
    "Desintermediación:": "OTA Disintermediation:",
    "Capacidad para que los hoteles ofrezcan inventario y gestionen reservas sin depender de las altas comisiones de las agencias de viaje tradicionales (OTAs).": "Empowering hotels to offer inventory and manage bookings without relying on high traditional OTA commissions.",
    "Ecosistema Cerrado:": "Closed-Loop Ecosystem:",
    "Unificación total del ciclo del huésped (captación directa, gestión de estadía, analítica y retención).": "Complete unification of the guest lifecycle (direct acquisition, in-stay management, analytics, and retention).",

    // Section 6: Modelo Comercial
    "06 / MODELO COMERCIAL (PRICING & SCALABILITY)": "06 / COMMERCIAL MODEL (PRICING & SCALABILITY)",
    "Tarifa Plana por Portafolio.": "Flat Portfolio Pricing.",
    "Cero Castigos por Habitaciones.": "Zero Per-Room Penalties.",
    "Evalúa Perla Suite en tu propiedad sin ningún compromiso financiero durante la fase Beta y bloquea el descuento vitalicio de fundador.": "Evaluate Perla Suite at your property with zero financial commitment during the Beta phase and lock in your lifetime founder discount.",
    "FASE 1 · BETA PRIVADO & PRUEBA DE CONCEPTO": "PHASE 1 · PRIVATE BETA & PROOF OF CONCEPT",
    "CONVOCATORIA ABIERTA": "OPEN ENROLLMENT",
    "Licencia de Evaluación Beta": "Beta Evaluation License",
    "Prueba la plataforma en tu propiedad sin ningún compromiso financiero.": "Test the platform in your property with zero financial commitment.",
    "Acceso de Evaluación ($0):": "Evaluation Access ($0):",
    "Conecta tus sistemas y evalúa la potencia de la plataforma durante la fase inicial de lanzamiento sin costo de licencia.": "Connect your systems and evaluate the full power of the platform during the initial launch phase at zero license cost.",
    "Integración PMS Básica:": "Core PMS Integration:",
    "Ingesta y limpieza inicial de la base de datos de tus huéspedes en un entorno seguro.": "Initial ingestion and cleansing of your guest database in an isolated, secure environment.",
    "Centralización de Reseñas:": "Review Centralization:",
    "Unificación de comentarios públicos y muestreo de análisis de sentimiento por departamentos.": "Unification of public reviews and departmental sentiment analysis sampling.",
    "Intercepción en Propiedad:": "On-Property Interception:",
    "Activación de pruebas de mensajería para solucionar eventualidades antes del check-out.": "Activation of live messaging flows to resolve guest issues prior to check-out.",
    "INCENTIVO EXCLUSIVO PARA CLIENTES FUNDADORES": "EXCLUSIVE INCENTIVE FOR FOUNDING HOTELS",
    "Cupos limitados por región": "Limited spots per region",
    "Oferta de Lanzamiento: Descuento de Por Vida": "Launch Offer: Lifetime Founder Discount",
    "Los hoteles y cadenas que soliciten su acceso durante la fase Beta calificarán automáticamente para un": "Hotels and chains requesting access during the Beta phase automatically qualify for a",
    "en su tarifa fija de mantenimiento corporativo una vez comercializado el software.": "on their flat corporate maintenance fee once the software is commercially released.",
    "ESCALABILIDAD CORPORATIVA · MULTIMARCA": "CORPORATE SCALABILITY · MULTI-BRAND",
    "Cotización Personalizada a la Medida de tu Empresa": "Custom Enterprise Quote Tailored to Your Portfolio",
    "Dado que cada propiedad tiene necesidades operativas distintas, estructuramos una propuesta adaptada a la escala de tu hotel o grupo hotelero:": "Because every property has unique operational demands, we structure a proposal tailored to the scale of your hotel or hospitality group:",
    "Cotización según Portafolio": "Portfolio-Based Pricing",
    "Ajustamos el costo según número de propiedades, integraciones y volumen de datos.": "We calibrate pricing based on property count, integrations, and data volume.",
    "Descuento Multimarca (-10%)": "Multi-Property Discount (-10%)",
    "Obtén un 10% de descuento adicional en el mantenimiento por cada propiedad extra.": "Receive an additional 10% maintenance discount for every extra property added.",
    "Cero Comisiones Ocultas": "Zero Hidden Fees",
    "Tarifa plana que premia tu crecimiento en lugar de castigarte por tener más habitaciones.": "Flat-fee architecture that rewards your growth instead of penalizing you for having more rooms.",
    "SIMULADOR DE ESCALA DE PORTAFOLIO": "PORTFOLIO SCALE SIMULATOR",

    // Section 7: Soberanía & Equipo
    "07 / EQUIPO Y CUMPLIMIENTO (FOUNDERS & COMPLIANCE)": "07 / TEAM & COMPLIANCE (FOUNDERS & SECURITY)",
    "Seguridad y Soberanía de Datos Garantizada": "Guaranteed Security & Data Sovereignty",
    "En": "At",
    ", la seguridad de la información de tu hotel es nuestra prioridad corporativa. Diseñamos nuestros procesos bajo las mejores prácticas de los estándares internacionales": ", the security of your hotel's information is our highest corporate priority. We engineer our processes under the best practices of international standards",
    "de gestión de ciberseguridad y privacidad. Tus bases de datos se almacenan en infraestructura aislada con encriptación de grado bancario (": "for cybersecurity and privacy management. Your databases are stored in isolated infrastructure with bank-grade encryption (",
    "AES-256 en reposo": "AES-256 at rest",
    "TLS 1.3 en tránsito": "TLS 1.3 in transit",
    "), garantizando el estricto cumplimiento de": "), ensuring strict compliance with",
    "Tus datos te pertenecen solo a ti.": "Your data belongs exclusively to you.",
    "Gestión de Ciberseguridad Corporativa": "Enterprise Cybersecurity Management",
    "Estándar Internacional de Privacidad": "International Privacy Standard",
    "Encriptación en Reposo y en Tránsito": "Encryption at Rest & in Transit",
    "Soberanía Total sin Silos de Terceros": "Total Sovereignty Without Third-Party Silos",
    "LIDERAZGO EJECUTIVO · PERLA HOST": "EXECUTIVE LEADERSHIP · PERLA HOST",
    "Fundadores": "Founders",
    "Ingeniería de baja latencia, estrategia comercial hotelera e inteligencia artificial aplicada a la recepción.": "Low-latency systems engineering, hotel commercial strategy, and applied front-desk AI.",
    "01 / DIRECCIÓN GENERAL": "01 / EXECUTIVE MANAGEMENT",
    "“Elevando la competitividad del turismo regional a través de datos y tecnología accesible.”": "“Elevating the competitiveness of regional tourism through data ownership and accessible technology.”",
    "02 / ARQUITECTURA DE SISTEMAS": "02 / SYSTEMS ARCHITECTURE",
    "“Diseñando la infraestructura Lean-Edge que garantiza velocidad en submilisegundos y soberanía de datos.”": "“Engineering the Lean-Edge infrastructure that guarantees sub-millisecond speed and absolute data sovereignty.”",
    "03 / ESTRATEGIA COMERCIAL": "03 / COMMERCIAL STRATEGY",
    "“Convirtiendo el historial y la lealtad de tus huéspedes en un motor constante de reservas directas.”": "“Turning your guests' stay history and loyalty into a predictable, high-margin direct booking engine.”",
    "04 / IA & ÉXITO OPERATIVO": "04 / AI & OPERATIONAL SUCCESS",
    "Ingeniería IA & Recepción": "AI & Front-Desk Engineering",
    "“Transformando los dolores diarios de la recepción en soluciones operativas automáticas.”": "“Transforming daily front-desk friction into automated operational solutions.”",

    // Footer
    "Perla Suite by La Perla Host · Isla de Margarita. Arquitectura Lean-Edge con respuestas en submilisegundos y soberanía absoluta de datos.": "Perla Suite by La Perla Host · Margarita Island. Lean-Edge architecture with sub-millisecond response times and absolute data sovereignty.",
    "01. Inicio": "01. Home",
    "02. Visión y Misión": "02. Vision & Mission",
    "03. Ventaja Competitiva": "03. Competitive Advantage",
    "04. Ecosistema (+40 PMS)": "04. Ecosystem (40+ PMS)",
    "05. Roadmap": "05. Roadmap",
    "06. Modelo Comercial": "06. Commercial Model",
    "07. Equipo y Cumplimiento": "07. Team & Compliance",
    "© 2026 Perla Host. Todos los derechos reservados.": "© 2026 Perla Host. All rights reserved."
  };

  // Collect translatable text nodes once and store their original Spanish text
  const translatableNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      const tag = node.parentElement.tagName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "SVG" || tag === "CODE") {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let currentNode = walker.nextNode();
  while (currentNode) {
    const raw = currentNode.nodeValue;
    const trimmed = raw.trim().replace(/\s+/g, " ");
    if (esToEnDictionary[trimmed]) {
      const leadingSpace = raw.match(/^\s*/)[0];
      const trailingSpace = raw.match(/\s*$/)[0];
      translatableNodes.push({
        node: currentNode,
        es: raw,
        en: `${leadingSpace}${esToEnDictionary[trimmed]}${trailingSpace}`
      });
    }
    currentNode = walker.nextNode();
  }

  function applyLanguage(lang) {
    currentLang = lang;
    htmlEl.setAttribute("lang", lang);
    localStorage.setItem("perla_lang", lang);

    if (langEsBadge && langEnBadge) {
      langEsBadge.classList.toggle("active", lang === "es");
      langEnBadge.classList.toggle("active", lang === "en");
    }

    translatableNodes.forEach((item) => {
      item.node.nodeValue = lang === "en" ? item.en : item.es;
    });

    // Update input placeholders
    const betaEmailInput = document.getElementById("betaEmail");
    if (betaEmailInput) {
      betaEmailInput.placeholder = lang === "en" ? "gm@hotel.com" : "gerente@hotel.com";
    }
    const pmsSearchInput = document.getElementById("pmsSearchInput");
    if (pmsSearchInput) {
      pmsSearchInput.placeholder =
        lang === "en"
          ? "Filter connector (e.g. Opera, Cloudbeds, Intelisis, WinHotel, Hostaway...)"
          : "Filtrar conector (ej. Opera, Cloudbeds, Intelisis, WinHotel, Hostaway...)";
    }

    updateThemeLabel();
    renderPmsList(pmsSearchInput ? pmsSearchInput.value : "");
    updatePortfolioSimulator();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "es" ? "en" : "es");
    });
  }

  /* ==========================================================================
     3. CURSOR-TRACKED RADIAL SPOTLIGHT ON BENTO CARDS (60FPS RAF)
     ========================================================================== */
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  let rafPending = false;

  document.addEventListener(
    "mousemove",
    (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        spotlightCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
        rafPending = false;
      });
    },
    { passive: true }
  );

  /* ==========================================================================
     4. INTERSECTION OBSERVER SCROLL REVEAL
     ========================================================================== */
  const revealElements = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ==========================================================================
     5. FLOATING DOCK NAVIGATION & SCROLL SPY
     ========================================================================== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinksContainer = document.getElementById("navLinks");
  const dockLinks = document.querySelectorAll(".dock-link");

  const setMobileMenuState = (isOpen) => {
    if (!navLinksContainer || !mobileMenuBtn) return;
    navLinksContainer.classList.toggle("open", isOpen);
    mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenuBtn.innerHTML = isOpen
      ? `<i data-lucide="x" class="lucide-sm"></i>`
      : `<i data-lucide="menu" class="lucide-sm"></i>`;
    refreshLucideIcons();
  };

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !navLinksContainer.classList.contains("open");
      setMobileMenuState(isOpen);
    });

    dockLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setMobileMenuState(false);
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navLinksContainer.classList.contains("open") &&
        !navLinksContainer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        setMobileMenuState(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100 && navLinksContainer.classList.contains("open")) {
        setMobileMenuState(false);
      }
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY + 160;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (scrollY >= top && scrollY < top + height) {
          dockLinks.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { passive: true }
  );

  /* ==========================================================================
     6. HIGH-CONVERSION COMMAND CONSOLE (SCALE SELECTOR + BETA SUBMISSION)
     ========================================================================== */
  const scalePills = document.querySelectorAll(".scale-pill");
  let selectedScale = "Hotel Independiente (1 Propiedad)";

  scalePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      scalePills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      selectedScale = pill.getAttribute("data-scale");
    });
  });

  const heroForm = document.getElementById("heroForm");
  const betaEmailInput = document.getElementById("betaEmail");
  const formFeedback = document.getElementById("formFeedback");

  if (heroForm) {
    heroForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = betaEmailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        const errMsg =
          currentLang === "en"
            ? "Please enter a valid corporate email (e.g. gm@hotel.com) to issue your Beta reservation."
            : "Ingrese un correo corporativo válido (ej. gerente@hotel.com) para emitir su reserva Beta.";
        formFeedback.innerHTML = `<i data-lucide="alert-circle" class="lucide-sm"></i><span>${errMsg}</span>`;
        formFeedback.className = "console-feedback error";
        refreshLucideIcons();
        betaEmailInput.focus();
        return;
      }

      const tokenCode = "PRL-" + Math.floor(1000 + Math.random() * 9000);
      const submitBtn = heroForm.querySelector(".btn-console-submit");
      if (submitBtn) submitBtn.disabled = true;

      const sendingMsg =
        currentLang === "en"
          ? `Dispatching Private Beta invitation & meeting link to <strong>${email}</strong> via Mailjet...`
          : `Enviando invitación al Beta Privado y enlace de reunión a <strong>${email}</strong> vía Mailjet...`;
      formFeedback.innerHTML = `<i data-lucide="loader-2" class="lucide-sm"></i><span>${sendingMsg}</span>`;
      formFeedback.className = "console-feedback success";
      refreshLucideIcons();

      try {
        const response = await fetch("http://localhost:3005/api/beta-invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            scale: selectedScale,
            tokenCode,
            lang: currentLang
          })
        });

        const data = await response.json();
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Mailjet error");
        }

        const okMsg =
          currentLang === "en"
            ? `<strong>Invitation sent to ${email}!</strong> Check your inbox (Founder Pass <strong>#${tokenCode}</strong> · ${selectedScale}) to schedule your 20-min onboarding call and lock in your <strong>50% lifetime discount</strong>.`
            : `<strong>¡Invitación enviada a ${email}!</strong> Revisa tu bandeja de entrada (Pase Fundador <strong>#${tokenCode}</strong> · ${selectedScale}) para agendar tu llamada ejecutiva de 20 min y activar tu <strong>50% de descuento de por vida</strong>.`;
        formFeedback.innerHTML = `<i data-lucide="mail-check" class="lucide-sm"></i><span>${okMsg}</span>`;
        formFeedback.className = "console-feedback success";
        refreshLucideIcons();
        betaEmailInput.value = "";
      } catch (err) {
        const subject = encodeURIComponent(
          currentLang === "en"
            ? `Schedule Onboarding Call · Perla Suite Founder Pass #${tokenCode}`
            : `Agendar Reunión Beta · Pase Fundador Perla Suite #${tokenCode}`
        );
        const body = encodeURIComponent(
          currentLang === "en"
            ? `Hi Perla Host Team,\n\nI just requested Private Beta access for ${email} (${selectedScale}) with Founder Pass #${tokenCode}.\n\nI would like to schedule our 20-minute onboarding call.`
            : `Hola equipo de Perla Host,\n\nAcabo de solicitar acceso al Beta Privado para ${email} (${selectedScale}) con el Pase Fundador #${tokenCode}.\n\nMe gustaría coordinar nuestra reunión ejecutiva de 20 minutos.`
        );
        const mailtoUrl = `mailto:amadorcitohernandez@gmail.com?subject=${subject}&body=${body}`;

        const fallbackMsg =
          currentLang === "en"
            ? `<strong>Founder Pass #${tokenCode} assigned to ${email}</strong> (${selectedScale}) · $0 Evaluation + <strong>50% lifetime discount</strong> locked. <a href="${mailtoUrl}" style="color:#10B981;text-decoration:underline;font-weight:700;margin-left:6px;">Schedule 20-min call &rarr;</a>`
            : `<strong>Pase Fundador #${tokenCode} asignado a ${email}</strong> (${selectedScale}) · Evaluación $0 + <strong>50% de descuento de por vida</strong> bloqueado. <a href="${mailtoUrl}" style="color:#10B981;text-decoration:underline;font-weight:700;margin-left:6px;">Agendar reunión de 20 min &rarr;</a>`;
        formFeedback.innerHTML = `<i data-lucide="check-circle-2" class="lucide-sm"></i><span>${fallbackMsg}</span>`;
        formFeedback.className = "console-feedback success";
        refreshLucideIcons();
        betaEmailInput.value = "";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  const pricingToConsoleBtn = document.getElementById("pricingToConsoleBtn");
  if (pricingToConsoleBtn && betaEmailInput) {
    pricingToConsoleBtn.addEventListener("click", () => {
      setTimeout(() => betaEmailInput.focus(), 450);
    });
  }

  /* ==========================================================================
     7. SEGMENTED CONTROL FOR "ANTES Y DESPUÉS" TRANSFORMATION MATRIX
     ========================================================================== */
  const segBtns = document.querySelectorAll(".seg-btn");
  const beforeAfterContainer = document.getElementById("beforeAfterContainer");

  segBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      segBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.getAttribute("data-view");
      beforeAfterContainer.classList.remove("view-before", "view-after");
      if (view === "before") {
        beforeAfterContainer.classList.add("view-before");
      } else if (view === "after") {
        beforeAfterContainer.classList.add("view-after");
      }
    });
  });

  /* ==========================================================================
     8. 40+ PMS COMMAND-PALETTE DIRECTORY & LIVE FILTER
     ========================================================================== */
  const pmsSystems = [
    "Oracle MICROS Opera (Opera Cloud / V5)",
    "Infor HMS (Hospitality Management System)",
    "Amadeus PMPro / PMS",
    "Agilysys Visual One / Stay",
    "Sabre SynXis Property Hub",
    "Protel (by Planet)",
    "Siemss / Sihot PMS",
    "Realware / Realta PMS",
    "Despegar / Stays.net",
    "Teseo PMS",
    "Cloudbeds",
    "Mews Systems",
    "SiteMinder Exchange / PMS Connect",
    "StayNTouch",
    "Clock PMS+",
    "Sirvoy",
    "Hotelogix",
    "RoomRaccoon",
    "Frontdesk Master",
    "eZee Absolute (eZee Technosys)",
    "Guesty (Hybrid Hospitality)",
    "RMS Cloud",
    "Beds24",
    "Little Hotelier",
    "Amenitiz",
    "CGestión / Tesipro (España / LATAM)",
    "Class One PMS",
    "HSDS / Hotelogist",
    "MasterYield PMS",
    "WinPousada / WinHotel (Brasil / Cono Sur)",
    "Despegar Stays / PHOBS",
    "Avance Software (HotelFull)",
    "SysHotel / Sysnet",
    "HotelSystems LATAM",
    "Hostify",
    "SoftHotel / Softland",
    "Intelisis ERP Hotelero (México/Centroamérica)",
    "Bukeer (Colombia/Andino)",
    "OfiHotel (Ofi.es / LATAM)",
    "Hostaway"
  ];

  const pmsFullListEl = document.getElementById("pmsFullList");
  const pmsSearchInput = document.getElementById("pmsSearchInput");
  const pmsCountBadge = document.getElementById("pmsCountBadge");
  const toggleAllPmsBtn = document.getElementById("toggleAllPmsBtn");
  const pmsDirectoryPanel = document.getElementById("pmsDirectoryPanel");

  function renderPmsList(filterText = "") {
    if (!pmsFullListEl) return;
    const normalized = filterText.trim().toLowerCase();
    const filtered = pmsSystems.filter((item) =>
      item.toLowerCase().includes(normalized)
    );

    if (pmsCountBadge) {
      pmsCountBadge.textContent =
        currentLang === "en" ? `${filtered.length} active` : `${filtered.length} activos`;
    }

    if (filtered.length === 0) {
      const apiMsg =
        currentLang === "en"
          ? "Universal Lean-Edge connector available for direct certification with your regional PMS."
          : "Conector universal Lean-Edge disponible para homologación directa con tu PMS regional.";
      pmsFullListEl.innerHTML = `
        <div class="pms-chip-item" style="grid-column: 1 / -1;">
          <span class="pms-chip-index">API</span>
          <span>${apiMsg}</span>
        </div>
      `;
      return;
    }

    pmsFullListEl.innerHTML = filtered
      .map((name, idx) => {
        const num = String(idx + 1).padStart(2, "0");
        return `
          <div class="pms-chip-item">
            <span class="pms-chip-index">#${num}</span>
            <span>${name}</span>
          </div>
        `;
      })
      .join("");
  }

  if (pmsSearchInput) {
    pmsSearchInput.addEventListener("input", (e) => {
      renderPmsList(e.target.value);
    });
  }

  if (toggleAllPmsBtn && pmsDirectoryPanel) {
    toggleAllPmsBtn.addEventListener("click", () => {
      pmsDirectoryPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (pmsSearchInput) {
        pmsSearchInput.focus();
      }
    });
  }

  /* ==========================================================================
     9. MULTI-PROPERTY PORTFOLIO SIMULATOR
     ========================================================================== */
  const propertySlider = document.getElementById("propertySlider");
  const propertyCountLabel = document.getElementById("propertyCountLabel");
  const simResultText = document.getElementById("simResultText");

  function updatePortfolioSimulator() {
    if (!propertySlider || !propertyCountLabel || !simResultText) return;
    const count = parseInt(propertySlider.value, 10);

    if (currentLang === "en") {
      propertyCountLabel.textContent =
        count === 1 ? "1 Independent Property" : `${count} Chain Properties`;

      if (count === 1) {
        simResultText.innerHTML = `Flat Rate with zero room penalties + <strong>50% Lifetime Founder Discount</strong>.`;
      } else {
        const extraProperties = count - 1;
        const extraDiscount = extraProperties * 10;
        simResultText.innerHTML = `Founder Rate (<strong>50% OFF for life</strong>) + <strong>${extraDiscount}% additional maintenance discount</strong> (${extraProperties} extra propert${extraProperties > 1 ? "ies" : "y"} × 10%).`;
      }
    } else {
      propertyCountLabel.textContent =
        count === 1 ? "1 Propiedad Independiente" : `${count} Propiedades en Cadena`;

      if (count === 1) {
        simResultText.innerHTML = `Tarifa Plana sin penalización por habitaciones + <strong>50% de Descuento Fundador de por vida</strong>.`;
      } else {
        const extraProperties = count - 1;
        const extraDiscount = extraProperties * 10;
        simResultText.innerHTML = `Tarifa Fundador (<strong>50% OFF de por vida</strong>) + <strong>${extraDiscount}% de descuento adicional en mantenimiento</strong> (${extraProperties} propiedad${extraProperties > 1 ? "es" : ""} extra × 10%).`;
      }
    }
  }

  if (propertySlider) {
    propertySlider.addEventListener("input", updatePortfolioSimulator);
  }

  /* ==========================================================================
     10. SUB-MILLISECOND LEAN-EDGE TELEMETRY
     ========================================================================== */
  const liveLatencyEl = document.getElementById("liveLatency");
  if (liveLatencyEl) {
    const samples = ["0.8ms", "1.1ms", "0.7ms", "0.9ms", "1.2ms"];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % samples.length;
      liveLatencyEl.textContent = samples[idx];
    }, 3000);
  }

  // Initialize language & dynamic panels
  applyLanguage(currentLang);
  refreshLucideIcons();
});
