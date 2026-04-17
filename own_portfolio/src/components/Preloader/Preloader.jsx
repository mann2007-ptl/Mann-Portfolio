import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const FINAL_TEXT = "MANN PATEL";
const CHARS = "ABCDEFGHIKLMNOPRSTUVWXYZ0123456789!@#%^&*";

const Preloader = ({ setLoading }) => {
    const [isComplete, setIsComplete] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [isDecoded, setIsDecoded] = useState(false);
    const overlayRef = useRef(null);
    const topDoorRef = useRef(null);
    const bottomDoorRef = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);

    useEffect(() => {
        // DO NOT set overflow:hidden — content behind must be paintable for FCP/LCP
        // The preloader is just a visual overlay with pointer-events, not a DOM blocker

        // Matrix Decode algorithm
        let iterations = 0;
        const decodeInterval = setInterval(() => {
            setDisplayText(
                FINAL_TEXT.split("").map((letter, index) => {
                    if (letter === " ") return " ";
                    if (index < iterations) {
                        return FINAL_TEXT[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );

            if (iterations >= FINAL_TEXT.length) {
                clearInterval(decodeInterval);
                setIsDecoded(true);
            }

            iterations += 1 / 2;
        }, 20);

        // Initial entrance animation with GSAP
        if (nameRef.current) {
            gsap.fromTo(nameRef.current,
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        }

        // Shortened preloader: 1.8s total (down from 2.6s)
        const timer = setTimeout(() => {
            // Signal loading complete FIRST — hero animation can start
            setLoading(false);

            // Exit animation using GSAP
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                }
            });

            // Fade out name + role
            if (nameRef.current) {
                tl.to(nameRef.current, {
                    scale: 1.05, opacity: 0, filter: "blur(5px)",
                    duration: 0.3, ease: "power2.in"
                }, 0);
            }
            if (roleRef.current) {
                tl.to(roleRef.current, {
                    y: 20, opacity: 0,
                    duration: 0.2, ease: "power2.in"
                }, 0);
            }

            // Door split animation
            if (topDoorRef.current) {
                tl.to(topDoorRef.current, {
                    y: "-100%",
                    duration: 0.6,
                    ease: "power4.inOut"
                }, 0.1);
            }
            if (bottomDoorRef.current) {
                tl.to(bottomDoorRef.current, {
                    y: "100%",
                    duration: 0.6,
                    ease: "power4.inOut"
                }, 0.1);
            }

            // Fade overlay
            if (overlayRef.current) {
                tl.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
                    }
                }, 0.2);
            }

        }, 2200); // Restored cinematic length. Transparency solves LCP.

        return () => {
            clearInterval(decodeInterval);
            clearTimeout(timer);
        };
    }, [setLoading]);

    if (isComplete) return null;

    return (
        <div className="preloader-overlay dev-mode" ref={overlayRef}>
            <div className="dev-door top-door" ref={topDoorRef} />
            <div className="dev-door bottom-door" ref={bottomDoorRef} />

            {/* Developer Tech Grid Background */}
            <div className="dev-grid"></div>

            <div className="dev-center-container">
                <h1
                    className={`dev-name-text ${isDecoded ? 'decoded-clean' : 'decoding-noise'}`}
                    ref={nameRef}
                >
                    {displayText}
                </h1>

                {/* Elegant minimalist subtitle */}
                <div
                    className={`dev-role-box ${isDecoded ? 'role-visible' : 'role-hidden'}`}
                    ref={roleRef}
                >
                    SOFTWARE ENGINEER
                </div>
            </div>
        </div>
    );
};

export default Preloader;
