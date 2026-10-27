import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLang } from "../i18n.jsx";

const LINKS = ["demo", "products", "compare", "integrations", "model"];

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent"}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Perla Suite">
          <img src="/isotipo.svg" alt="" className="size-8" />
          <span className="text-[15px] font-bold leading-tight">
            La Perla Host
            <span className="hidden text-[11px] font-medium tracking-wide text-muted sm:block">Hospitality Intelligence</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((key) => (
            <li key={key}>
              <a href={`#${key}`} className="rounded-full px-3.5 py-2 text-sm text-pearl/80 transition hover:bg-white/5 hover:text-white">
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/10 p-0.5 text-xs font-semibold" role="group" aria-label="Idioma / Language">
            {["es", "en"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-2.5 py-1 uppercase transition ${lang === code ? "bg-white/10 text-white" : "text-muted hover:text-white"}`}
              >
                {code}
              </button>
            ))}
          </div>
          <a href="#contact" className="whitespace-nowrap rounded-full bg-brand px-3.5 py-2 text-xs font-semibold sm:px-4 sm:text-sm text-white shadow-lg shadow-brand/30 transition hover:bg-brand-soft hover:text-ink">
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
