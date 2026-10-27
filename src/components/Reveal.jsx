import { motion } from "motion/react";

/** Fades and lifts its children in the first time they scroll into view. */
export default function Reveal({ children, delay = 0, y = 24, className, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted text-pretty">{subtitle}</p>}
    </Reveal>
  );
}
