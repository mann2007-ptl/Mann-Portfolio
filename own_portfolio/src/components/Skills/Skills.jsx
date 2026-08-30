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
            gsap.fromTo('.skill-orb',
                { opacity: 0, scale: 0.5, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: { each: 0.05, from: "center" },
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.skills-orbit-grid',
                        start: 'top 85%',
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">02. Capabilities</span>
                    <h2 className="section-title">
                        Tech <span className="accent">Constellation</span>
                    </h2>
                </div>

                <div className="skills-orbit-grid">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="skill-orb"
                            style={{ '--orb-color': skill.color }}
                        >
                            <div className="orb-glow"></div>
                            <div className="orb-icon">{skill.icon}</div>
                            <span className="orb-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
