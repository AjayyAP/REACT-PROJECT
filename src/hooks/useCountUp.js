import { useEffect, useState } from 'react';

/**
 * Custom hook for animating number counting up
 * @param {number} end - The target number to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Delay before starting animation
 * @returns {number} - The current animated value
 */
export const useCountUp = (end, duration = 2000, delay = 0) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (end === 0) {
            setCount(0);
            return;
        }

        const timeout = setTimeout(() => {
            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // Easing function for smooth animation (easeOutQuart)
                const easeOut = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(easeOut * end));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }, delay);

        return () => clearTimeout(timeout);
    }, [end, duration, delay]);

    return count;
};
