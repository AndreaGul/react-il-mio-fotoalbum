import styles from './NavBar.module.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const authPages = [
    {
        label: 'Login',
        href: '/login'
    },
    {
        label: 'Register',
        href: '/register'
    },
];

const protectedPages = [
    {
        label: 'Administration',
        href: '/administration'
    },
];

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className={`${styles.header}`}>
            <nav className="container">
                <menu className={`${styles.container} d-flex justify-content-between align-items-center`}>
                    <h2 className={styles.home}>
                        <NavLink to='/'>Home</NavLink>
                    </h2>
                    <ul className={`${styles.ul} d-flex m-0 p-0`}>
                        <li className={`${styles.li}`}>
                            <NavLink to='/contact'>Contact</NavLink>
                        </li>
                    {!accessToken && authPages.map(({label, href}, i) => (
                        <li className={`${styles.li}`} key={`authPage${i}`} >
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {accessToken && protectedPages.map(({label, href}, i) => (
                        <li className={`${styles.li}`} key={`protectedPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {accessToken && (
                        <li className={`${styles.li}`} >
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    </ul>
                </menu>
            </nav>
        </header>
    );
}