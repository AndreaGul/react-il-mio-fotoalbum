import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const urlPages = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Contact',
        href: '/contact'
    },
 
];

const authPages = [
    {
        label: 'Login',
        href: '/login'
    },
    {
        label: 'SignUp',
        href: '/signup'
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
        <header>
            <nav>
                <menu>
                    {urlPages.map(({label, href}, i) => (
                        <li key={`urlPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {!accessToken && authPages.map(({label, href}, i) => (
                        <li key={`authPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {accessToken && protectedPages.map(({label, href}, i) => (
                        <li key={`protectedPage${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </li>
                    ))}
                    {accessToken && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </menu>
            </nav>
        </header>
    );
}