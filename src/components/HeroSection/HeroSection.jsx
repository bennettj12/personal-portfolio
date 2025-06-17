import styles from './HeroSection.module.scss'

export default function HeroSecton() {
    return (
        <main className={styles.aboutMe}>
            <section className={styles.infoSection}>
                <h1>Hi! I'm Bennett</h1>
                <p>Some information about me goes here</p>
                <hr/>
                <button>See my projects</button>
            </section>
            <figure className={styles.portraitSection}>
                <p>portrait</p>
            </figure>
        </main>
    );
}