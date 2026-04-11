import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cssCertiImg from '../../assets/css-certi.png';
import cCertiImg from '../../assets/c-certifictate.jpg';
import cIntermediateCertiImg from '../../assets/c-intermediate-certi.jpg';
import cppCertiImg from '../../assets/cpp-certificate.jpg';
import introJsCertiImg from '../../assets/intro-javascript-certi.jpg';
import './Certificate.css';

const certificates = [
    {
        id: 1,
        title: 'C Intermediate',
        provider: 'Sololearn',
        date: 'March 12, 2026',
        description: 'Intermediate-level C programming certification covering pointers, memory management, and data structures.',
        image: cIntermediateCertiImg,
    },
    {
        id: 2,
        title: 'Introduction to C',
        provider: 'Sololearn',
        date: 'March 06, 2026',
        description: 'Foundational C programming certificate covering variables, loops, functions, and basic algorithms.',
        image: cCertiImg,
    },
    {
        id: 3,
        title: 'CSS (Basic)',
        provider: 'HackerRank',
        date: 'Dec 15, 2025',
        description: 'CSS basics certification covering selectors, box model, flexbox, and responsive design fundamentals.',
        image: cssCertiImg,
    },
    {
        id: 4,
        title: 'C++ Certificate',
        provider: 'Sololearn',
        date: '2026',
        description: 'C++ programming certificate covering OOP concepts, templates, STL, and advanced language features.',
        image: cppCertiImg,
    },
    {
        id: 6,
        title: 'Introduction to JavaScript',
        provider: 'Sololearn',
        date: 'March 30, 2026',
        description: 'Foundational JavaScript certificate covering variables, data types, functions, and core programming concepts.',
        image: introJsCertiImg,
    }
];

gsap.registerPlugin(ScrollTrigger);

const Certificate = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo('.section-label, .section-title',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            )
                .fromTo('.cert-card',
                    { y: 60, opacity: 0, rotationY: 10, scale: 0.95 },
                    { y: 0, opacity: 1, rotationY: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'expo.out' },
                    "-=0.4"
                );

            // Subtle image parallax
            gsap.utils.toArray('.cert-image img').forEach(img => {
                gsap.to(img, {
                    scale: 1.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.closest('.cert-card'),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="certificates" className="certificate-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">Achievements</span>
                    <h2 className="section-title">
                        My <span className="accent">Certifications</span>
                    </h2>
                </div>

                <div className="cert-grid">
                    {certificates.map((cert, index) => (
                        <div key={cert.id} className="cert-card">
                            <div className="cert-image">
                                <img src={cert.image} alt={cert.title} loading="lazy" />
                            </div>
                            <div className="cert-info">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-meta">
                                    <span className="cert-provider">{cert.provider}</span>
                                    <span className="cert-date">{cert.date}</span>
                                </div>
                            </div>
                            <div className="cert-hover-overlay">
                                <div className="cert-hover-content">
                                    <span className="cert-hover-badge">{cert.provider}</span>
                                    <h3 className="cert-hover-title">{cert.title}</h3>
                                    <p className="cert-hover-desc">{cert.description}</p>
                                    <div className="cert-hover-date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        <span>{cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificate;
