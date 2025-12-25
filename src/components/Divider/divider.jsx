import styles from './Divider.module.scss';

import {useRef, useState, useEffect, useContext} from 'react'
import { motion, useAnimation } from 'framer-motion'
import { MotionContext } from '@/context/MotionContext.jsx';

export default function Divider({

    color = "var(--ink)",
    thickness = 1.5,
    amplitude = 2,
    segments = 10,
    delay = 0,
}) {

    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const [width, setWidth] = useState(0);
    const controls = useAnimation();

    const motionEnabled = useContext(MotionContext).animationsEnabled


    const generatePath = () => {
        if(!width) return '';

        let path = `M0,12`

        for(let i = 1; i <= segments; i++) {
            const x = (width/segments) * i;
            const y = 12 + (Math.random() * amplitude * 2 - amplitude);
            path += `L${x},${y}`;
        }
        return path + `L${width},12`;
    }

    // 3. Animation sequence + resize observer
    useEffect(() => {
        if (!containerRef.current || !pathRef.current) return;
        const update = () => {
            if(!containerRef.current || !pathRef.current) return;
            controls.set({
                d: generatePath()
            })
        }
        const interval = (motionEnabled) ? setInterval(update, 200) : null;

        const updateWidth = () => { 
            if (!containerRef.current || !pathRef.current) return;
            setWidth(containerRef.current.clientWidth);
        }
        updateWidth();
        const observer = new ResizeObserver(() => {
            updateWidth();
            update();
        })
        observer.observe(containerRef.current);
        return () => {
            clearInterval(interval);
            observer.disconnect();
        }
    })



    return (
        <div 
            ref={containerRef}
            className={styles.divider}
            style={{
                '--delay': `${delay}s`,
                '--stroke-color': color,
                '--stroke-width': thickness,
            }}
        >
            <svg
                width="100%"
                height="24"
                viewBox={`0 0 ${width} 24`}
                preserveAspectRatio='none'
            >
                <motion.path
                    d={generatePath()}
                    ref={pathRef}
                    filter='url(#pencilTexture)'
                    stroke="currentColor"
                    strokeWidth={thickness}
                    fill="none"
                    animate={controls}
                    initial= {{pathLength: 0}}
                />
            </svg>
        </div>
    );
}