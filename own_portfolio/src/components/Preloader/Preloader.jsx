import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ setLoading }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Fake loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 500); // Small wait after getting to 100
                    return 100;
                }
                // Random jump in progress
                const jump = Math.floor(Math.random() * 10) + 2;
                return Math.min(prev + jump, 100);
            });
        }, 150);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Cleanup and trigger App reveal
    const handleExitComplete = () => {
        document.body.style.overflow = '';
        setLoading(false);
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {!isComplete && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
                    }}
                >
                    <div className="preloader-content">
                        {/* Logo Animation */}
                        <motion.div className="preloader-logo-container">
                            <svg
                                width="120"
                                height="110"
                                viewBox="0 0 130 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="preloader-logo-svg"
                            >
                                <defs>
                                    <linearGradient id="neonGradientPreloader" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00f2fe" />
                                        <stop offset="50%" stopColor="#4facfe" />
                                        <stop offset="100%" stopColor="#7303c0" />
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                <motion.g filter="url(#glow)">
                                    {/* "M" Part */}
                                    <motion.path
                                        d="M 25 90 V 30 L 55 60 L 85 30 V 90"
                                        stroke="url(#neonGradientPreloader)"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                                    />

                                    {/* "P" Loop Part */}
                                    <motion.path
                                        d="M 85 30 H 95 C 120 30, 120 65, 95 65 H 85"
                                        stroke="url(#neonGradientPreloader)"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
                                    />
                                </motion.g>
                            </svg>
                        </motion.div>

                        <motion.div
                            className="preloader-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            MANN PATEL
                        </motion.div>

                        {/* Progress Container */}
                        <div className="preloader-progress-container">
                            <div className="preloader-percent">{progress}%</div>
                            <div className="preloader-bar-bg">
                                <motion.div
                                    className="preloader-bar-fill"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: 'linear', duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
