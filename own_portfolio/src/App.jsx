import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Marquee from './components/Marquee/Marquee';
import Projects from './components/Projects/Projects';
import Certificate from './components/Certificate/Certificate';
import LeetCode from './components/LeetCode/LeetCode';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ParallaxSection from './components/ParallaxSection/ParallaxSection';
import Preloader from './components/Preloader/Preloader';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [loading, setLoading] = React.useState(true);
  // Initialize Lenis for global smooth scrolling
  useEffect(() => {
    // Register ScrollTrigger early
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP's internal ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />

      {/* Show Preloader while loading is true */}
      {loading && <Preloader setLoading={setLoading} />}

      {/* Main Content Reveal */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <Navbar />

          <main className="main-content">
            <Hero />
            <Marquee />

            <ParallaxSection speed={0.2} className="relative z-10">
              <About />
            </ParallaxSection>

            <ParallaxSection speed={0.15} className="relative z-20">
              <Skills />
            </ParallaxSection>

            <ParallaxSection speed={0.25} className="relative z-30">
              <Projects />
            </ParallaxSection>

            <ParallaxSection speed={0.1} className="relative z-20">
              <Certificate />
            </ParallaxSection>

            <ParallaxSection speed={0.2} className="relative z-10">
              <LeetCode />
            </ParallaxSection>

            <ParallaxSection speed={0.15} className="relative z-20">
              <Education />
            </ParallaxSection>

            <ParallaxSection speed={0.05} className="relative z-30">
              <Contact />
            </ParallaxSection>
          </main>
        </motion.div>
      )}
    </div>
  );
}

export default App;
