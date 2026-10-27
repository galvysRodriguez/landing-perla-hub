import { motion } from "motion/react";
import { Clock, GitBranch, LogOut, MessageCircle, Trophy } from "lucide-react";
import { useLang } from "../../i18n.jsx";
import { AppFrame, CountUp, Panel, useTimeline } from "./shared.jsx";

const NODE_ICONS = [LogOut, Clock, GitBranch, MessageCircle, Trophy];
const ATTRS = ["stays ≥ 2", "canal = OTA", "LTV > $1.500", "idioma = es", "opt-in WhatsApp"];
const STEPS = [900, 900, 900, 900, 900, 3200];

export default function MarketingMock({ playing }) {
  const { t } = useLang();
  const m = t.mock.marketing;
  const step = useTimeline(STEPS, playing);
  const reached = Math.min(step, m.nodes.length - 1);
  const done = step >= m.nodes.length;

  return (
    <AppFrame product="marketing">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col gap-4">
          <Panel>
            <p className="text-[10px] uppercase tracking-wider text-muted">{m.segment}</p>
            <p className="mt-1 text-sm font-semibold">{m.segmentName}</p>
            <p className="mt-3 text-3xl font-extrabold">
              <CountUp to={1284} run={playing} />
              <span className="ml-1.5 text-sm font-medium text-muted">{m.audience}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ATTRS.map((a, i) => (
                <motion.code
                  key={a}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: playing ? 1 : 0, scale: playing ? 1 : 0.85 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] text-brand-soft"
                >
                  {a}
                </motion.code>
              ))}
              <span className="rounded-md px-2 py-0.5 text-[10px] text-muted">+104 {m.attrs}</span>
            </div>
          </Panel>
          <div className="grid grid-cols-3 gap-2">
            <Kpi label={m.kpi1} value={<CountUp to={58} suffix=" %" run={done} />} />
            <Kpi label={m.kpi2} value={<CountUp to={193} run={done} />} />
            <Kpi label={m.kpi3} value={<CountUp to={11640} prefix="$" run={done} />} highlight />
          </div>
        </div>

        <Panel className="relative flex flex-col justify-center">
          <ol className="relative flex flex-col gap-3">
            {/* Connector rail, filled as the guest moves down the journey. */}
            <span className="absolute bottom-5 left-[19px] top-5 w-0.5 rounded bg-white/10" aria-hidden />
            <motion.span
              className="absolute left-[19px] top-5 w-0.5 origin-top rounded bg-gradient-to-b from-brand to-accent"
              style={{ height: "calc(100% - 2.5rem)" }}
              animate={{ scaleY: reached / (m.nodes.length - 1) }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              aria-hidden
            />
            {m.nodes.map((label, i) => {
              const Icon = NODE_ICONS[i];
              const on = i <= reached;
              const last = i === m.nodes.length - 1;
              return (
                <li key={label} className="relative flex items-center gap-3">
                  <motion.span
                    animate={{ scale: i === reached ? [1, 1.15, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-500 ${
                      on ? (last ? "border-accent bg-accent text-ink" : "border-brand bg-brand text-white") : "border-white/10 bg-surface text-muted"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden />
                  </motion.span>
                  <span
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs transition-colors duration-500 ${
                      on ? "border-white/15 bg-white/[0.06] text-white" : "border-white/5 text-muted"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </Panel>
      </div>
    </AppFrame>
  );
}

function Kpi({ label, value, highlight }) {
  return (
    <div className={`rounded-xl border p-2.5 ${highlight ? "border-accent/30 bg-accent/10" : "border-white/8 bg-surface/80"}`}>
      <p className="min-h-[2lh] text-[10px] uppercase leading-tight tracking-wider text-muted">{label}</p>
      <p className={`mt-1 truncate text-base font-bold ${highlight ? "text-accent" : ""}`}>{value}</p>
    </div>
  );
}
