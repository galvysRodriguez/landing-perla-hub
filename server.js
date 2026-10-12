const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

// Load .env if present
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const PORT = parseInt(process.env.PORT || "3005", 10);
const MAILJET_API_KEY = process.env.MAILJET_API_KEY || "25f48e9abfcb2c794610aa24ad5b7c63";
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY || "2f4e2a033534d46f7e6233cb7616bcef";
const MAILJET_SENDER_EMAIL = process.env.MAILJET_SENDER_EMAIL || "amadorcitohernandez@gmail.com";
const MAILJET_SENDER_NAME = process.env.MAILJET_SENDER_NAME || "La Perla Host · Perla Suite";

function buildEmailContent({ email, scale, tokenCode, lang }) {
  const isEn = lang === "en";

  const subject = isEn
    ? `[Perla Suite] Private Beta Invitation & Onboarding Call (${tokenCode})`
    : `[Perla Suite] Invitación al Beta Privado y Agendamiento de Reunión (${tokenCode})`;

  const calendarSubject = encodeURIComponent(
    isEn
      ? `Executive Demo & Beta Onboarding: Perla Suite (${tokenCode})`
      : `Sesión Ejecutiva & Onboarding Beta: Perla Suite (${tokenCode})`
  );
  const calendarDetails = encodeURIComponent(
    isEn
      ? `1-on-1 architecture & onboarding session for Perla Suite Private Beta.\nFounder Pass: ${tokenCode}\nScale: ${scale}\n50% Lifetime Founder Discount Locked.`
      : `Sesión ejecutiva 1-a-1 de arquitectura y despliegue del Beta Privado de Perla Suite.\nPase Fundador: ${tokenCode}\nEscala: ${scale}\n50% de Descuento Fundador de por vida bloqueado.`
  );
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarSubject}&details=${calendarDetails}&add=${encodeURIComponent(MAILJET_SENDER_EMAIL)}`;

  const replyMailto = `mailto:${MAILJET_SENDER_EMAIL}?subject=${encodeURIComponent(
    isEn
      ? `Schedule Call · Perla Suite Founder Pass ${tokenCode}`
      : `Agendar Reunión · Pase Fundador Perla Suite ${tokenCode}`
  )}&body=${encodeURIComponent(
    isEn
      ? `Hi Perla Host Executive Team,\n\nI would like to schedule our 20-minute onboarding call for ${email} (${scale}).\n\nMy preferred day/time is:\n- `
      : `Hola equipo ejecutivo de Perla Host,\n\nMe gustaría coordinar nuestra llamada de 20 minutos para activar el Beta Privado de ${email} (${scale}).\n\nMi disponibilidad de día y hora es:\n- `
  )}`;

  const html = isEn
    ? `
  <div style="background-color:#0F172A;padding:36px 18px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F8FAFC;">
    <div style="max-width:580px;margin:0 auto;background-color:#1E293B;border:1px solid #334155;border-radius:16px;overflow:hidden;box-shadow:0 20px 45px rgba(2,6,23,0.6);">
      <!-- Top Header Banner -->
      <div style="background:linear-gradient(135deg,#0F172A 0%,#065F46 100%);padding:28px 32px;border-bottom:2px solid #10B981;">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#10B981;text-transform:uppercase;margin-bottom:6px;">
          LA PERLA HOST · HOSPITALITY INTELLIGENCE
        </div>
        <h1 style="margin:0;font-size:24px;font-weight:800;color:#F8FAFC;letter-spacing:-0.02em;">
          Private Beta Invitation &amp; Executive Call
        </h1>
      </div>

      <!-- Body -->
      <div style="padding:32px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#E2E8F0;">
          Hello,
        </p>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#CBD5E1;">
          Thank you for requesting access to the <strong style="color:#F8FAFC;">Perla Suite Private Beta</strong>. Your property has been pre-qualified for our Founding Hotels cohort—giving you <strong style="color:#10B981;">$0 evaluation access</strong> during the beta phase and locking in a <strong style="color:#10B981;">50% lifetime founder discount</strong>.
        </p>

        <!-- Token Box -->
        <div style="background-color:#0F172A;border:1px solid #10B981;border-radius:12px;padding:20px;margin-bottom:26px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#94A3B8;text-transform:uppercase;margin-bottom:8px;">
            ASSIGNED FOUNDER PASS CREDENTIAL
          </div>
          <div style="font-size:26px;font-weight:800;color:#10B981;letter-spacing:1px;font-family:monospace;">
            #${tokenCode}
          </div>
          <div style="margin-top:12px;padding-top:12px;border-top:1px solid #334155;font-size:13px;color:#CBD5E1;">
            <div><strong>Property Email:</strong> ${email}</div>
            <div style="margin-top:4px;"><strong>Operation Scale:</strong> ${scale}</div>
            <div style="margin-top:4px;"><strong>Status:</strong> <span style="color:#10B981;font-weight:700;">50% Lifetime Discount Locked</span></div>
          </div>
        </div>

        <h2 style="margin:0 0 10px;font-size:17px;font-weight:700;color:#F8FAFC;">
          Next Step: Schedule Your 20-Minute Onboarding Call
        </h2>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:#94A3B8;">
          To configure your native PMS connector (+40 compatible systems) and activate your isolated guest database environment, let's schedule a brief executive call with our founding engineering team:
        </p>

        <!-- CTA Buttons -->
        <div style="margin-bottom:26px;">
          <a href="${replyMailto}" style="display:inline-block;background:linear-gradient(135deg,#10B981 0%,#059669 100%);color:#0F172A;font-weight:800;font-size:14px;text-decoration:none;padding:13px 22px;border-radius:999px;margin-right:10px;margin-bottom:10px;">
            Coordinate Call via Email &rarr;
          </a>
          <a href="${googleCalUrl}" target="_blank" style="display:inline-block;background-color:#0F172A;color:#F8FAFC;border:1px solid #10B981;font-weight:700;font-size:14px;text-decoration:none;padding:12px 20px;border-radius:999px;margin-bottom:10px;">
            Add Slot to Google Calendar
          </a>
        </div>

        <p style="margin:0;font-size:13px;line-height:1.6;color:#94A3B8;">
          Or simply reply directly to this email with the day and time that works best for you, and our leadership team (<strong>Johnny Granado</strong>, <strong>Ralphy Serra</strong>, <strong>Bimbo Salazar</strong> &amp; <strong>Gabriel Lunar</strong>) will confirm your session immediately.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color:#0F172A;padding:18px 32px;border-top:1px solid #334155;font-size:12px;color:#64748B;">
        La Perla Host · Margarita Island · Lean-Edge Hospitality Intelligence<br/>
        ISO/IEC 27001 · ISO/IEC 27701 · AES-256 · TLS 1.3 · Absolute Data Sovereignty
      </div>
    </div>
  </div>`
    : `
  <div style="background-color:#0F172A;padding:36px 18px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F8FAFC;">
    <div style="max-width:580px;margin:0 auto;background-color:#1E293B;border:1px solid #334155;border-radius:16px;overflow:hidden;box-shadow:0 20px 45px rgba(2,6,23,0.6);">
      <!-- Top Header Banner -->
      <div style="background:linear-gradient(135deg,#0F172A 0%,#065F46 100%);padding:28px 32px;border-bottom:2px solid #10B981;">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#10B981;text-transform:uppercase;margin-bottom:6px;">
          LA PERLA HOST · HOSPITALITY INTELLIGENCE
        </div>
        <h1 style="margin:0;font-size:24px;font-weight:800;color:#F8FAFC;letter-spacing:-0.02em;">
          Invitación al Beta Privado y Agendamiento de Reunión
        </h1>
      </div>

      <!-- Body -->
      <div style="padding:32px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#E2E8F0;">
          Hola,
        </p>
        <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#CBD5E1;">
          Gracias por solicitar acceso al <strong style="color:#F8FAFC;">Beta Privado de Perla Suite</strong>. Tu propiedad ha sido precalificada dentro de nuestra cohorte de Hoteles Fundadores, lo que te otorga <strong style="color:#10B981;">acceso de evaluación $0</strong> durante la fase Beta y bloquea automáticamente tu <strong style="color:#10B981;">50% de descuento de por vida</strong>.
        </p>

        <!-- Token Box -->
        <div style="background-color:#0F172A;border:1px solid #10B981;border-radius:12px;padding:20px;margin-bottom:26px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#94A3B8;text-transform:uppercase;margin-bottom:8px;">
            CREDENCIAL DE PASE FUNDADOR ASIGNADA
          </div>
          <div style="font-size:26px;font-weight:800;color:#10B981;letter-spacing:1px;font-family:monospace;">
            #${tokenCode}
          </div>
          <div style="margin-top:12px;padding-top:12px;border-top:1px solid #334155;font-size:13px;color:#CBD5E1;">
            <div><strong>Correo registrado:</strong> ${email}</div>
            <div style="margin-top:4px;"><strong>Escala de operación:</strong> ${scale}</div>
            <div style="margin-top:4px;"><strong>Beneficio activo:</strong> <span style="color:#10B981;font-weight:700;">50% de Descuento de Por Vida Bloqueado</span></div>
          </div>
        </div>

        <h2 style="margin:0 0 10px;font-size:17px;font-weight:700;color:#F8FAFC;">
          Siguiente Paso: Agendar Reunión de Despliegue (20 min)
        </h2>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:#94A3B8;">
          Para homologar la conexión con tu sistema PMS actual (+40 conectores disponibles) y habilitar tu entorno aislado con soberanía de datos, coordinemos una breve llamada ejecutiva con nuestro equipo fundador:
        </p>

        <!-- CTA Buttons -->
        <div style="margin-bottom:26px;">
          <a href="${replyMailto}" style="display:inline-block;background:linear-gradient(135deg,#10B981 0%,#059669 100%);color:#0F172A;font-weight:800;font-size:14px;text-decoration:none;padding:13px 22px;border-radius:999px;margin-right:10px;margin-bottom:10px;">
            Coordinar Llamada por Correo &rarr;
          </a>
          <a href="${googleCalUrl}" target="_blank" style="display:inline-block;background-color:#0F172A;color:#F8FAFC;border:1px solid #10B981;font-weight:700;font-size:14px;text-decoration:none;padding:12px 20px;border-radius:999px;margin-bottom:10px;">
            Agendar en Google Calendar
          </a>
        </div>

        <p style="margin:0;font-size:13px;line-height:1.6;color:#94A3B8;">
          También puedes responder directamente a este correo indicándonos qué día y hora te resulta más cómodo, y nuestro equipo directivo (<strong>Johnny Granado</strong>, <strong>Ralphy Serra</strong>, <strong>Bimbo Salazar</strong> y <strong>Gabriel Lunar</strong>) confirmará la sesión de inmediato.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color:#0F172A;padding:18px 32px;border-top:1px solid #334155;font-size:12px;color:#64748B;">
        La Perla Host · Isla de Margarita · Arquitectura Lean-Edge Hospitality Intelligence<br/>
        ISO/IEC 27001 · ISO/IEC 27701 · AES-256 · TLS 1.3 · Soberanía Absoluta de Datos
      </div>
    </div>
  </div>`;

  return { subject, html };
}

async function sendMailjetInvitation({ email, scale, tokenCode, lang }) {
  const { subject, html } = buildEmailContent({ email, scale, tokenCode, lang });
  const authHeader = "Basic " + Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString("base64");

  const payload = {
    Messages: [
      {
        From: {
          Email: MAILJET_SENDER_EMAIL,
          Name: MAILJET_SENDER_NAME
        },
        To: [
          {
            Email: email
          }
        ],
        Subject: subject,
        HTMLPart: html
      }
    ]
  };

  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  return data;
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  // Always set CORS headers so requests from file:// or any localhost port succeed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "POST" && parsedUrl.pathname === "/api/beta-invite") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email, scale, tokenCode, lang } = JSON.parse(body || "{}");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "Invalid email" }));
          return;
        }

        const result = await sendMailjetInvitation({
          email: email.trim(),
          scale: scale || "Hotel Independiente (1 Propiedad)",
          tokenCode: tokenCode || "PRL-" + Math.floor(1000 + Math.random() * 9000),
          lang: lang || "es"
        });

        console.log(`✅ [Mailjet] Invitación Beta enviada a ${email} (${tokenCode})`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, result }));
      } catch (err) {
        console.error("❌ [Mailjet Error]:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // Serve static files from project directory
  let pathname = decodeURIComponent(parsedUrl.pathname);
  if (pathname === "/") pathname = "/index.html";
  const filePath = path.join(__dirname, pathname);

  if (!filePath.startsWith(__dirname) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`🚀 Perla Suite Server + Mailjet API activo en http://localhost:${PORT}`);
});
