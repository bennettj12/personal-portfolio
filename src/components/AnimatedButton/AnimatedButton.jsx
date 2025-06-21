import styles from './AnimatedButton.module.scss'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, forwardRef, useRef, useState } from 'react'

const AnimatedButton = forwardRef(({children, ...props}, ref) => {

    const controls = useAnimation();
    const containerRef = useRef(null);

    const [isHovering,setIsHovering] = useState(false);

    const variance = isHovering ? 5 : 2.5; // Double wobble on hover

    const generatePath = (v) => {

        if(!containerRef.current) return '';
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // wobbly lines
        const segments = 6 + Math.floor(Math.random() * 6);
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
        for(let i = segments; i >= 2; i--) {
            const y = ((height/segments) * i) - 5;
            const x = Math.random() * v;
            path += `L${x},${y}`
        }

        return path + 'Z';
    }

    useEffect(() => {

        const interval = setInterval(() => {
            controls.set({
                d: generatePath(variance)
            })
        }, 200)

        return () => clearInterval(interval);
    });



    return(
        <motion.div 
            className={styles.btnContainer}
            ref={ref}
            {...props}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            >
            <button ref={containerRef} className={styles.btn}> 
                {children}
            </button>
            <svg className={styles.border} >
                <motion.path 
                    className={styles.borderPath}
                    animate={controls}
                    fill="none"
                    strokeWidth="2"
                    filter="url(#pencilTexture)"
                />
            </svg>
        </motion.div>
    )

});
AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };
export const MotionAnimatedButton = motion(AnimatedButton);