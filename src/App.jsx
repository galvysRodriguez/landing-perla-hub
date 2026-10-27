import { motion, useScroll, useSpring } from "motion/react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import DemoShowcase from "./components/DemoShowcase.jsx";
import { Compare, Contact, Footer, Integrations, Model, Products, Security } from "./components/Sections.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-soft to-accent" />
      <Nav />
      <main>
        <Hero />
        <DemoShowcase />
        <Products />
        <Compare />
        <Integrations />
        <Security />
        <Model />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
