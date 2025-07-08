import styles from './Footer.module.scss'
import Divider from '../Divider/divider.jsx'
import BrushBorder from '../BrushBorder/BrushBorder.jsx'
import { MotionContext } from '@/context/MotionContext.jsx'
import { useContext } from 'react'
export default function Footer() {
    const { animationsEnabled, toggleMotion } = useContext(MotionContext);
    
    
    return (
        <footer className={styles.footer}>
            <BrushBorder />
            <div className={styles.footerContainer} >
                <section className={styles.footerLinks}>
                    <h2>MY LINKS:</h2>
                    <Divider amplitude={1.2} color='var(--paper)' />
                    <a href="https://www.linkedin.com/in/bennett-johnson/">
                        {/* add icon */} LinkedIn
                    </a>
                    <a href="https://github.com/bennettj12">
                        {/* add icon */} Github
                    </a>
                    <a href="mailto:bennett@bennettrj.com">
                        {/* add icon */} bennett@bennettrj.com
                    </a>
                </section>
                <section className={styles.footerInfo}>
                    
                    <h2>Made with <b>React</b></h2>
                    <label className={styles.motionToggle}>
                        <input 
                            type="checkbox" 
                            checked={!animationsEnabled} 
                            onChange={toggleMotion} 
                            className={styles.toggleInput}
                        />
                        <span className={styles.toggleTrack}>
                            <span className={styles.toggleThumb} />
                        </span>
                        <span className={styles.toggleLabel}>
                            Reduce motion
                        </span>
                    </label>
                    {/* TODO: add something more interesting here... */}
                </section>
            </div>
        </footer>

    )
}