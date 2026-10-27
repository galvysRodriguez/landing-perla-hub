import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { Bell, Mail, MessageCircle, Search, Star, Users } from "lucide-react";
import { useLang } from "../../i18n.jsx";

export const PRODUCT_ICONS = { cdp: Users, reputation: Star, feedback: MessageCircle, marketing: Mail };
const ORDER = ["cdp", "reputation", "feedback", "marketing"];

/**
 * Steps through `durations` (ms per step) while `playing`, then starts over.
 * Returns the current step index.
 */
export function useTimeline(durations, playing) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => clearTimeout(id);
  }, [step, playing, durations]);
  return step;
}

/** A number that counts up to `to` whenever `run` turns true. */
export function CountUp({ to, run, decimals = 0, prefix = "", suffix = "", duration = 1.4 }) {
  const { lang } = useLang();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: setValue });
    return () => controls.stop();
  }, [run, to, duration]);
  const text = value.toLocaleString(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: "always" });
  return (
    <span className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/** The Perla app chrome: browser bar, product sidebar and top bar, like perla-front. */
export function AppFrame({ product, children }) {
  const { t } = useLang();
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-night shadow-2xl shadow-brand/20">
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink/80 px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden truncate rounded-md bg-white/5 px-3 py-1 text-xs text-muted sm:block">
          app.perlahub.com/es/{product}
        </span>
      </div>
      <div className="flex">
        <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-white/5 bg-[#0b1124] p-3 md:flex">
          <div className="mb-3 flex items-center gap-2 px-2 py-1">
            <img src="/isotipo.svg" alt="" className="size-6" />
            <span className="text-sm font-bold">Perla</span>
          </div>
          {ORDER.map((key) => {
            const Icon = PRODUCT_ICONS[key];
            const active = key === product;
            return (
              <div
                key={key}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${active ? "bg-brand/15 font-semibold text-brand-soft" : "text-muted"}`}
              >
                <Icon className="size-4" aria-hidden />
                {t.demo.tabs[key].name}
              </div>
            );
          })}
          <div className="mt-auto rounded-lg border border-white/5 p-2.5 text-[11px] leading-snug text-muted">{t.mock.property}</div>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 border-b border-white/5 px-4 py-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-muted">
              <Search className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{t.mock.search}</span>
            </div>
            <Bell className="size-4 text-muted" aria-hidden />
            <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-[11px] font-bold">GR</div>
          </div>
          <div className="p-4 sm:p-5 md:h-[480px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Panel({ className = "", children, ...props }) {
  return (
    <motion.div className={`rounded-xl border border-white/8 bg-surface/80 p-4 ${className}`} {...props}>
      {children}
    </motion.div>
  );
}
