import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaAward, FaTrophy, FaCertificate } from 'react-icons/fa';
import VanillaTilt from 'vanilla-tilt';
import Magnetic from '../Magnetic/Magnetic';
import cssCertiImg from '../../assets/css-certi.png';
import cCertiImg from '../../assets/c-certifictate.jpg';
import cIntermediateCertiImg from '../../assets/c-intermediate-certi.jpg';
import cppCertiImg from '../../assets/cpp-certificate.jpg';
import introJsCertiImg from '../../assets/intro-javascript-certi.jpg';

import hackSprintImg from '../../assets/hacksprint-certi.jpg';
import icetaiImg from '../../assets/icetai-certi.jpg';

import './Certificate.css';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
    // ─── From Resume (New) ───
    {
        id: 'resume-1',
        title: 'HackSprint Hackathon — 3rd Place',
        provider: 'HackSprint',
        description: 'Team achievement for building Tales Beyond the Tomb (Multiplayer Horror Game)',
        icon: <FaTrophy />,
        image: hackSprintImg,
        link: 'https://drive.google.com/file/d/1Ycyd89W_QB_y6V-8yzEMgpvVgOCB4Lm_/view?usp=sharing'
    },
    {
        id: 'resume-2',
        title: 'ICETAI — Participation',
        provider: 'ICETAI',
        description: 'International Conference on Emerging Trends in Artificial Intelligence',
        icon: <FaAward />,
        image: icetaiImg,
        link: 'https://drive.google.com/file/d/1dv_qNs5cp725z0tMbgAJ5RTIDbWaNdKC/view?usp=sharing'
    },
    // ─── Existing Certificates (Kept) ───
    {
        id: 'old-1',
        title: 'C Intermediate',
        provider: 'Sololearn',
        description: 'Mastered intermediate C concepts including structs, pointers, and dynamic memory management.',
        icon: <FaCertificate />,
        image: cIntermediateCertiImg,
        link: null
    },
    {
        id: 'old-2',
        title: 'Introduction to C',
        provider: 'Sololearn',
        description: 'Built a strong foundation in C programming, pointers, and memory management.',
        icon: <FaCertificate />,
        image: cCertiImg,
        link: 'https://drive.google.com/file/d/1Lz7sHdBXmS0MdmUd-8WTsp7UYXU9-MR3/view?usp=sharing'
    },
    {
        id: 'old-3',
        title: 'CSS (Basic)',
        provider: 'HackerRank',
        description: 'Demonstrated core CSS skills including layouts, flexbox, and responsive design.',
        icon: <FaCertificate />,
        image: cssCertiImg,
        link: null
    },
    {
        id: 'old-4',
        title: 'Introduction to C++',
        provider: 'Sololearn',
        description: 'Mastered core concepts of C++ programming including object-oriented principles.',
        icon: <FaCertificate />,
        image: cppCertiImg,
        link: 'https://drive.google.com/file/d/1Jq6Bj6vvQ9OTVxXFjCTxwCsb70RvnpkW/view?usp=sharing'
    },
    {
        id: 'old-5',
        title: 'Intro to JavaScript',
        provider: 'Sololearn',
        description: 'Completed comprehensive JavaScript fundamentals including ES6+ syntax and DOM manipulation.',
        icon: <FaCertificate />,
        image: introJsCertiImg,
        link: null
    }
];

const Certificate = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.cert-card');
            
            gsap.fromTo(cards,
                { y: 80, opacity: 0, rotateX: 15, scale: 0.9 },
                { 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0, 
                    scale: 1,
                    duration: 1.2, 
                    stagger: 0.12, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: "play none none reverse"
                    },
                    onComplete: () => {
                        // Initialize VanillaTilt on cards after they animate in
                        cards.forEach(card => {
                            VanillaTilt.init(card, {
                                max: 8,
                                speed: 400,
                                glare: true,
                                "max-glare": 0.2,
                                perspective: 1000
                            });
                        });
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
                        The <span className="accent">Vault</span>
                    </h2>
                </div>

                <div className="cert-gallery" ref={containerRef}>
                    {certificates.map((cert) => (
                        <div key={cert.id} className="cert-card">
                            <div className="cert-image-wrapper">
                                {cert.image ? (
                                    <img 
                                        src={cert.image} 
                                        alt={cert.title} 
                                        className="cert-img" 
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="cert-fallback">
                                        {cert.icon}
                                    </div>
                                )}
                                {(cert.link) && (
                                    <div className="cert-overlay">
                                        <Magnetic strength={20}>
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-view-btn">
                                                View Credential <FaExternalLinkAlt className="cert-view-icon" />
                                            </a>
                                        </Magnetic>
                                    </div>
                                )}
                            </div>
                            
                            <div className="cert-content">
                                <div className="cert-meta">
                                    <span className="cert-icon">{cert.icon}</span>
                                    <span className="cert-provider">{cert.provider}</span>
                                </div>
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-desc">{cert.description}</p>
                            </div>
                            
                            {/* Decorative Glowing Border */}
                            <div className="cert-glow-border"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificate;
