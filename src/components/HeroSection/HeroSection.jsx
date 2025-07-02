import { MotionAnimatedButton } from '../AnimatedButton/AnimatedButton.jsx';
import Divider from '../Divider/divider.jsx';
import SketchOutline from '../SketchOutline/SketchOutline.jsx';
import styles from './HeroSection.module.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const info = {
    aboutSnippet: `
        I enjoy building tools and projects that bridge code and creativity.
    `,
    ctaButton: "See my projects!"
}

export default function HeroSection() {
    let delay = 0;
    const delayDelta = 0.40;
    const getAnimDelay = () => {
        const c = delay;
        delay += delayDelta;
        return c;
    }
    const navigate = useNavigate();
    return (
        <main className={styles.aboutMe}>
            <section className={styles.infoSection}>
                {/* <motion.div> */}
                    <motion.h1 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.5,
                            delay: getAnimDelay()
                    }}>
                    Hi! I'm <span className={styles.name}>Bennett</span>
                    <Divider/>
                    </motion.h1>
                    
                {/* </motion.div> */}

                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.5,
                        delay: getAnimDelay()
                }}>
                    {info.aboutSnippet}
                </motion.p>
                
                <MotionAnimatedButton
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.5,
                        delay: getAnimDelay()
                    }}
                    onClick={() => navigate('/projects')}
                >
                    {info.ctaButton}
                </MotionAnimatedButton>
            </section>
            <motion.figure 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.5,
                    delay: getAnimDelay() - 0.5
                }}
                className={styles.portraitSection}>
                <SketchOutline>

                
                {/* Animated portrait element */}
                </SketchOutline>
            </motion.figure>
        </main>
    );
}