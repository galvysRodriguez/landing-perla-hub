import { createContext, useContext, useEffect, useState } from "react";

const es = {
  nav: {
    demo: "Demo",
    products: "Productos",
    compare: "Antes y después",
    integrations: "Integraciones",
    model: "Modelo",
    cta: "Solicitar demo",
  },
  hero: {
    badge: "Perla Suite ya está en demo · CDP, Reputación, Feedback y Marketing",
    title1: "La inteligencia hotelera",
    title2: "que tu región esperaba.",
    subtitle:
      "Un solo perfil por huésped, problemas resueltos antes del check-out y campañas que convierten visitas de OTA en reservas directas. Ya no es una promesa: entra y úsalo.",
    primary: "Ver el producto en vivo",
    secondary: "Agendar una demo guiada",
    stats: [
      { value: "+40", label: "PMS y ERP conectables" },
      { value: "4", label: "productos en una suite" },
      { value: "< 1 ms", label: "resolución de identidad" },
      { value: "12 h", label: "tras el check-in: encuesta in-stay" },
    ],
  },
  demo: {
    eyebrow: "El producto, sin maquillaje",
    title: "Recorre Perla Suite como lo verá tu equipo",
    subtitle:
      "Grabaciones reales del panel y simulaciones interactivas. Cambia de producto y mira cada flujo de principio a fin.",
    live: "Simulación en vivo",
    recorded: "Grabado con Recordly",
    replay: "Repetir",
    tabs: {
      cdp: { name: "CDP", title: "Perfil único del huésped", text: "Une PMS, spa y F&B en un solo perfil y desenmascara los correos alias de las OTA." },
      reputation: { name: "Reputación", title: "Todas las reseñas, un solo inbox", text: "Booking, Google, TripAdvisor y Expedia juntos, con sentimiento por departamento y benchmark contra tu competencia." },
      feedback: { name: "Feedback", title: "Intercepción in-stay", text: "Encuesta por WhatsApp a las 12 h del check-in. Si algo falla, recepción lo sabe antes que Google." },
      marketing: { name: "Marketing", title: "Journeys que traen reservas directas", text: "Segmenta con más de 100 atributos y automatiza correos y WhatsApp sin depender de las OTA." },
    },
  },
  mock: {
    search: "Buscar huéspedes, reservas, reseñas…",
    property: "Hotel Playa Perla · Margarita",
    cdp: {
      sources: "Registros fragmentados",
      merging: "Resolviendo identidad…",
      merged: "Perfil unificado",
      tier: "Oro",
      stays: "Estancias",
      ltv: "Valor de vida",
      direct: "Canal directo",
      directOn: "Contactable",
      aliasFound: "Alias OTA desenmascarado",
      match: "coincidencia 98 %",
      prefs: ["Vista al mar", "Sin gluten", "Late check-out", "Spa"],
    },
    reputation: {
      inbox: "Inbox de reseñas",
      score: "Puntuación global",
      vsMarket: "vs. mercado",
      sentiment: "Sentimiento por departamento",
      departments: ["Recepción", "Limpieza", "F&B", "Spa"],
      replied: "Respondida",
      pending: "Pendiente",
      reviews: [
        { src: "Booking", score: 9.4, text: "El personal de recepción fue increíble, nos cambiaron de habitación sin problema." },
        { src: "Google", score: 4.8, text: "Desayuno buffet espectacular y la vista al mar insuperable." },
        { src: "TripAdvisor", score: 3.0, text: "La habitación estaba bien pero el aire acondicionado hacía ruido." },
        { src: "Expedia", score: 9.0, text: "Volveremos, el spa vale cada centavo." },
      ],
    },
    feedback: {
      chatName: "Hotel Playa Perla",
      online: "en línea",
      q1: "¡Hola María! 🌴 ¿Cómo va tu estancia hasta ahora? Responde del 1 al 5.",
      a1: "2",
      q2: "Lamentamos eso. ¿Qué podemos mejorar ahora mismo?",
      a2: "El aire acondicionado de la 214 no enfría 😓",
      alertTitle: "Alerta para recepción",
      alertText: "Hab. 214 · Mantenimiento · Huésped Oro",
      assigned: "Asignado a Mantenimiento",
      resolved: "Resuelto en 38 min",
      q3: "Listo: el técnico ya lo arregló. Te enviamos un cóctel de cortesía al bar 🍹",
      saved: "Reseña negativa evitada",
      alerts: "Alertas",
    },
    marketing: {
      segment: "Segmento",
      segmentName: "Recurrentes que reservaron vía OTA",
      audience: "huéspedes",
      attrs: "atributos",
      nodes: ["Check-out", "Esperar 30 días", "¿Abrió el correo?", "WhatsApp: 15 % directo", "Reserva directa"],
      kpi1: "Tasa de apertura",
      kpi2: "Reservas directas",
      kpi3: "Comisión OTA ahorrada",
    },
  },
  products: {
    eyebrow: "Cuatro productos, un solo huésped",
    title: "Todo lo que pasa con tu huésped, en un mismo lugar",
    items: [
      { key: "cdp", name: "CDP · Guest Intelligence", text: "Resolución de identidad, perfiles enriquecidos, segmentos y destinos. El dato del huésped vuelve a ser tuyo.", points: ["Unificación PMS + spa + F&B", "Alias OTA desenmascarados", "Segmentos con 100+ atributos"] },
      { key: "reputation", name: "Reputación", text: "Un inbox unificado de reseñas con análisis de sentimiento y benchmarking contra tu set competitivo.", points: ["Inbox multi-plataforma", "Sentimiento por departamento", "Comparativa entre propiedades"] },
      { key: "feedback", name: "Feedback", text: "Encuestas in-stay y post-stay por WhatsApp y correo, con alertas en tiempo real para recepción.", points: ["Encuestas a las 12 h", "Alertas a recepción", "Insights con IA"] },
      { key: "marketing", name: "Marketing", text: "Journeys automatizados, plantillas y mensajes que convierten huéspedes de OTA en clientes directos.", points: ["Journeys visuales", "Correo + WhatsApp", "Atribución de reservas"] },
    ],
  },
  compare: {
    eyebrow: "Antes y después",
    title: "Del Excel y las sorpresas en Google, a decisiones con datos",
    before: "Antes",
    after: "Con Perla",
    rows: [
      { area: "Gestión de información", before: "Perfiles duplicados en PMS, spa y restaurante. Correos @guest.booking.com imposibles de contactar.", after: "Un perfil único por huésped, con historial, preferencias y canal directo verificado." },
      { area: "Reputación", before: "Te enteras de la mala reseña cuando ya es pública.", after: "La encuesta in-stay detecta el problema y recepción lo resuelve antes del check-out." },
      { area: "Marketing", before: "Campañas masivas sobre datos sucios, sin saber qué funcionó.", after: "Audiencias con más de 100 atributos y reservas directas atribuidas a cada journey." },
      { area: "Análisis", before: "Leer cientos de reseñas a mano para encontrar patrones.", after: "Sentimiento por departamento (F&B, limpieza, recepción) actualizado a diario." },
    ],
  },
  integrations: {
    eyebrow: "Ecosistema",
    title: "Se conecta con lo que ya usas",
    subtitle: "Más de 40 PMS y ERP, incluidos los sistemas regionales de LATAM.",
  },
  security: {
    title: "Tus datos, en tu instancia",
    text: "Cada hotel o cadena corre su propia instancia de Perla, con licencia firmada y control de uso. Soberanía de datos real, no una casilla en un contrato.",
    items: ["Instancia dedicada por cliente", "AES-256 en reposo · TLS 1.3 en tránsito", "Alineado con ISO/IEC 27001 y 27701", "GDPR y CCPA"],
  },
  model: {
    eyebrow: "Modelo",
    title: "Paga por lo que usas, crece por propiedad",
    subtitle: "Licencias por producto y límites claros de uso. Sin comisiones ocultas por reserva.",
    plans: [
      { name: "Demo", price: "$0", note: "Acceso guiado", features: ["Los 4 productos con datos de ejemplo", "Recorrido con nuestro equipo", "Prueba con una exportación de tu PMS"], cta: "Solicitar demo" },
      { name: "Propiedad", price: "Tarifa fija", note: "Por producto", features: ["Instancia dedicada", "Integración con tu PMS", "Soporte en español"], cta: "Hablar con ventas", featured: true },
      { name: "Cadena", price: "A medida", note: "−10 % por propiedad adicional", features: ["Comparativa entre propiedades", "Roles y permisos por hotel", "Onboarding asistido"], cta: "Cotizar portafolio" },
    ],
  },
  cta: {
    title: "Mira Perla Suite con los datos de tu hotel",
    subtitle: "Te mostramos el producto en 30 minutos y lo conectamos a una muestra de tu PMS.",
    email: "Correo corporativo",
    scale: "Tamaño del portafolio",
    scales: ["1 propiedad", "2–4 propiedades", "Cadena de 5+"],
    submit: "Solicitar demo",
    sending: "Enviando…",
    error: "No pudimos enviar la solicitud. Inténtalo de nuevo o escríbenos a galvys22@gmail.com.",
    sent: "¡Recibido! Te escribimos en menos de 24 h para agendar la demo.",
    fine: "Sin spam. Solo te contactamos para la demo.",
  },
  footer: {
    tagline: "Hospitality Intelligence · Hecho en Isla de Margarita",
    rights: "Todos los derechos reservados.",
  },
};

const en = {
  nav: {
    demo: "Demo",
    products: "Products",
    compare: "Before & after",
    integrations: "Integrations",
    model: "Pricing",
    cta: "Request a demo",
  },
  hero: {
    badge: "Perla Suite is now in demo · CDP, Reputation, Feedback and Marketing",
    title1: "The hotel intelligence",
    title2: "your region was waiting for.",
    subtitle:
      "One profile per guest, issues solved before check-out and campaigns that turn OTA visitors into direct bookings. Not a promise anymore: step in and use it.",
    primary: "See the live product",
    secondary: "Book a guided demo",
    stats: [
      { value: "40+", label: "PMS and ERP connectors" },
      { value: "4", label: "products in one suite" },
      { value: "< 1 ms", label: "identity resolution" },
      { value: "12 h", label: "after check-in: in-stay survey" },
    ],
  },
  demo: {
    eyebrow: "The product, unfiltered",
    title: "Walk through Perla Suite the way your team will",
    subtitle: "Real recordings of the app and interactive simulations. Switch products and watch every flow end to end.",
    live: "Live simulation",
    recorded: "Recorded with Recordly",
    replay: "Replay",
    tabs: {
      cdp: { name: "CDP", title: "One guest profile", text: "Merge PMS, spa and F&B into one profile and unmask OTA alias emails." },
      reputation: { name: "Reputation", title: "Every review, one inbox", text: "Booking, Google, TripAdvisor and Expedia together, with sentiment by department and a benchmark against your competitors." },
      feedback: { name: "Feedback", title: "In-stay interception", text: "A WhatsApp survey 12 h after check-in. If something's wrong, the front desk knows before Google does." },
      marketing: { name: "Marketing", title: "Journeys that bring direct bookings", text: "Segment with 100+ attributes and automate email and WhatsApp without relying on OTAs." },
    },
  },
  mock: {
    search: "Search guests, bookings, reviews…",
    property: "Hotel Playa Perla · Margarita",
    cdp: {
      sources: "Fragmented records",
      merging: "Resolving identity…",
      merged: "Unified profile",
      tier: "Gold",
      stays: "Stays",
      ltv: "Lifetime value",
      direct: "Direct channel",
      directOn: "Reachable",
      aliasFound: "OTA alias unmasked",
      match: "98 % match",
      prefs: ["Sea view", "Gluten-free", "Late check-out", "Spa"],
    },
    reputation: {
      inbox: "Review inbox",
      score: "Overall score",
      vsMarket: "vs. market",
      sentiment: "Sentiment by department",
      departments: ["Front desk", "Housekeeping", "F&B", "Spa"],
      replied: "Replied",
      pending: "Pending",
      reviews: [
        { src: "Booking", score: 9.4, text: "The front desk staff were amazing, they changed our room with no fuss." },
        { src: "Google", score: 4.8, text: "Spectacular breakfast buffet and an unbeatable sea view." },
        { src: "TripAdvisor", score: 3.0, text: "The room was fine but the air conditioning was noisy." },
        { src: "Expedia", score: 9.0, text: "We'll be back, the spa is worth every cent." },
      ],
    },
    feedback: {
      chatName: "Hotel Playa Perla",
      online: "online",
      q1: "Hi María! 🌴 How's your stay so far? Reply from 1 to 5.",
      a1: "2",
      q2: "Sorry to hear that. What can we fix right now?",
      a2: "The AC in room 214 isn't cooling 😓",
      alertTitle: "Front desk alert",
      alertText: "Room 214 · Maintenance · Gold guest",
      assigned: "Assigned to Maintenance",
      resolved: "Solved in 38 min",
      q3: "Done: our technician fixed it. A complimentary cocktail is waiting at the bar 🍹",
      saved: "Negative review prevented",
      alerts: "Alerts",
    },
    marketing: {
      segment: "Segment",
      segmentName: "Repeat guests who booked via OTA",
      audience: "guests",
      attrs: "attributes",
      nodes: ["Check-out", "Wait 30 days", "Opened the email?", "WhatsApp: 15 % direct", "Direct booking"],
      kpi1: "Open rate",
      kpi2: "Direct bookings",
      kpi3: "OTA commission saved",
    },
  },
  products: {
    eyebrow: "Four products, one guest",
    title: "Everything that happens with your guest, in one place",
    items: [
      { key: "cdp", name: "CDP · Guest Intelligence", text: "Identity resolution, enriched profiles, segments and destinations. Guest data is yours again.", points: ["PMS + spa + F&B unification", "OTA aliases unmasked", "Segments with 100+ attributes"] },
      { key: "reputation", name: "Reputation", text: "A unified review inbox with sentiment analysis and benchmarking against your competitive set.", points: ["Multi-platform inbox", "Sentiment by department", "Cross-property comparison"] },
      { key: "feedback", name: "Feedback", text: "In-stay and post-stay surveys over WhatsApp and email, with real-time alerts for the front desk.", points: ["Surveys at 12 h", "Front desk alerts", "AI insights"] },
      { key: "marketing", name: "Marketing", text: "Automated journeys, templates and messages that turn OTA guests into direct customers.", points: ["Visual journeys", "Email + WhatsApp", "Booking attribution"] },
    ],
  },
  compare: {
    eyebrow: "Before & after",
    title: "From spreadsheets and surprises on Google to data-driven decisions",
    before: "Before",
    after: "With Perla",
    rows: [
      { area: "Information management", before: "Duplicate profiles across PMS, spa and restaurant. @guest.booking.com emails you can't reach.", after: "One profile per guest, with history, preferences and a verified direct channel." },
      { area: "Reputation", before: "You learn about the bad review once it's public.", after: "The in-stay survey catches the issue and the front desk fixes it before check-out." },
      { area: "Marketing", before: "Mass campaigns on dirty data, with no idea what worked.", after: "Audiences with 100+ attributes and direct bookings attributed to each journey." },
      { area: "Analysis", before: "Reading hundreds of reviews by hand to find patterns.", after: "Sentiment by department (F&B, housekeeping, front desk) updated daily." },
    ],
  },
  integrations: {
    eyebrow: "Ecosystem",
    title: "Connects with what you already use",
    subtitle: "40+ PMS and ERP systems, including regional LATAM ones.",
  },
  security: {
    title: "Your data, in your instance",
    text: "Every hotel or chain runs its own Perla instance, with a signed license and usage control. Real data sovereignty, not a checkbox in a contract.",
    items: ["A dedicated instance per client", "AES-256 at rest · TLS 1.3 in transit", "Aligned with ISO/IEC 27001 and 27701", "GDPR and CCPA"],
  },
  model: {
    eyebrow: "Pricing",
    title: "Pay for what you use, grow per property",
    subtitle: "Per-product licenses and clear usage limits. No hidden per-booking commissions.",
    plans: [
      { name: "Demo", price: "$0", note: "Guided access", features: ["All 4 products with sample data", "Walkthrough with our team", "Try it with an export of your PMS"], cta: "Request a demo" },
      { name: "Property", price: "Flat fee", note: "Per product", features: ["Dedicated instance", "Integration with your PMS", "Spanish and English support"], cta: "Talk to sales", featured: true },
      { name: "Chain", price: "Custom", note: "−10 % per extra property", features: ["Cross-property comparison", "Roles and permissions per hotel", "Assisted onboarding"], cta: "Quote my portfolio" },
    ],
  },
  cta: {
    title: "See Perla Suite with your hotel's data",
    subtitle: "We show you the product in 30 minutes and plug it into a sample of your PMS.",
    email: "Work email",
    scale: "Portfolio size",
    scales: ["1 property", "2–4 properties", "Chain of 5+"],
    submit: "Request a demo",
    sending: "Sending…",
    error: "We couldn't send your request. Try again or write to galvys22@gmail.com.",
    sent: "Got it! We'll write within 24 h to book your demo.",
    fine: "No spam. We only contact you about the demo.",
  },
  footer: {
    tagline: "Hospitality Intelligence · Made on Margarita Island",
    rights: "All rights reserved.",
  },
};

const dictionaries = { es, en };
const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved in dictionaries) return saved;
  } catch {
    // Storage blocked: fall back to the browser language.
  }
  return navigator.language?.startsWith("en") ? "en" : "es";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Not persisted; the choice still applies to this visit.
    }
  }, [lang]);

  return <LangContext value={{ lang, setLang, t: dictionaries[lang] }}>{children}</LangContext>;
}

export function useLang() {
  return useContext(LangContext);
}
