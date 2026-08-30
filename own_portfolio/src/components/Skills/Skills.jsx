import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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

const MagneticNode = ({ skill, index, total, onNodeClick }) => {
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Initial random floating animation
    const floatAnim = {
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        transition: {
            duration: 5 + (index % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
        }
    };

    const handleMouseMove = (e) => {
        if (!nodeRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = nodeRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        
        setPosition({ x: distanceX * 0.4, y: distanceY * 0.4 });
    };

    const handleMouseEnter = () => setIsHovered(true);
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = (e) => {
        const rect = nodeRef.current.getBoundingClientRect();
        onNodeClick(e.clientX, e.clientY);
    };

    return (
        <motion.div
            ref={nodeRef}
            className="magnetic-node-wrapper"
            animate={isHovered ? { x: position.x, y: position.y } : floatAnim}
            transition={isHovered ? { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } : {}}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ zIndex: isHovered ? 10 : 1 }}
        >
            <div className={`magnetic-node ${isHovered ? 'hovered' : ''}`} style={{ '--node-color': skill.color }}>
                <div className="node-icon">{skill.icon}</div>
                <span className="node-name">{skill.name}</span>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const [ripples, setRipples] = useState([]);

    const skills = [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    ];

    const createRipple = (x, y) => {
        const newRipple = {
            id: Date.now(),
            x,
            y
        };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1500); // Ripple duration
    };

    return (
        <section id="skills" className="skills-constellation-section section">
            {/* Ripple Effects Layer */}
            <div className="ripple-container">
                {ripples.map(ripple => (
                    <div 
                        key={ripple.id} 
                        className="gold-ripple" 
                        style={{ left: ripple.x, top: ripple.y }}
                    />
                ))}
            </div>

            <div className="container">
                <div className="section-header center">
                    <span className="section-label">02. Capabilities</span>
                    <h2 className="section-title">
                        Tech <span className="accent">Constellation</span>
                    </h2>
                </div>

                <div className="constellation-grid">
                    {skills.map((skill, index) => (
                        <MagneticNode 
                            key={skill.name} 
                            skill={skill} 
                            index={index} 
                            total={skills.length}
                            onNodeClick={createRipple}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
