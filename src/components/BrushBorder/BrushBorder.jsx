import { useEffect, useRef, useCallback } from 'react';
import styles from './BrushBorder.module.scss'
/**
 * Footer border component based on stacked sin waves.
 * I made it animated by phase-shifting the sin waves in opposite directions which gives a 
 * pretty organic-looking effect.
 *
 * @param {string} color
 * @returns 
 */
let sinPhase = 0;

export default function BrushBorder({
    color = "var('--ink')"
}) {

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const drawBorder = useCallback(() => {
        if(!containerRef.current || !canvasRef.current) return;

        const parentWidth = containerRef.current.clientWidth;
        const height = 40;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const v = 2; // random variance

        canvas.width = parentWidth;
        canvas.height = height;

        // find css variable
        const getColor = (color) => {
            if(typeof window === 'undefined') return '#000000';

            return getComputedStyle(document.documentElement)
                .getPropertyValue(color.match(/'([^']+)'/)[1]).trim() || '#000000';
        }

        ctx.clearRect(0,0,parentWidth,height);

        ctx.beginPath();
        ctx.moveTo(0, height)
        for (let i = 0; i <= parentWidth; i += 3) {
            const noise = (
                (Math.sin(i * (0.01)-(sinPhase/5)) * 8)- 4 + // Base wave
                (Math.random() * v - (v/2)) +  // Randomness
                (Math.sin(i * 0.02 + (sinPhase/10)) * 4) + 2  // Secondary wave
            );
            const y = Math.min(
                height * 0.4 + noise, 
                height * 0.9 // Prevent clipping
            );
            ctx.lineTo(i, y);
        }

        // lineTo outside of page to ensure no awkward edge
        ctx.lineTo(parentWidth + 100, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = getColor(color);
        ctx.fill();       
    }, [color])

    useEffect(() => {
        // Draw initial border
        drawBorder();
        // animated wavelike border
        const interval = setInterval(() => {
            drawBorder();
            sinPhase++;
        }, 200)

        //resize handling
        const handleResize = () => drawBorder();
        window.addEventListener('resize', handleResize);

        const cleanup = () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        }

        return cleanup;
    }, [drawBorder]);

    return (
        <div ref={containerRef} className={styles.brushBorder}>
            <canvas
                ref={canvasRef}
                className={styles.brushCanvas}
                aria-hidden={true}
                tabIndex={-1}
            />
        </div>
    );
}