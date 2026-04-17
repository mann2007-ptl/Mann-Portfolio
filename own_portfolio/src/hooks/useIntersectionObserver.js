import { useEffect, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 * @param {React.RefObject} elementRef - Ref to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.freezeOnceVisible - If true, stops observing after the element becomes visible
 * @returns {Object} - { isIntersecting, entry }
 */
export default function useIntersectionObserver(
    elementRef,
    { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = {}
) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const element = elementRef?.current;
        if (!element || !window.IntersectionObserver) return;

        let frozen = false;

        const observer = new IntersectionObserver(
            ([observerEntry]) => {
                setEntry(observerEntry);
                const isElementIntersecting = observerEntry.isIntersecting;

                if (isElementIntersecting && freezeOnceVisible && !frozen) {
                    frozen = true;
                    setIsIntersecting(true);
                    observer.unobserve(element);
                } else if (!frozen) {
                    setIsIntersecting(isElementIntersecting);
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef?.current, threshold, root, rootMargin, freezeOnceVisible]);

    return { isIntersecting, entry };
}
