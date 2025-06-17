import { NavLink } from 'react-router'
import styles from './Header.module.scss'

export default function Header() {
    return (
        <nav className={styles.nav}>
            <NavLink to='/'
                className={({ isActive }) => 
                    (
                        isActive ? styles.active : null
                    )}
            >
                About
            </NavLink>
            <NavLink to='/projects'
                className={({ isActive }) => 
                    (
                        isActive ? styles.active : null
                    )}
            >
                Projects
            </NavLink>
            <NavLink to='/art'
                className={({ isActive }) => 
                    (
                        isActive ? styles.active : null
                    )}
            >
                Art
            </NavLink>
        </nav>

    )
}