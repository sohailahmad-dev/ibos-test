'use client'
import React, { useState } from 'react'
import styles from '../signup/page.module.css'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState({})

    const addData = (key, val) => {
        user[key] = val;
        setUser({ ...user })
    }

    const handleSubmit = () => {
        if (!user.email || !user.password) {
            toast.error('Email and password are required!');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.find((u) => u.email === user.email && u.password === user.password);

        if (!userExists) {
            toast.error('Invalid email or password!');
            return;
        }

        const { firstName, lastName, email, password } = userExists;
        localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, password }));

        toast.success('Login successful!');
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };





    return (
        <>
            <div >
                <div className={styles.signInLeft}
                    data-aos="fade-right"
                >
                    <div className={styles.container} >
                        <h1>Login</h1>

                        <TextField
                            label='Email'
                            fullWidth
                            onChange={e => addData('email', e.target.value)}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            fullWidth
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
                            <div>Don't have an account?</div>
                            <Link href='/signup' >Create Account</Link>
                        </div>

                    </div>
                </div>
                <div className={styles.signInRight} data-aos="fade-left"  >
                    <h2 className="heading2" style={{ color: 'white' }}>Welcome Back</h2>
                    <div className="text1">Welcome! Your journey begins here. Sign in with a smile, and let's create beautiful moments together.</div>
                </div>

            </div>
        </>

    )
}
