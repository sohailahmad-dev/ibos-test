'use client'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);
    return (
        <h1>Welcome {user?.firstName + " " + user?.lastName}</h1>
    )
}
