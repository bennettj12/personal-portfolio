import { useRef, useEffect, useState, useContext } from "react"
import styles from './SketchOutline.module.scss'
import { useAnimation, motion } from "framer-motion";
import { MotionContext } from "@/context/MotionContext.jsx";
/**
 * SketchOutline.jsx
 * Wrapper Class which renders a hand-drawn style border around its content
 */


export default function SketchOutline(props) {

    const container = useRef(null);
    const pathRef = useRef(null);

    const motionEnabled = useContext(MotionContext).animationsEnabled


    const hover = props.hover || false;
    const [isHovering,setIsHovering] = useState(false);

    const variance = (hover) ? (isHovering ? 0 : 2) : 2;

    const controls = useAnimation();

    const generatePath = (v) => {
        if(!container.current) return '';
        const width = container.current.clientWidth;
        const height = container.current.clientHeight;

        // wobbly lines
        const segments = 12 + Math.floor(Math.random() * 12);
        let path = `M0,${10 + Math.random()*v}`

        //top left -> top right
        for(let i = 0; i <= segments; i++) {
            const x = (width/segments) * i;
            const y = 5 + Math.random() * v;
            path += `L${x},${y}`;
        }
        // top right -> bottom right
        for(let i = 2; i <= segments; i++) {
            const y = ((height/segments) * i) - 5;
            const x = width + Math.random() * v;
            path += `L${x},${y}`
        }
        // bottom right -> bottom left
        for(let i = segments - 1; i >= 1; i--){
            const x = (width/segments) * i;
            const y = height - 5 + Math.random() * v;
            path += `L${x},${y}`;
        }
        // bottom left -> top right
        for(let i = segments; i >= 3; i--) {
            const y = ((height/segments) * i) - 5;
            const x = Math.random() * v;
            path += `L${x},${y}`
        }

        return path + 'Z';

    }
    useEffect(() => {
        if (!container.current || !pathRef.current) return;

        const update = () => {
            if(!container.current || !pathRef.current) return
            controls.set({
                d: generatePath(variance)
            })
        }

        const interval = (motionEnabled) ? setInterval(update, 200) : null;
        const observer = new ResizeObserver(update);
        observer.observe(container.current);

        return () => {
            if(interval) clearInterval(interval);
            observer.disconnect();
        }
        
    });


    return (
        <motion.div 
            ref={container} 
            style={props.style} 
            className={styles.sketchOutline}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            >

            <svg style={{ willChange: 'contents' }} className={styles.border} >
                <motion.path 
                    animate={controls}
                    className={styles.borderPath}
                    ref={pathRef}
                    fill="none"
                    strokeWidth="1"
                    filter="url(#pencilTexture)"
                />
            </svg>
            {props.children}
        </motion.div>
    )
}