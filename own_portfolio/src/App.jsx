import React, { useEffect, Suspense, lazy, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Preloader from './components/Preloader/Preloader';
import SEO from './components/SEO/SEO';
import { isMobileDevice } from './hooks/useDeviceDetect';
import LazySection from './components/LazySection/LazySection';
import './App.css';

// Lazy-load CustomCursor — only on desktop
const CustomCursor = lazy(() => import('./components/CustomCursor/CustomCursor'));

// Route & Component Level Code Splitting
const About = lazy(() => import('./components/About/About'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Hackathon = lazy(() => import('./components/Hackathon/Hackathon'));
const Marquee = lazy(() => import('./components/Marquee/Marquee'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Certificate = lazy(() => import('./components/Certificate/Certificate'));
const LeetCode = lazy(() => import('./components/LeetCode/LeetCode'));
const Education = lazy(() => import('./components/Education/Education'));
const Contact = lazy(() => import('./components/Contact/Contact'));

const SectionLoader = () => (
  <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: 0.1 }}>
    Loading section...
  </div>
);

const isDesktop = !isMobileDevice();

function HomePage({ loading }) {
  return (
    <main className="main-content">
      <SEO />
      <Hero loading={loading} />

      {/* Component-level viewport intersection loading */}
      <LazySection threshold="800px"><Marquee /></LazySection>
      <LazySection threshold="800px"><About /></LazySection>
      <LazySection threshold="800px"><Skills /></LazySection>
      <LazySection threshold="800px"><Hackathon /></LazySection>
      <LazySection threshold="800px"><Projects /></LazySection>
      <LazySection threshold="800px"><Certificate /></LazySection>
      <LazySection threshold="800px"><LeetCode /></LazySection>
      <LazySection threshold="800px"><Education /></LazySection>
      <LazySection threshold="800px"><Contact /></LazySection>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="main-content">
      <SEO title="About Mann Patel | Full-Stack Developer" description="Learn more about my background, experience, and passion for building scalable web applications and intuitive interfaces." />
      <Suspense fallback={<SectionLoader />}><About /></Suspense>
    </main>
  );
}

function SkillsPage() {
  return (
    <main className="main-content">
      <SEO title="Skills & Technologies | Mann Patel" description="Discover my technical skill set including React, Node.js, Express, MongoDB, TailwindCSS, GSAP, and Three.js." />
      <Suspense fallback={<SectionLoader />}><Skills /></Suspense>
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="main-content">
      <SEO title="Projects & Portfolio | Mann Patel" description="View my latest full-stack projects, creative web designs, and interactive technical solutions." />
      <Suspense fallback={<SectionLoader />}><Projects /></Suspense>
    </main>
  );
}

function CertificatesPage() {
  return (
    <main className="main-content">
      <SEO title="Certifications | Mann Patel" description="Explore my professional certifications and continuous learning achievements in Software Engineering." />
      <Suspense fallback={<SectionLoader />}><Certificate /></Suspense>
    </main>
  );
}

function EducationPage() {
  return (
    <main className="main-content">
      <SEO title="Education | Mann Patel" description="My academic background, degrees, and the foundational education that drives my engineering career." />
      <Suspense fallback={<SectionLoader />}><Education /></Suspense>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="main-content">
      <SEO title="Contact Mann Patel | Hire Me" description="Get in touch for freelance opportunities, job offers, or collaborations. Let's build something amazing together." />
      <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
    </main>
  );
}

function HackathonPage() {
  return (
    <main className="main-content">
      <SEO title="Hackathons & Achievements | Mann Patel" description="Check out my hackathon wins, participation, and the innovative products built under intense deadlines." />
      <Suspense fallback={<SectionLoader />}><Hackathon /></Suspense>
    </main>
  );
}

function LeetCodePage() {
  return (
    <main className="main-content">
      <SEO title="LeetCode Profile & DSA | Mann Patel" description="Review my Data Structures and Algorithms progress, problem-solving skills, and LeetCode achievements." />
      <Suspense fallback={<SectionLoader />}><LeetCode /></Suspense>
    </main>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [smoothScrollReady, setSmoothScrollReady] = useState(false);

  // Defer GSAP, and skip Lenis entirely on mobile
  const initSmoothScroll = useCallback(() => {
    Promise.all([
      isDesktop ? import('lenis') : Promise.resolve(null),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([LenisModule, gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      // Only initialize Lenis on Desktop
      if (typeof LenisModule?.default === 'function') {
        const Lenis = LenisModule.default;
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

        const rafFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(rafFn);
        gsap.ticker.lagSmoothing(0);

        window.__lenis = lenis;
        window.__lenisRaf = rafFn;
      }

      setSmoothScrollReady(true);
    });
  }, []);

  useEffect(() => {
    // Use requestIdleCallback to defer GSAP initialization
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(initSmoothScroll, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      // Fallback: defer to next frame
      const timer = setTimeout(initSmoothScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [initSmoothScroll]);

  useEffect(() => {
    if (!loading) {
      // Refresh ScrollTrigger after preloader exits
      const timer = setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 200);

      window.scrollTo(0, 0);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.__lenis) {
        window.__lenis.destroy();
        import('gsap').then(({ default: gsap }) => {
          if (window.__lenisRaf) gsap.ticker.remove(window.__lenisRaf);
        });
      }
    };
  }, []);

  return (
    <div className="app-container">
      {/* CustomCursor only on desktop */}
      {isDesktop && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      {/* Preloader overlay */}
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