import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Hackathon from './components/Hackathon/Hackathon';
import Marquee from './components/Marquee/Marquee';
import Projects from './components/Projects/Projects';
import Certificate from './components/Certificate/Certificate';
import LeetCode from './components/LeetCode/LeetCode';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Preloader from './components/Preloader/Preloader';
import { motion } from 'framer-motion';
import './App.css';

function HomePage({ loading }) {
  return (
    <main className="main-content">
      <Hero loading={loading} />
      <Marquee />
      <About />
      <Skills />
      <Hackathon />
      <Projects />
      <Certificate />
      <LeetCode />
      <Education />
      <Contact />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="main-content">
      <About />
    </main>
  );
}

function SkillsPage() {
  return (
    <main className="main-content">
      <Skills />
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="main-content">
      <Projects />
    </main>
  );
}

function CertificatesPage() {
  return (
    <main className="main-content">
      <Certificate />
    </main>
  );
}

function EducationPage() {
  return (
    <main className="main-content">
      <Education />
    </main>
  );
}

function ContactPage() {
  return (
    <main className="main-content">
      <Contact />
    </main>
  );
}

function HackathonPage() {
  return (
    <main className="main-content">
      <Hackathon />
    </main>
  );
}

function LeetCodePage() {
  return (
    <main className="main-content">
      <LeetCode />
    </main>
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <div className="app-container">
      <CustomCursor />

      {/* Preloader overlay sits strictly on top using z-index, but doesn't block DOM parsing underneath */}
      {loading && <Preloader setLoading={setLoading} />}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage loading={loading} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/hackathon" element={<HackathonPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/leetcode" element={<LeetCodePage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;