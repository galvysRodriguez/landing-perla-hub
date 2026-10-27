import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { RotateCcw, Video, Zap } from "lucide-react";
import { useLang } from "../i18n.jsx";
import { SectionHeading } from "./Reveal.jsx";
import { PRODUCT_ICONS } from "./mocks/shared.jsx";
import CdpMock from "./mocks/CdpMock.jsx";
import ReputationMock from "./mocks/ReputationMock.jsx";
import FeedbackMock from "./mocks/FeedbackMock.jsx";
import MarketingMock from "./mocks/MarketingMock.jsx";

const MOCKS = { cdp: CdpMock, reputation: ReputationMock, feedback: FeedbackMock, marketing: MarketingMock };
const KEYS = Object.keys(MOCKS);

// Recordly exports dropped in src/assets/demos/<product>.mp4 (and an optional
// <product>.webp/.jpg poster) replace that product's live simulation.
const videos = import.meta.glob("../assets/demos/*.{mp4,webm}", { eager: true, query: "?url", import: "default" });
const posters = import.meta.glob("../assets/demos/*.{webp,jpg,png}", { eager: true, query: "?url", import: "default" });
const assetFor = (files, key) => Object.entries(files).find(([path]) => path.split("/").pop().split(".")[0] === key)?.[1];

export default function DemoShowcase() {
  const { t } = useLang();
  const [active, setActive] = useState("cdp");
  const [run, setRun] = useState(0);
  const stage = useRef(null);
  const inView = useInView(stage, { margin: "-15% 0px" });
  const Mock = MOCKS[active];
  const video = assetFor(videos, active);

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-[30rem] bg-gradient-to-r from-brand/10 via-accent/10 to-brand/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.demo.eyebrow} title={t.demo.title} subtitle={t.demo.subtitle} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-8">
          <div role="tablist" aria-label={t.nav.products} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {KEYS.map((key) => {
              const Icon = PRODUCT_ICONS[key];
              const tab = t.demo.tabs[key];
              const selected = key === active;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="demo-stage"
                  onClick={() => {
                    setActive(key);
                    setRun((r) => r + 1);
                  }}
                  className={`relative min-w-[13rem] shrink-0 rounded-2xl border p-4 text-left transition lg:min-w-0 ${
                    selected ? "border-brand/50 bg-surface" : "border-white/8 bg-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  {selected && (
                    <motion.span layoutId="tab-glow" className="absolute inset-0 -z-10 rounded-2xl bg-brand/10 shadow-[0_0_40px_-8px] shadow-brand/60" />
                  )}
                  <span className="flex items-center gap-2.5">
                    <span className={`grid size-8 place-items-center rounded-lg ${selected ? "bg-brand text-white" : "bg-white/5 text-muted"}`}>
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold">{tab.name}</span>
                  </span>
                  <span className="mt-2 block text-sm font-medium text-white">{tab.title}</span>
                  <span className={`mt-1 text-xs leading-relaxed text-muted ${selected ? "block" : "hidden lg:block"}`}>{tab.text}</span>
                </button>
              );
            })}
          </div>

          <div id="demo-stage" role="tabpanel" ref={stage} className="min-w-0">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-muted">
                {video ? <Video className="size-3.5 text-accent" aria-hidden /> : <Zap className="size-3.5 text-accent" aria-hidden />}
                {video ? t.demo.recorded : t.demo.live}
              </span>
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-muted transition hover:bg-white/5 hover:text-white"
              >
                <RotateCcw className="size-3.5" aria-hidden /> {t.demo.replay}
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${run}`}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {video ? (
                  <RecordlyVideo src={video} poster={assetFor(posters, active)} playing={inView} label={t.demo.tabs[active].title} />
                ) : (
                  <Mock playing={inView} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A Recordly export: it already carries its own background, zooms and cursor, so no extra frame. */
function RecordlyVideo({ src, poster, playing, label }) {
  const ref = useRef(null);
  useEffect(() => {
    if (playing) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [playing]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      className="w-full rounded-2xl shadow-2xl shadow-brand/20"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
