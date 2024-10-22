'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' })

    const addData = (key, val) => {
        user[key] = val;
        setUser({ ...user })
    }

    const handleSubmit = () => {
        if (!user.firstName || !user.lastName || !user.email || !user.password) {
            toast.error('All fields are required!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(user.email)) {
            toast.error('Please enter a valid email address!');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.find((u) => u.email === user.email);

        if (userExists) {
            toast.error('User already exists!');
            return;
        }

        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        setUser({ firstName: '', lastName: '', email: '', password: '' });
        toast.success('Signup successful!');

        setTimeout(() => {
            router.push('/login');
        }, 1000);
    };


    return (
        <>
            <div >
                <div className={styles.signUpRight}
                    data-aos="fade-left"
                >
                    <div className={styles.container} >
                        <h1>Create Account</h1>
                        <TextField
                            label='First Name'
                            fullWidth
                            onChange={e => addData('firstName', e.target.value)}
                            value={user?.firstName}
                        />
                        <TextField
                            label='Last Name'
                            fullWidth
                            onChange={e => addData('lastName', e.target.value)}
                            value={user?.lastName}
                        />
                        <TextField
                            label='Email'
                            fullWidth
                            value={user?.email}
                            onChange={e => addData('email', e.target.value)}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            fullWidth
                            value={user?.password}
                            onChange={e => addData('password', e.target.value)}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            size='large'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <div className={styles.btmTxt} >
                            <div>Already have an account?</div>
                            <Link href='/login' >Login</Link>
                        </div>

                    </div>
                </div>
                <div className={styles.signUpLeft} data-aos="fade-right"  >
                    <h2 className="heading2" style={{ color: 'white' }}>Hello, Friend</h2>
                    <div className="text1">Embark on a new adventure! Sign up and join our vibrant community. Together, let's build memories and share joy.</div>
                </div>
            </div>
        </>

    )
}
