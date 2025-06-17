import { Outlet, useLocation } from 'react-router-dom'

import { motion } from 'framer-motion'

import Header  from '../Header/Header.jsx';
import Footer  from '../Footer/Footer.jsx';
import styles from './Layout.module.scss'

export default function Layout() {
    const location = useLocation();

    return (
        <div className={styles.appContainer}>
            
            <Header />
            <motion.main 
                className={styles.mainContent}
                key={location.key}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.3 }}
            >

                <Outlet/>

            </motion.main>
            <Footer />

        </div>
    );
}