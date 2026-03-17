import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiLeetcode } from 'react-icons/si';
import Magnetic from '../Magnetic/Magnetic';
import './LeetCode.css';

gsap.registerPlugin(ScrollTrigger);

const LeetCode = () => {
    const sectionRef = useRef(null);
    const leetCardUrl = "https://leetcard.jacoblin.cool/mann2006?theme=dark&font=Inter&ext=heatmap";

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.fromTo('.section-label, .section-title',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
            )
                .fromTo('.leetcode-card',
                    { y: 60, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' },
                    "-=0.4"
                )
                .fromTo('.lc-tag',
                    { opacity: 0, scale: 0.8, y: 10 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' },
                    "-=0.6"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="leetcode" className="leetcode-section section" ref={sectionRef}>
            <div className="container">
                <div className="section-header center">
                    <span className="section-label">Problem Solving</span>
                    <h2 className="section-title">
                        LeetCode <span className="accent">Profile</span>
                    </h2>
                </div>

                <div className="leetcode-card">
                    <div className="lc-header">
                        <div className="lc-user">
                            <SiLeetcode className="lc-icon" />
                            <div>
                                <h3 className="lc-name">Mann Patel</h3>
                                <p className="lc-handle">@mann2006</p>
                            </div>
                        </div>
                        <Magnetic strength={20}>
                            <a
                                href="https://leetcode.com/u/mann2007/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="lc-profile-btn magnetic-wrap"
                            >
                                View Profile
                            </a>
                        </Magnetic>
                    </div>

                    <div className="lc-stats">
                        <img src={leetCardUrl} alt="LeetCode Stats" className="lc-card-img" />
                    </div>

                    <div className="lc-tags">
                        {['Algorithms', 'Data Structures', 'C++', 'Problem Solving'].map((tag, i) => (
                            <span key={i} className="lc-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeetCode;
