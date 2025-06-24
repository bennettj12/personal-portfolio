import styles from './Divider.module.scss';

import {useRef, useState, useEffect} from 'react'

export default function Divider({

    color = "var(--ink)",
    thickness = 1.5,
    amplitude = 7,
    reverse = false,
    delay = 0,
    animate = true
}) {

    const pathRef = useRef(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        if(pathRef.current && animate) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, [])

    const path = (reverse) 
        ? `M100,12 C80,${4+amplitude} 60,${15-amplitude} 40,${12+amplitude} 20,${12-amplitude} 0,12, 0,12`
        : `M0,12 C20,${12-amplitude} 40,${12+amplitude} 60,${15-amplitude} 80,${4+amplitude} 100,12 100,12`;
    return (
        <div 
            className={styles.divider}
            style={{
                '--delay': `${delay}s`,
                '--stroke-color': color,
                '--stroke-width': thickness,
                '--path-length': pathLength
            }}
        >
            <svg
                width="100%"
                height="24"
                viewBox='0 0 100 24'
                preserveAspectRatio='none'
            >
                <path
                    ref={pathRef}
                    d={path}
                    filter='url(#pencilTexture)'
                />
            </svg>
        </div>
    );
}