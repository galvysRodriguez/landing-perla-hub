import { AnimatePresence, motion } from "motion/react";
import { BedDouble, CheckCircle2, Crown, Sparkles, UtensilsCrossed, Globe } from "lucide-react";
import { useLang } from "../../i18n.jsx";
import { AppFrame, CountUp, Panel, useTimeline } from "./shared.jsx";

const RECORDS = [
  { icon: BedDouble, source: "Opera PMS", name: "María González", detail: "Res. #48213 · 4 noches" },
  { icon: Sparkles, source: "Spa", name: "M. Gonzalez", detail: "maria.g@gmail.com" },
  { icon: UtensilsCrossed, source: "F&B", name: "Maria Gonzales", detail: "Hab. 214 · Cena" },
  { icon: Globe, source: "Booking.com", name: "Maria G.", detail: "m.gonz.4f2@guest.booking.com", alias: true },
];
const STEPS = [1800, 2200, 2600, 3200];

export default function CdpMock({ playing }) {
  const { t } = useLang();
  const m = t.mock.cdp;
  const step = useTimeline(STEPS, playing);
  const merged = step >= 2;

  return (
    <AppFrame product="cdp">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
        <Panel className="flex flex-col">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-pearl">{m.sources}</span>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-brand-soft">
                  {m.merging}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <ul className="flex flex-1 flex-col gap-2">
            {RECORDS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.li
                  key={r.source}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{
                    opacity: merged ? 0.45 : 1,
                    x: step === 1 ? 10 : 0,
                    scale: merged ? 0.97 : 1,
                  }}
                  transition={{ delay: step === 0 ? i * 0.15 : i * 0.06, duration: 0.5 }}
                  className={`relative flex items-center gap-3 overflow-hidden rounded-lg border px-3 py-2 ${step === 1 ? "border-brand/60 bg-brand/10" : "border-white/8 bg-white/[0.03]"}`}
                >
                  {step === 1 && (
                    <motion.span
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand-soft/25 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "300%" }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.1 }}
                    />
                  )}
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white/5">
                    <Icon className="size-4 text-pearl-shade" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{r.name}</span>
                    <span className={`block truncate text-[11px] ${r.alias && step === 3 ? "text-viz-rival line-through" : "text-muted"}`}>{r.detail}</span>
                  </span>
                  <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted">{r.source}</span>
                </motion.li>
              );
            })}
          </ul>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
              animate={{ width: step === 0 ? "0%" : step === 1 ? "75%" : "100%" }}
              transition={{ duration: step === 1 ? 2 : 0.4 }}
            />
          </div>
        </Panel>

        <Panel className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!merged ? (
              <motion.div key="skeleton" exit={{ opacity: 0 }} className="flex h-full flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-14 animate-pulse rounded-full bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 animate-pulse rounded bg-white/5" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-white/5" />
                  </div>
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-14 animate-pulse rounded-lg bg-white/[0.04]" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-lg font-bold">
                    MG
                    <CheckCircle2 className="absolute -bottom-0.5 -right-0.5 size-5 rounded-full bg-surface text-accent" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">{m.merged}</p>
                    <p className="truncate text-lg font-bold">María González</p>
                    <p className="truncate text-xs text-muted">maria.g@gmail.com · +58 414 ···· 21</p>
                  </div>
                  <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    <Crown className="size-3.5" aria-hidden /> {m.tier}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Stat label={m.stays} value={<CountUp to={7} run={merged} />} />
                  <Stat label={m.ltv} value={<CountUp to={4820} prefix="$" run={merged} />} />
                  <Stat label={m.direct} value={<span className="text-accent">{m.directOn}</span>} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.prefs.map((p, i) => (
                    <motion.span
                      key={p}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-pearl"
                    >
                      {p}
                    </motion.span>
                  ))}
                </div>
                <AnimatePresence>
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-auto flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-3"
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden />
                      <div className="min-w-0 text-xs">
                        <p className="font-semibold text-white">{m.aliasFound}</p>
                        <p className="truncate text-muted">m.gonz.4f2@guest.booking.com → maria.g@gmail.com · {m.match}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
      </div>
    </AppFrame>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-2.5">
      <p className="text-[10px] uppercase leading-tight tracking-wider text-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-bold sm:text-base">{value}</p>
    </div>
  );
}
