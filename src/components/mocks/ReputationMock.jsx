import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useLang } from "../../i18n.jsx";
import { AppFrame, CountUp, Panel, useTimeline } from "./shared.jsx";

const MONTHS = [
  { own: 8.1, market: 8.0 },
  { own: 8.3, market: 8.1 },
  { own: 8.2, market: 8.0 },
  { own: 8.6, market: 8.1 },
  { own: 8.8, market: 8.2 },
  { own: 9.1, market: 8.2 },
];
const SENTIMENT = [74, -18, 61, 82];
const SOURCE_COLORS = { Booking: "bg-[#003b95]", Google: "bg-[#4285f4]", TripAdvisor: "bg-[#00aa6c]", Expedia: "bg-[#fbcc33] text-ink" };
const STEPS = [1100, 1100, 1100, 1400, 3200];

export default function ReputationMock({ playing }) {
  const { t } = useLang();
  const m = t.mock.reputation;
  const step = useTimeline(STEPS, playing);
  const shown = Math.min(step + 1, m.reviews.length);

  return (
    <AppFrame product="reputation">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1.1fr_1fr]">
        <Panel className="flex flex-col overflow-hidden">
          <p className="mb-3 text-xs font-semibold text-pearl">{m.inbox}</p>
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {m.reviews.slice(0, shown).map((r) => {
                const low = r.src === "TripAdvisor";
                const replied = !low || step >= 4;
                return (
                  <motion.li
                    key={r.src}
                    layout
                    initial={{ opacity: 0, y: -14, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.45 }}
                    className={`rounded-lg border px-3 py-2.5 ${low && step >= 3 ? "border-viz-rival/40 bg-viz-rival/5" : "border-white/8 bg-white/[0.03]"}`}
                  >
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={`rounded px-1.5 py-0.5 font-semibold ${SOURCE_COLORS[r.src]}`}>{r.src}</span>
                      <span className="font-bold tabular-nums">{r.score.toFixed(1)}</span>
                      <span className={`ml-auto inline-flex items-center gap-1 ${replied ? "text-accent" : "text-amber-300"}`}>
                        {replied ? <CheckCircle2 className="size-3.5" aria-hidden /> : <Clock className="size-3.5" aria-hidden />}
                        {replied ? m.replied : m.pending}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs text-pearl/80">{r.text}</p>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted">{m.score}</p>
                <p className="text-3xl font-extrabold">
                  <CountUp to={9.1} decimals={1} run={playing} />
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-viz-own/15 px-2 py-1 text-xs font-semibold text-[#9ec5f4]">
                <TrendingUp className="size-3.5" aria-hidden /> +0.9 {m.vsMarket}
              </span>
            </div>
            <div className="mt-4 flex h-24 items-end gap-2" role="img" aria-label={`${m.score}: 8.1 → 9.1`}>
              {MONTHS.map((mo, i) => (
                <div key={i} className="flex h-full flex-1 items-end gap-0.5">
                  <motion.div
                    className="flex-1 rounded-t bg-viz-own"
                    initial={{ height: 0 }}
                    animate={{ height: playing ? `${(mo.own - 7) * 32}%` : 0 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                  />
                  <motion.div
                    className="flex-1 rounded-t bg-[#52514e]"
                    initial={{ height: 0 }}
                    animate={{ height: playing ? `${(mo.market - 7) * 32}%` : 0 }}
                    transition={{ delay: i * 0.08 + 0.05, duration: 0.6 }}
                  />
                </div>
              ))}
            </div>
          </Panel>
          <Panel className="flex-1">
            <p className="mb-3 text-xs font-semibold text-pearl">{m.sentiment}</p>
            <ul className="space-y-2.5">
              {m.departments.map((d, i) => {
                const v = SENTIMENT[i];
                return (
                  <li key={d} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2 text-[11px]">
                    <span className="truncate text-muted">{d}</span>
                    <span className="relative h-2 rounded-full bg-white/5">
                      <span className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                      <motion.span
                        className={`absolute inset-y-0 rounded-full ${v >= 0 ? "left-1/2 bg-viz-own" : "right-1/2 bg-viz-negative"}`}
                        initial={{ width: 0 }}
                        animate={{ width: playing ? `${Math.abs(v) / 2}%` : 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                      />
                    </span>
                    <span className={`text-right font-semibold tabular-nums ${v >= 0 ? "text-[#9ec5f4]" : "text-[#f4a3a2]"}`}>
                      {v > 0 ? "+" : ""}
                      {v}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </AppFrame>
  );
}
