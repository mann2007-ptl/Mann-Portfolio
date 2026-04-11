import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import userPhoto from '../../assets/photo.jpeg';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ children, className = '', options = {} }) => {
    const tiltRef = useRef(null);
    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                ...options
            });
        }
        return () => {
            if (tiltRef.current && tiltRef.current.vanillaTilt) {
                tiltRef.current.vanillaTilt.destroy();
            }
        };
    }, [options]);

    return (
        <div ref={tiltRef} className={`tilt-card ${className}`}>
            {children}
        </div>
    );
};

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const textLines = gsap.utils.toArray('.about-text-reveal');
            textLines.forEach((text) => {
                gsap.fromTo(text,
                    { y: 40, opacity: 0, rotationX: 45 },
                    { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: text, start: 'top 85%', toggleActions: "play none none reverse" } }
                );
            });

            gsap.fromTo('.about-stat',
                { y: 60, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.about-stats', start: 'top 80%', toggleActions: "play none none reverse" } }
            );

            const tl = gsap.timeline({ scrollTrigger: { trigger: '.experience-timeline', start: 'top 75%', toggleActions: "play none none reverse" } });

            tl.fromTo('.timeline-title-text',
                { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.8 }
            )
                .fromTo('.exp-line',
                    { height: 0 }, { height: '100%', duration: 1.5, ease: 'power2.inOut' }, "-=0.4"
                )
                .fromTo('.timeline-dot',
                    { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.3, ease: 'back.out(2)' }, "-=1.2"
                )
                .fromTo('.experience-item-content',
                    { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out' }, "-=1"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { number: '05+', label: 'Projects Completed' },
        { number: '01+', label: 'Years Coding' },
        { number: '10+', label: 'Technologies' },
        { number: '100+', label: 'LeetCode Problems' },
    ];

    const experiences = [
        {
            role: 'Full-Stack Developer',
            type: 'Self-Learning & Projects',
            period: '2025 — Present',
            description: 'Building production-ready web applications using the MERN stack with cinematic frontend aesthetics.'
        },
        {
            role: 'Computer Engineering Student',
            type: 'Swaminarayan University',
            period: '2025 — Present',
            description: 'Pursuing B.E. in Computer Engineering, focusing on core algorithm concepts and web architectures.'
        },
        {
            role: 'Frontend Developer',
            type: 'Personal Projects',
            period: '2024 — 2025',
            description: 'Mastered frontend fundamentals through intensive cloning and crafting of premium responsive UI.'
        }
    ];

    return (
        <section id="about" className="about-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center mb-20">
                    <span className="section-label neon-text-cyan">Prologize</span>
                    <h2 className="section-title">
                        My career & <span className="gradient-text italic">experience</span>
                    </h2>
                </div>

                <div className="about-grid">
                    <TiltCard className="about-image-wrapper glass-panel" options={{ max: 10, scale: 1.02 }}>
                        <img src={userPhoto} alt="Mann Patel" className="about-image" loading="lazy" />
                        <div className="corner-accent top-left"></div>
                        <div className="corner-accent bottom-right"></div>
                    </TiltCard>

                    <div className="about-content-wrapper">
                        <div className="about-text-block">
                            <ScrollReveal type="paragraph" className="about-intro-text" stagger={0.03}>
                                I am a Computer Engineering student based in Gujarat, India.
                                My journey in web development started with a curiosity for internet mechanics,
                                which has explosive-evolved into an obsession for creating award-winning level digital experiences.
                            </ScrollReveal>
                            <ScrollReveal type="paragraph" className="about-sub-text" delay={0.2} stagger={0.03}>
                                Specializing in the MERN stack,
                                my true passion is frontend engineering—fusing bleeding-edge technology like
                                WebGL, GSAP, and cinematic design to build things that make people say wow.
                            </ScrollReveal>
                        </div>

                        <div className="about-stats">
                            {stats.map((stat, i) => (
                                <TiltCard key={i} className="about-stat glass-panel" options={{ max: 20, scale: 1.05 }}>
                                    <span className="stat-number gradient-text">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="experience-timeline">
                    <h3 className="timeline-title-text">The Journey</h3>

                    <div className="timeline-container">
                        {/* Center glowing line */}
                        <div className="timeline-center-line">
                            <div className="exp-line"></div>
                        </div>

                        {experiences.map((exp, i) => (
                            <div key={i} className={`experience-item ${i % 2 === 0 ? 'reverse' : ''}`}>
                                <div className="timeline-spacer"></div>

                                <div className="timeline-dot-wrapper">
                                    <div className="timeline-dot"></div>
                                </div>

                                <TiltCard className="experience-item-content glass-panel" options={{ max: 5, scale: 1.02 }}>
                                    <span className="exp-period">{exp.period}</span>
                                    <h4 className="exp-role">{exp.role}</h4>
                                    <span className="exp-type">{exp.type}</span>
                                    <p className="exp-desc">{exp.description}</p>
                                </TiltCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
