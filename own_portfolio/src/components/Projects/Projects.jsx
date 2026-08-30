import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaYoutube, FaBook } from 'react-icons/fa';
import { FaFigma } from 'react-icons/fa6';
import Magnetic from '../Magnetic/Magnetic';
import ultimateEesImg from '../../assets/ultimate-ears.png';
import githubAnalyzerImg from '../../assets/github-analyzer.png';
import salomonImg from '../../assets/salomon.png';
import lacosteImg from '../../assets/lacoste.png';
import stanleyImg from '../../assets/stanley.png';
import jioHotstarImg from '../../assets/jio-hotstar.png';
import figmaCodingGitaImg from '../../assets/figma-design-cg-clone.jpg';
import figmaEpicHospitalImg from '../../assets/figma-design-epic-hospital.jpg';
import KiranaSetu from '../../assets/kiranaSetu.png';
import caiaImg from '../../assets/caia.png';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const galleryRef = useRef(null);
    const containerRef = useRef(null);

    const projects = [
        {
            title: 'CAIA — AI System Design',
            techString: 'REACT • REDUX • NODE • EXPRESS • MONGODB',
            image: caiaImg,
            links: { demo: 'https://caia-system-design.vercel.app/', code: 'https://github.com/mann2007-ptl/caia_system_design_mann_patel', docs: 'https://documenter.getpostman.com/view/50840766/2sBXwmQYQA' }
        },
        {
            title: 'kiranaSetu',
            techString: 'REACT • TAILWIND • NODE • MONGODB',
            image: KiranaSetu,
            links: { demo: 'https://kirana-setu.netlify.app/', code: 'https://github.com/mann2007-ptl/kiranaSetu', youtube: 'https://youtu.be/5tiD33iZs70?si=FDFRdx7IKPOi2eSY' }
        },
        {
            title: 'GitHub Profile Analyzer',
            techString: 'REACT • CSS • GITHUB API',
            image: githubAnalyzerImg,
            links: { demo: 'https://mannpatel-githubanalyser.netlify.app/', code: 'https://github.com/mann2007-ptl/Github-profileAnalyzer', youtube: 'https://youtu.be/tK5DegUFxyo?si=YgiqfyhR4zq69FnM' }
        },
        {
            title: 'Ultimate Ears',
            techString: 'HTML • CSS • JAVASCRIPT',
            image: ultimateEesImg,
            links: { demo: 'https://mannpatel-ultimate-ears-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/ultimate-ears-diwali-assgn', youtube: 'https://youtu.be/dEqTLWKtaSM?si=VCURJ9gfygrkPbma' }
        },
        {
            title: 'Salomon Clone',
            techString: 'HTML • CSS • UI',
            image: salomonImg,
            links: { demo: 'https://mannpatel-salomon-clone.netlify.app/', code: 'https://github.com/mann2007-ptl/salomon-diwali-asgn/tree/main/salomon', youtube: 'https://youtu.be/Ogk8143L_HY?si=7Ob175mhoyYdUuP1' }
        },
        {
            title: 'Lacoste Clone',
            techString: 'HTML • CSS • MEGA-MENU',
            image: lacosteImg,
            links: { demo: 'https://mannpatel108585-lacoste-clone.netlify.app/diwali_assgn1/lacoste/', code: 'https://github.com/mann2007-ptl/diwali_assgn1/tree/main/lacoste', youtube: 'https://youtu.be/xAganSw7jdM?si=yVgZU4fMt1sulXBU' }
        },
        {
            title: 'Stanley Clone',
            techString: 'HTML • CSS • ANIMATIONS',
            image: stanleyImg,
            links: { demo: 'https://mannpatel-stanley.netlify.app/stanley-diwal-assgn-/stanley/', code: 'https://github.com/mann2007-ptl/stanley-diwal-assgn-/tree/main/stanley', youtube: 'https://youtu.be/wMEwE0U6ipY?si=KFx2pMu0Vtk-TeUP' }
        },
        {
            title: 'Jio-Hotstar Clone',
            techString: 'HTML • CSS • RESPONSIVE',
            image: jioHotstarImg,
            links: { demo: 'https://mannpatel108585-jiohotstar-clone.netlify.app/diwali_assgn/jio-hotstar/', code: 'https://github.com/mann2007-ptl/diwali_assgn/tree/main/jio-hotstar', youtube: 'https://youtu.be/g-J-iG2aoR4?si=zn8WcRV48pUlUvgk' }
        },
        {
            title: 'Epic Hospital',
            techString: 'FIGMA • UI/UX',
            image: figmaEpicHospitalImg,
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=645-2&t=h5aBYjHjlA8j6WJM-1' }
        },
        {
            title: 'CodingGita',
            techString: 'FIGMA • PROTOTYPING',
            image: figmaCodingGitaImg,
            links: { figma: 'https://www.figma.com/design/ptv2A9fooySZj6ptxVyJc4/Untitled?node-id=716-2&t=h5aBYjHjlA8j6WJM-1' }
        }
    ];

    useEffect(() => {
        // Only run horizontal scroll if window width is > 1024px (desktop)
        if (window.innerWidth > 1024) {
            let ctx = gsap.context(() => {
                const totalWidth = galleryRef.current.scrollWidth - window.innerWidth;
                
                gsap.to(galleryRef.current, {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Title reveal animations
                const titles = gsap.utils.toArray('.gallery-title-group');
                titles.forEach((title) => {
                    gsap.fromTo(title,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1, 
                            y: 0, 
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: title.parentElement,
                                containerAnimation: ScrollTrigger.getAll()[0], // link to horizontal scroll
                                start: "left center",
                                toggleActions: "play none none reverse",
                            }
                        }
                    );
                });
            }, containerRef);
            return () => ctx.revert();
        } else {
            // Mobile fade-in animations
            let ctx = gsap.context(() => {
                const frames = gsap.utils.toArray('.gallery-frame');
                frames.forEach((frame) => {
                    gsap.fromTo(frame, 
                        { opacity: 0, y: 40 }, 
                        { 
                            opacity: 1, y: 0, duration: 0.8, 
                            scrollTrigger: { trigger: frame, start: "top 80%" }
                        }
                    );
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, []);

    return (
        <section id="work" className="museum-section" ref={containerRef}>
            <div className="museum-gallery" ref={galleryRef}>
                <div className="gallery-intro">
                    <span className="section-label">03. Archive</span>
                    <h2 className="section-title">
                        The <span className="accent">Exhibition</span>
                    </h2>
                    <p className="gallery-desc">Scroll to explore</p>
                    <div className="gallery-arrow">→</div>
                </div>

                {projects.map((project, i) => (
                    <div className="gallery-frame" key={i}>
                        <div className="frame-image-wrapper">
                            <img src={project.image} alt={project.title} className="frame-image" loading="lazy" />
                            <div className="frame-vignette"></div>
                            
                            <div className="frame-links">
                                {project.links.demo && (
                                    <Magnetic strength={20}>
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="frame-btn">Visit</a>
                                    </Magnetic>
                                )}
                                {project.links.code && (
                                    <Magnetic strength={20}>
                                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="frame-btn-icon"><FaGithub /></a>
                                    </Magnetic>
                                )}
                                {project.links.youtube && (
                                    <Magnetic strength={20}>
                                        <a href={project.links.youtube} target="_blank" rel="noopener noreferrer" className="frame-btn-icon"><FaYoutube /></a>
                                    </Magnetic>
                                )}
                                {project.links.figma && (
                                    <Magnetic strength={20}>
                                        <a href={project.links.figma} target="_blank" rel="noopener noreferrer" className="frame-btn-icon"><FaFigma /></a>
                                    </Magnetic>
                                )}
                                {project.links.docs && (
                                    <Magnetic strength={20}>
                                        <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="frame-btn-icon"><FaBook /></a>
                                    </Magnetic>
                                )}
                            </div>
                        </div>

                        <div className="gallery-title-group">
                            <h3 className="gallery-project-title">{project.title}</h3>
                            <span className="gallery-tech-string">{project.techString}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
