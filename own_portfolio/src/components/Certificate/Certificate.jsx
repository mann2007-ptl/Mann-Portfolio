import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cssCertiImg from '../../assets/css-certi.png';
import cCertiImg from '../../assets/c-certifictate.jpg';
import cIntermediateCertiImg from '../../assets/c-intermediate-certi.jpg';
import cppCertiImg from '../../assets/cpp-certificate.jpg';
import swaminarayanUniCertiImg from '../../assets/swaminarayan-uni-certi.jpeg';
import './Certificate.css';

const certificates = [
    {
        id: 1,
        title: 'C Intermediate',
        provider: 'Sololearn',
        date: 'March 12, 2026',
        image: cIntermediateCertiImg,
    },
    {
        id: 2,
        title: 'Introduction to C',
        provider: 'Sololearn',
        date: 'March 06, 2026',
        image: cCertiImg,
    },
    {
        id: 3,
        title: 'CSS (Basic)',
        provider: 'HackerRank',
        date: 'Dec 15, 2025',
        image: cssCertiImg,
    },
    {
        id: 4,
        title: 'C++ Certificate',
        provider: 'Sololearn',
        date: '2026',
        image: cppCertiImg,
    },
    {
        id: 5,
        title: 'Swaminarayan University',
        provider: 'Swaminarayan University',
        date: '2026',
        image: swaminarayanUniCertiImg,
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
                                <img src={cert.image} alt={cert.title} />
                            </div>
                            <div className="cert-info">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-meta">
                                    <span className="cert-provider">{cert.provider}</span>
                                    <span className="cert-date">{cert.date}</span>
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
