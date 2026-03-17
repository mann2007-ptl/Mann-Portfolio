import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const TiltEduCard = ({ children, className = '' }) => {
    const tiltRef = useRef(null);
    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.15,
                perspective: 1000,
            });
        }
        return () => {
            if (tiltRef.current && tiltRef.current.vanillaTilt) tiltRef.current.vanillaTilt.destroy();
        };
    }, []);
    return (
        <div ref={tiltRef} className={`tilt-edu-card ${className}`} style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

const Education = () => {
    const sectionRef = useRef(null);
    const educationData = [
        {
            institution: 'Swaminarayan University',
            degree: 'B.E. Computer Engineering',
            year: '2025 – Present',
            description: 'Focusing on core CS concepts, algorithm design, data structures, and architecting scalable web applications.'
        },
        {
            institution: 'Higher Secondary (Class 12)',
            degree: 'Science Stream',
            year: '2024 – 2025',
            description: 'Major subjects: Physics, Mathematics, and Computer Science. Built a strong analytical and logical foundation.'
        },
        {
            institution: 'Secondary School (Class 10)',
            degree: 'General Curriculum',
            year: '2023',
            description: 'Developed a passion for logical reasoning, early programming concepts, and problem-solving mechanics.'
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.edu-header-anim',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
            );

            // Cards staggered 3D reveal
            gsap.fromTo('.tilt-edu-card',
                { opacity: 0, y: 60, rotationX: 15, scale: 0.95 },
                { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'expo.out', scrollTrigger: { trigger: '.edu-grid', start: 'top 80%' } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="education" className="education-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center edu-header-wrapper">
                    <span className="section-label neon-text-cyan edu-header-anim inline-block mb-4">Academic Background</span>
                    <h2 className="section-title edu-header-anim edu-main-title">
                        My <span className="gradient-text italic">Foundation</span>
                    </h2>
                </div>

                <div className="edu-grid">
                    {educationData.map((item, index) => (
                        <TiltEduCard key={index} className="edu-card glass-panel">
                            {/* Neon top accent border */}
                            <div className="card-top-accent"></div>

                            <div className="edu-card-content">
                                <div className="edu-year-badge">{item.year}</div>
                                <h3 className="edu-institution">{item.institution}</h3>
                                <h4 className="edu-degree">{item.degree}</h4>
                                <p className="edu-desc">{item.description}</p>
                            </div>
                        </TiltEduCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
