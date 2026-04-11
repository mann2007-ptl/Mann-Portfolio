import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The text or content to reveal
 * @param {string} props.type - 'heading' (line-by-line) or 'paragraph' (word-by-word)
 * @param {string} props.className - Additional classes
 * @param {number} props.delay - Initial delay
 * @param {number} props.stagger - Stagger between lines/words
 */
const ScrollReveal = ({ children, type = 'heading', className = '', delay = 0, stagger = 0.1 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (type !== 'heading') return;

        const ctx = gsap.context(() => {
            const lines = containerRef.current.querySelectorAll('.reveal-line-content');

            gsap.fromTo(lines,
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 1.2,
                    stagger: stagger,
                    delay: delay,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, [type, delay, stagger]);

    if (type === 'paragraph') {
        const words = typeof children === 'string' ? children.split(' ') : [];

        return (
            <motion.p
                className={`reveal-paragraph ${className}`}
                ref={containerRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: stagger,
                            delayChildren: delay
                        }
                    }
                }}
            >
                {words.map((word, i) => (
                    <span key={i} className="reveal-word-wrapper" style={{ display: 'inline-block', overflow: 'hidden' }}>
                        <motion.span
                            variants={{
                                hidden: { y: '100%', opacity: 0 },
                                visible: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            {word}&nbsp;
                        </motion.span>
                    </span>
                ))}
            </motion.p>
        );
    }

    // Default: Heading (line reveal)
    // We assume children is already structured or we just wrap it
    return (
        <div className={`reveal-heading-container ${className}`} ref={containerRef}>
            {React.Children.map(children, (child, i) => (
                <div key={i} className="reveal-line-mask" style={{ overflow: 'hidden' }}>
                    <div className="reveal-line-content">
                        {child}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScrollReveal;
