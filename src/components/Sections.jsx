import { useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Check, CheckCircle2, Lock, Send, Server, ShieldCheck, X } from "lucide-react";
import { useLang } from "../i18n.jsx";
import Reveal, { SectionHeading } from "./Reveal.jsx";
import { PRODUCT_ICONS } from "./mocks/shared.jsx";

// FormSubmit relays the demo request to this inbox (no backend needed on GitHub Pages).
const DEMO_ENDPOINT = "https://formsubmit.co/ajax/galvys22@gmail.com";

const PMS = ["Oracle Opera", "Cloudbeds", "Mews", "SiteMinder", "Infor HMS", "Amadeus", "Sabre SynXis", "Protel", "Guesty", "eZee", "Teseo", "SoftHotel", "Bukeer", "Booking.com", "Expedia", "Google", "TripAdvisor", "WhatsApp"];

export function Products() {
  const { t } = useLang();
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.products.eyebrow} title={t.products.title} />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {t.products.items.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <SpotlightCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A card with a glow that follows the pointer. */
function SpotlightCard({ product }) {
  const Icon = PRODUCT_ICONS[product.key];
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgb(79 70 229 / 0.18), transparent 70%)`;
  return (
    <motion.article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
      whileHover={{ y: -4 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-surface/60 p-7"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background }} />
      <div className="relative">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep shadow-lg shadow-brand/30">
          <Icon className="size-6" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-bold">{product.name}</h3>
        <p className="mt-2 text-muted text-pretty">{product.text}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {product.points.map((pt) => (
            <li key={pt} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-pearl">
              <Check className="size-3.5 text-accent" aria-hidden /> {pt}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Compare() {
  const { t } = useLang();
  const [after, setAfter] = useState(true);
  return (
    <section id="compare" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.compare.eyebrow} title={t.compare.title} />
        <Reveal className="mt-10 flex justify-center">
          <div className="glass relative flex rounded-full p-1" role="group">
            {[false, true].map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={after === value}
                onClick={() => setAfter(value)}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${after === value ? "text-ink" : "text-muted hover:text-white"}`}
              >
                {after === value && (
                  <motion.span layoutId="compare-pill" className={`absolute inset-0 -z-10 rounded-full ${value ? "bg-accent" : "bg-pearl"}`} transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                {value ? t.compare.after : t.compare.before}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.compare.rows.map((row, i) => (
            <Reveal key={row.area} delay={i * 0.06}>
              <div className={`h-full rounded-2xl border p-6 transition-colors duration-500 ${after ? "border-accent/25 bg-accent/[0.06]" : "border-white/8 bg-white/[0.02]"}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{row.area}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={after ? "a" : "b"}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 flex gap-3 text-[15px] leading-relaxed"
                  >
                    {after ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /> : <X className="mt-0.5 size-5 shrink-0 text-viz-rival" aria-hidden />}
                    <span className={after ? "text-white" : "text-pearl/70"}>{after ? row.after : row.before}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Integrations() {
  const { t } = useLang();
  const row = [...PMS, ...PMS];
  return (
    <section id="integrations" className="overflow-hidden py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.integrations.eyebrow} title={t.integrations.title} subtitle={t.integrations.subtitle} />
      </div>
      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <li key={i} aria-hidden={i >= PMS.length} className="glass whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold text-pearl/85">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Security() {
  const { t } = useLang();
  const icons = [Server, Lock, ShieldCheck, CheckCircle2];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-brand-night via-night to-ink p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.security.title}</h2>
              <p className="mt-4 text-lg text-pearl/75 text-pretty">{t.security.text}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.security.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <li key={item} className="glass flex items-start gap-3 rounded-2xl p-4 text-sm">
                    <Icon className="size-5 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Model() {
  const { t } = useLang();
  return (
    <section id="model" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.model.eyebrow} title={t.model.title} subtitle={t.model.subtitle} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.model.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                  plan.featured ? "border-brand/60 bg-gradient-to-b from-brand/20 to-surface shadow-2xl shadow-brand/20" : "border-white/8 bg-surface/50"
                }`}
              >
                <p className="text-sm font-semibold text-brand-soft">{plan.name}</p>
                <p className="mt-3 text-3xl font-extrabold">{plan.price}</p>
                <p className="mt-1 text-sm text-muted">{plan.note}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="size-4 shrink-0 translate-y-0.5 text-accent" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.featured ? "bg-white text-ink hover:bg-pearl" : "border border-white/15 hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const sent = status === "sent";

  async function requestDemo(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const scale = form.scale.value;
    setStatus("sending");
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Solicitud de demo de Perla Suite: ${email}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          Correo: email,
          Portafolio: scale,
          Idioma: lang,
          Mensaje: `${email} solicitó una demo de Perla Suite.`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === "false") throw new Error(data.message || res.statusText);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[28rem] bg-gradient-to-t from-brand/20 to-transparent blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <img src="/isotipo.svg" alt="" className="mx-auto size-16" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-5xl">{t.cta.title}</h2>
          <p className="mt-4 text-lg text-muted">{t.cta.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                className="glass mx-auto flex max-w-xl items-center justify-center gap-3 rounded-2xl p-6 text-left"
              >
                <CheckCircle2 className="size-6 shrink-0 text-accent" aria-hidden /> {t.cta.sent}
              </motion.p>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.97 }}
                onSubmit={requestDemo}
                className="glass mx-auto grid max-w-xl gap-3 rounded-3xl p-3 text-left sm:grid-cols-[1fr_auto_auto]"
              >
                <label className="sr-only" htmlFor="email">{t.cta.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.cta.email}
                  className="min-w-0 rounded-2xl bg-white/5 px-4 py-3 text-sm placeholder:text-muted focus:outline-2 focus:outline-brand"
                />
                <label className="sr-only" htmlFor="scale">{t.cta.scale}</label>
                <select id="scale" name="scale" className="rounded-2xl bg-white/5 px-3 py-3 text-sm focus:outline-2 focus:outline-brand">
                  {t.cta.scales.map((s) => (
                    <option key={s} className="bg-night">{s}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold transition hover:bg-brand-soft hover:text-ink disabled:opacity-60"
                >
                  <Send className="size-4" aria-hidden /> {status === "sending" ? t.cta.sending : t.cta.submit}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {status === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-300">{t.cta.error}</p>
          )}
          <p className="mt-4 text-xs text-muted">{t.cta.fine}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <img src="/isotipo.svg" alt="" className="size-7" />
          <span>{t.footer.tagline}</span>
        </div>
        <span>© {new Date().getFullYear()} La Perla Host. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
