import { useEffect, useRef, useCallback } from 'react';
import styles from './BrushBorder.module.scss'

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
        for (let i = 0; i <= parentWidth; i += 4) {
            const noise = (
                Math.sin(i * (0.01)) * 7 + // Base wave
                (Math.random() * 5 - 2.5) +  // Randomness
                (Math.sin(i * 0.02) * 4)  // Secondary wave
            );
            const y = Math.min(
                height * 0.4 + noise, 
                height * 0.9 // Prevent clipping
            );
            ctx.lineTo(i, y);
        }


        ctx.lineTo(parentWidth, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = getColor(color);
        ctx.fill();       
    }, [color])


    useEffect(() => {
        drawBorder();

        let animationFrame = requestAnimationFrame(drawBorder);

        const handleResize = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(drawBorder);
        }

        window.addEventListener('resize', handleResize);

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrame);
            if(canvasRef.current) {
                canvasRef.current.getContext('2d').clearRect(
                    0,0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
            }
        }
        
    }, [drawBorder])

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