import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCheck, ShieldCheck, Wrench } from "lucide-react";
import { useLang } from "../../i18n.jsx";
import { AppFrame, Panel, useTimeline } from "./shared.jsx";

const STEPS = [1400, 1000, 1300, 1500, 1400, 1700, 3200];

export default function FeedbackMock({ playing }) {
  const { t } = useLang();
  const m = t.mock.feedback;
  const step = useTimeline(STEPS, playing);
  const messages = [
    { at: 0, from: "hotel", text: m.q1 },
    { at: 1, from: "guest", text: m.a1 },
    { at: 2, from: "hotel", text: m.q2 },
    { at: 3, from: "guest", text: m.a2 },
    { at: 5, from: "hotel", text: m.q3 },
  ].filter((msg) => step >= msg.at);
  const timeline = [
    { at: 3, icon: AlertTriangle, tone: "text-viz-rival bg-viz-rival/10 border-viz-rival/30", title: m.alertTitle, text: m.alertText },
    { at: 4, icon: Wrench, tone: "text-brand-soft bg-brand/10 border-brand/30", title: m.assigned, text: "Carlos R. · 14:32" },
    { at: 5, icon: CheckCheck, tone: "text-accent bg-accent/10 border-accent/30", title: m.resolved, text: "15:10" },
  ].filter((e) => step >= e.at);

  return (
    <AppFrame product="feedback">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[minmax(0,15rem)_1fr]">
        {/* Guest's phone */}
        <div className="mx-auto flex h-[400px] w-full max-w-[15rem] flex-col overflow-hidden rounded-[1.75rem] border-4 border-[#1f2937] bg-[#0b141a] md:h-full">
          <div className="flex items-center gap-2 bg-[#202c33] px-3 py-2.5">
            <img src="/isotipo.svg" alt="" className="size-7 rounded-full bg-white p-0.5" />
            <div className="leading-tight">
              <p className="text-xs font-semibold">{m.chatName}</p>
              <p className="text-[10px] text-[#8696a0]">{m.online}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden p-2.5">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.p
                  key={msg.at}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-[11px] leading-snug ${msg.from === "guest" ? "self-end bg-[#005c4b]" : "self-start bg-[#202c33]"}`}
                >
                  {msg.text}
                </motion.p>
              ))}
            </AnimatePresence>
            {(step === 0 || step === 2 || step === 4) && (
              <div className="flex gap-1 self-start rounded-lg bg-[#202c33] px-3 py-2" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-[#8696a0]"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Front desk side */}
        <Panel className="flex flex-col">
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["NPS", "+62"],
              ["CSAT", "4.6"],
              [m.alerts, step >= 3 ? "1" : "0"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/[0.04] p-2">
                <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
                <p className="text-lg font-bold tabular-nums">{value}</p>
              </div>
            ))}
          </div>
          <ol className="relative flex flex-1 flex-col gap-3 border-l border-white/10 pl-5">
            <AnimatePresence>
              {timeline.map((e) => {
                const Icon = e.icon;
                return (
                  <motion.li
                    key={e.at}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className={`relative rounded-lg border p-3 ${e.tone}`}
                  >
                    <span className="absolute -left-[27px] top-3.5 size-3 rounded-full border-2 border-night bg-current" />
                    <p className="flex items-center gap-2 text-xs font-semibold">
                      <Icon className="size-4" aria-hidden /> {e.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-pearl/75">{e.text}</p>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent/20 to-brand/20 py-2.5 text-sm font-semibold"
              >
                <ShieldCheck className="size-4 text-accent" aria-hidden /> {m.saved}
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
      </div>
    </AppFrame>
  );
}
