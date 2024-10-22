'use client'
import { useEffect, useState } from 'react';
import styles from './profile.module.css';

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className={styles.profileContainer}>
            <h1>Profile</h1>
            {user ? (
                <div className={styles.profileDetails}>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
}
