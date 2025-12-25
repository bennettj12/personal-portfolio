import { Outlet, useLocation } from 'react-router-dom'

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { AnimationContext } from '../../context/AnimationContext'; 

import Header  from '../Header/Header.jsx';
import Footer  from '../Footer/Footer.jsx';
import styles from './Layout.module.scss'
import SVGFilters from '../svgFilters.jsx';
import Divider from '../Divider/divider.jsx';
import { useEffect } from 'react';

export default function Layout() {
    const location = useLocation();
    const controls = useAnimation();
    // basic animation controller (set opacity to 1 upon location change)
    // because of useAnimationNavigation.jsx, pathname doesn't change until exit
    // animation has completed!
    useEffect(() => {
        controls.start({ opacity: 1 });
    }, [location.pathname, controls]);

    return (
        <AnimationContext.Provider value={controls}>
            <div className={styles.appContainer}>
                <SVGFilters />
                <Header />
                <Divider thickness={1} amplitude={1}/>

                <AnimatePresence mode="wait">
                    <motion.main 
                        className={styles.mainContent}
                        key={location.key}
                        initial={{ opacity: 0}}
                        animate={controls}
                        transition={{duration: .5}}
                        exit={ {opacity: 0}}
                    
                    >

                        <Outlet/>

                    </motion.main>
                </AnimatePresence>

                

            </div>
            <Footer />
        </AnimationContext.Provider>
    );
}