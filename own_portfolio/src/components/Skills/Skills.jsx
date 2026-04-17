import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
    FaGitAlt, FaGithub, FaFigma
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMongodb, SiFirebase, SiCplusplus, SiC,
    SiPostman, SiVercel, SiNetlify, SiTypescript, SiExpress
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skills = [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
        { name: 'C', icon: <SiC />, color: '#A8B9CC' },
        { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'GitHub', icon: <FaGithub />, color: '#ffffff' },
        { name: 'VS Code', icon: <VscVscode />, color: '#007ACC' },
        { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
        { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.skills-header-anim',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: "play none none reverse" }
                }
            );

            gsap.fromTo('.skill-card-glass',
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.04, ease: 'power2.out',
                    scrollTrigger: { trigger: '.skills-grid-layout', start: 'top 85%', toggleActions: "play none none reverse" }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center mb-16">
                    <ScrollReveal type="heading" stagger={0.1}>
                        <span className="section-label neon-text-purple inline-block mb-4">Tech Arsenal</span>
                        <h2 className="section-title text-5xl font-bold">
                            Tools of the <span className="accent">Trade</span>
                        </h2>
                    </ScrollReveal>
                </div>

                {/* Flat Glassmorphism Grid instead of broken 3D sphere */}
                <div className="skills-grid-layout">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-card-glass" style={{ '--skill-color': skill.color }}>
                            <div className="skill-icon-wrap" style={{ color: skill.color }}>
                                {skill.icon}
                            </div>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
