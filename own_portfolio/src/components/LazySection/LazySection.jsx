import React, { Suspense, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const SectionLoader = () => (
    <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
        Loading...
    </div>
);

/**
 * A wrapper component that delays rendering of its children (and thereby fetching lazy chunks)
 * until it comes within a specified threshold of being scrolled into the viewport.
 * Perfect for improving Mobile load times and TBT!
 */
export default function LazySection({ children, height = '100vh', threshold = '600px' }) {
    const ref = useRef(null);
    const { isIntersecting } = useIntersectionObserver(ref, {
        rootMargin: `0px 0px ${threshold} 0px`,
        freezeOnceVisible: true // only observe once
    });

    return (
        <div ref={ref} style={{ minHeight: isIntersecting ? 'auto' : height }}>
            {isIntersecting ? (
                <Suspense fallback={<SectionLoader />}>
                    {children}
                </Suspense>
            ) : null}
        </div>
    );
}
