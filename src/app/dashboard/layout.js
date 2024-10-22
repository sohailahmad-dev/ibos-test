'use client'
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        setUserData(storedUser);
    }, []);

    return (
        <div className={styles.dashboardLayout}>
            <NavBar user={userData} />
            <div className={styles.dashboardContent}>
                {children}
            </div>
        </div>
    );
}

function NavBar({ user }) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.userInfo}>
                <div
                    className={`${styles.avatar} ${!user?.avatar ? styles.defaultAvatar : ''}`}
                    style={user?.avatar ? { backgroundImage: `url(${user.avatar})` } : {}}
                ></div>
                <p className={styles.userName}>{user?.firstName} {user?.lastName}</p>
                <p className={styles.userEmail}>{user?.email}</p>

            </div>
            <ul className={styles.navLinks}>
                <li><Link href="/dashboard/profile">Profile</Link></li>
                <li><Link href="/dashboard/users">Users</Link></li>
                <li onClick={handleLogout} >Logout</li>
            </ul>
        </nav>
    );
}
