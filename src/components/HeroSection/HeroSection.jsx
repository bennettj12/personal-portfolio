import { MotionAnimatedButton } from '../AnimatedButton/AnimatedButton.jsx';
import Divider from '../Divider/divider.jsx';
import styles from './HeroSection.module.scss'
import { motion } from 'framer-motion'

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

    return (
        <main className={styles.aboutMe}>
            <section className={styles.infoSection}>
                <motion.h1 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.5,
                        delay: getAnimDelay()
                }}>
                    Hi! I'm <span className={styles.name}>Bennett</span>
                </motion.h1>
                <Divider delay={getAnimDelay()}/>
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
                }}>
                    {info.ctaButton}
                </MotionAnimatedButton>
            </section>
            <figure className={styles.portraitSection}>
                {/* Animated portrait element */}
            </figure>
        </main>
    );
}