import styles from './Divider.module.scss';

import {useRef, useState, useEffect} from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function Divider({

    color = "var(--ink)",
    thickness = 1.5,
    amplitude = 2,
    segments = 10,
    delay = 0,
    animate = true
}) {

    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);
    const controls = useAnimation();

    // measure container and listen for resize
    useEffect(() => {

        if (!containerRef.current) return;
    
        const updateWidth = () => { 
            setWidth(containerRef.current.clientWidth);
        }

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, [])


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
    // 3. Animation sequence
    useEffect(() => {
        const interval = setInterval(() => {
            controls.set({
                d: generatePath()
            })
        }, 200)

        return () => clearInterval(interval);
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