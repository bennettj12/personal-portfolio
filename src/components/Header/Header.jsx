import { NavLink } from 'react-router'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.scss'
import useAnimatedNavigation from '@/hooks/useAnimatedNavigation.jsx';

export default function Header() {

    const { animatedNavigate } = useAnimatedNavigation();
    const location = useLocation();

    const handleClick = (to) => (e) => {
        e.preventDefault();
        if(location.pathname !== to){
            animatedNavigate(to);
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to='/'
                    onClick={handleClick('/')}
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    ABOUT
                </NavLink>
                <NavLink to='/projects'
                    onClick={handleClick('/projects')}
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    PROJECTS
                </NavLink>
                <NavLink to='/art'
                    onClick={handleClick('/art')}
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    ART
                </NavLink>
            </nav>
        </header>
        

    )
}