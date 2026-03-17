import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 40 }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const element = magnetic.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();

            // Calculate distance relative to element center
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Apply movement scaled by strength
            xTo(x * (strength / 100));
            yTo(y * (strength / 100));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={magnetic} style={{ display: 'inline-block', position: 'relative' }}>
            {children}
        </div>
    );
}
