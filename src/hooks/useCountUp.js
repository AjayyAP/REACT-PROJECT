import { useEffect, useState } from 'react';

/**
 
 * @param {number} end 
 * @param {number} duration 
 * @param {number} delay 
 * @returns {number} 
 */
export const useCountUp = (end, duration = 2000, delay = 0) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (end === 0) {
            return;
        }

        const timeout = setTimeout(() => {
            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);


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
