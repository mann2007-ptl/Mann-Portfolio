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
        image: cIntermediateCertiImg,
    },
    {
        id: 2,
        title: 'Introduction to C',
        provider: 'Sololearn',
        image: cCertiImg,
    },
    {
        id: 3,
        title: 'CSS (Basic)',
        provider: 'HackerRank',
        image: cssCertiImg,
    },
    {
        id: 4,
        title: 'C++ Certificate',
        provider: 'Sololearn',
        image: cppCertiImg,
    },
    {
        id: 6,
        title: 'Intro to JavaScript',
        provider: 'Sololearn',
        image: introJsCertiImg,
    }
];

gsap.registerPlugin(ScrollTrigger);

const Certificate = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.monolith-card',
                { y: 100, opacity: 0, rotationX: 10 },
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationX: 0, 
                    duration: 1.2, 
                    stagger: 0.15, 
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.monolith-grid',
                        start: 'top 85%',
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="certificates" className="certificate-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">04. Recognition</span>
                    <h2 className="section-title">
                        The <span className="accent">Monoliths</span>
                    </h2>
                </div>

                <div className="monolith-grid">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="monolith-card">
                            <div className="monolith-inner">
                                {/* Front: Dark Monolith */}
                                <div className="monolith-front">
                                    <div className="monolith-provider">{cert.provider}</div>
                                    <div className="monolith-divider"></div>
                                    <h3 className="monolith-title">{cert.title}</h3>
                                </div>
                                
                                {/* Back: Glowing Certificate Image */}
                                <div className="monolith-back">
                                    <img src={cert.image} alt={cert.title} loading="lazy" className="monolith-image" />
                                    <div className="monolith-glow"></div>
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
