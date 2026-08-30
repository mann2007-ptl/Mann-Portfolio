import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubCalendar } from 'react-github-calendar';
import { FaGithub } from 'react-icons/fa';
import './Github.css';

gsap.registerPlugin(ScrollTrigger);

const Github = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo('.github-label, .github-title',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            )
            .fromTo('.github-card',
                { y: 60, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' },
                "-=0.4"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Custom dark theme for the calendar matching the Obsidian & Gold aesthetic
    const customTheme = {
        light: ['#161b22', '#2d333b', '#5c4a17', '#9e7b25', '#d4af37'],
        dark: ['#111', '#222', '#5c4a17', '#9e7b25', '#d4af37'],
    };

    return (
        <section id="github" className="github-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label github-label">Open Source</span>
                    <h2 className="section-title github-title">
                        GitHub <span className="accent">Contributions</span>
                    </h2>
                </div>

                <div className="github-card">
                    <div className="github-card-header">
                        <FaGithub className="github-icon" />
                        <div className="github-user-info">
                            <h3>mann2007-ptl</h3>
                            <a href="https://github.com/mann2007-ptl" target="_blank" rel="noopener noreferrer" className="github-link">
                                View Profile ↗
                            </a>
                        </div>
                    </div>
                    
                    <div className="github-calendar-wrapper">
                        <GitHubCalendar 
                            username="mann2007-ptl" 
                            blockSize={16}
                            blockMargin={6}
                            colorScheme="dark"
                            theme={customTheme}
                            fontSize={14}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Github;
