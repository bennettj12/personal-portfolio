import { NavLink } from 'react-router'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
    const location = useLocation();
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to='/'
                    onClick={(e) => {
                            if (location.pathname === '/') {
                                e.preventDefault();
                            }
                        }
                    }
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    ABOUT
                </NavLink>
                <NavLink to='/projects'
                    onClick={(e) => {
                            if (location.pathname === '/projects') {
                                e.preventDefault();
                            }
                        }
                    }
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    PROJECTS
                </NavLink>
                <NavLink to='/art'
                    onClick={(e) => {
                            if (location.pathname === '/art') {
                                e.preventDefault();
                            }
                        }
                    }
                    className={({ isActive }) => 
                        (isActive ? styles.active : null)}
                >
                    ART
                </NavLink>
            </nav>
        </header>
        

    )
}