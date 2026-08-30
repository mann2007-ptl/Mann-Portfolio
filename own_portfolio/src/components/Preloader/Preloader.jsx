import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const FINAL_TEXT = "MANN PATEL";
const ROLE_TEXT = "SOFTWARE ENGINEER";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const Preloader = ({ setLoading }) => {
    const [isComplete, setIsComplete] = useState(false);
    const [percent, setPercent] = useState(0);
    const [nameText, setNameText] = useState("");
    const [roleText, setRoleText] = useState("");
    const [nameDecoded, setNameDecoded] = useState(false);
    const overlayRef = useRef(null);
    const leftDoorRef = useRef(null);
    const rightDoorRef = useRef(null);
    const counterRef = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const ringsRef = useRef(null);

    useEffect(() => {
        // ── Counter 0% → 100% ──
        const counterTween = gsap.to({ val: 0 }, {
            val: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: function () {
                setPercent(Math.round(this.targets()[0].val));
            }
        });

        // ── Name decode animation ──
        let nameIterations = 0;
        const nameInterval = setInterval(() => {
            setNameText(
                FINAL_TEXT.split("").map((letter, index) => {
                    if (letter === " ") return " ";
                    if (index < nameIterations) return FINAL_TEXT[index];
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );
            if (nameIterations >= FINAL_TEXT.length) {
                clearInterval(nameInterval);
                setNameDecoded(true);
                // Start role decode
                let roleIterations = 0;
                const roleInterval = setInterval(() => {
                    setRoleText(
                        ROLE_TEXT.split("").map((letter, index) => {
                            if (letter === " ") return " ";
                            if (index < roleIterations) return ROLE_TEXT[index];
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        }).join("")
                    );
                    if (roleIterations >= ROLE_TEXT.length) {
                        clearInterval(roleInterval);
                    }
                    roleIterations += 1 / 2;
                }, 25);
            }
            nameIterations += 1 / 3;
        }, 20);

        // ── Ring spin acceleration ──
        if (ringsRef.current) {
            gsap.to(ringsRef.current.querySelectorAll('.vault-ring'), {
                rotation: 360,
                duration: 2.4,
                ease: "power2.in",
                stagger: { each: 0.15, from: "center" },
                repeat: 0
            });
        }

        // ── Name entrance ──
        if (nameRef.current) {
            gsap.fromTo(nameRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
            );
        }

        // ── Exit: Vault Door Split at ~2.6s ──
        const exitTimer = setTimeout(() => {
            setLoading(false);

            const tl = gsap.timeline({
                onComplete: () => setIsComplete(true)
            });

            // Bloom flash on rings
            if (ringsRef.current) {
                tl.to(ringsRef.current, {
                    filter: "brightness(2) drop-shadow(0 0 30px rgba(212, 175, 55, 0.8))",
                    duration: 0.3,
                    ease: "power2.in"
                }, 0);
            }

            // Fade counter + text
            if (counterRef.current) {
                tl.to(counterRef.current, {
                    scale: 1.1, opacity: 0, filter: "blur(8px)",
                    duration: 0.35, ease: "power2.in"
                }, 0);
            }
            if (nameRef.current) {
                tl.to(nameRef.current, {
                    opacity: 0, y: -20, filter: "blur(5px)",
                    duration: 0.3, ease: "power2.in"
                }, 0.05);
            }
            if (roleRef.current) {
                tl.to(roleRef.current, {
                    opacity: 0, y: 20,
                    duration: 0.25, ease: "power2.in"
                }, 0.05);
            }

            // Vault doors slide apart (left goes left, right goes right)
            if (leftDoorRef.current) {
                tl.to(leftDoorRef.current, {
                    x: "-105%",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, 0.2);
            }
            if (rightDoorRef.current) {
                tl.to(rightDoorRef.current, {
                    x: "105%",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, 0.2);
            }

            // Fade entire overlay
            if (overlayRef.current) {
                tl.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
                    }
                }, 0.6);
            }

        }, 2800);

        return () => {
            clearInterval(nameInterval);
            clearTimeout(exitTimer);
            counterTween.kill();
        };
    }, [setLoading]);

    if (isComplete) return null;

    return (
        <div className="preloader-overlay" ref={overlayRef}>
            {/* Vault Doors */}
            <div className="vault-door vault-left" ref={leftDoorRef}>
                <div className="vault-door-trim" />
            </div>
            <div className="vault-door vault-right" ref={rightDoorRef}>
                <div className="vault-door-trim" />
            </div>

            {/* Grid Background */}
            <div className="vault-grid" />

            {/* Rotating Rings */}
            <div className="vault-rings-container" ref={ringsRef}>
                <div className="vault-ring ring-outer" />
                <div className="vault-ring ring-mid" />
                <div className="vault-ring ring-inner" />
            </div>

            {/* Center Content */}
            <div className="vault-center">
                {/* Percentage Counter */}
                <div className="vault-counter" ref={counterRef}>
                    <span className="vault-counter-number">{String(percent).padStart(3, '0')}</span>
                    <span className="vault-counter-symbol">%</span>
                </div>

                {/* Decoded Name */}
                <h1
                    className={`vault-name ${nameDecoded ? 'decoded' : 'decoding'}`}
                    ref={nameRef}
                >
                    {nameText}
                </h1>

                {/* Role */}
                <div
                    className={`vault-role ${nameDecoded ? 'role-visible' : 'role-hidden'}`}
                    ref={roleRef}
                >
                    {roleText || "\u00A0"}
                </div>
            </div>
        </div>
    );
};

export default Preloader;
