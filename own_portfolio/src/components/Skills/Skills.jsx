import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiFirebase, SiCplusplus, SiC, SiPostman, SiVercel, SiNetlify, SiTypescript, SiExpress } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: [
                { name: "HTML", icon: <FaHtml5 className="skill-icon html" /> },
                { name: "CSS", icon: <FaCss3Alt className="skill-icon css" /> },
                { name: "JavaScript", icon: <FaJs className="skill-icon js" /> },
                { name: "React JS", icon: <FaReact className="skill-icon react" /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="skill-icon tailwind" /> }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node JS", icon: <FaNodeJs className="skill-icon node" /> },
                { name: "MongoDB", icon: <SiMongodb className="skill-icon mongo" /> },
                { name: "Express JS", icon: <SiExpress className="skill-icon firebase" /> }
            ]
        },
        {
            title: "Languages",
            skills: [
                { name: "C", icon: <SiC className="skill-icon c" /> },
                { name: "C++", icon: <SiCplusplus className="skill-icon cpp" /> },
                { name: "JavaScript", icon: <FaJs className="skill-icon js" /> },
                { name: "TypeScript", icon: <SiTypescript className="skill-icon ts" /> }
            ]
        },
        {
            title: "Tools",
            skills: [
                { name: "Git", icon: <FaGitAlt className="skill-icon git" /> },
                { name: "GitHub", icon: <FaGithub className="skill-icon github" /> },
                { name: "VS Code", icon: <VscVscode className="skill-icon vscode" /> },
                { name: "Postman", icon: <SiPostman className="skill-icon postman" /> },
                { name: "Netlify", icon: <SiNetlify className="skill-icon netlify" /> },
                { name: "Figma", icon: <FaFigma className="skill-icon figma" /> }
            ]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="skills" className="skills-section section">
            <div className="container">
                <motion.div
                    className="section-header center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sub-heading">My Expertise</span>
                    <h2 className="section-title">Skills</h2>
                </motion.div>

                <motion.div
                    className="skills-wrapper"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {skillCategories.map((category, index) => (
                        <motion.div key={index} className="skill-category-card" variants={item}>
                            <h3 className="category-header">{category.title}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="skill-item">
                                        {skill.icon}
                                        <span className="skill-text">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
