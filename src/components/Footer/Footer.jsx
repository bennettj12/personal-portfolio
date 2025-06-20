import styles from './Footer.module.scss'
import Divider from '../Divider/divider.jsx'
import BrushBorder from '../BrushBorder/BrushBorder.jsx'
export default function Footer() {
    return (

        <footer className={styles.footer}>
            <BrushBorder />
            <div className={styles.footerContainer} >
                <section className={styles.footerLinks}>
                    <h2>MY LINKS:</h2>
                    <Divider amplitude={-5} color='var(--paper)' />
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
                    <h2>Made with React</h2>
                    {/* TODO: add something more interesting here... */}
                </section>
            </div>
        </footer>

    )
}