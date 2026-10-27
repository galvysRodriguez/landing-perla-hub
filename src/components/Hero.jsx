import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useLang } from "../i18n.jsx";

const PearlScene = lazy(() => import("./PearlScene.jsx"));

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t } = useLang();
  const section = useRef(null);
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Stop rendering the 3D scene once the hero is off screen.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(section.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" ref={section} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0 -z-20" />
      <div className="absolute -top-40 left-1/2 -z-20 h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" />
      <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-x-0 -top-[18%] bottom-[30%] -z-10 opacity-35 sm:inset-0 sm:opacity-60 lg:left-[38%] lg:opacity-100">
        <Suspense fallback={<div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pearl via-brand-soft to-accent opacity-30 blur-2xl" />}>
          <PearlScene active={visible} />
        </Suspense>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={{ y: textY }}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6"
      >
        <div className="max-w-2xl">
          <motion.a variants={item} href="#demo" className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-pearl sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.hero.badge}
          </motion.a>
          <motion.h1 variants={item} className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-pearl/75 text-pretty">
            {t.hero.subtitle}
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition hover:bg-pearl">
              <PlayCircle className="size-5" aria-hidden />
              {t.hero.primary}
            </a>
            <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/5">
              {t.hero.secondary}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </a>
          </motion.div>
          <motion.dl variants={item} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="border-l border-white/10 pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-white">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
