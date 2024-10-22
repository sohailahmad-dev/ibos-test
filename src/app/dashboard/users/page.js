'use client';
import { useEffect, useState } from 'react';
import styles from './users.module.css';
import { Grid, TextField, Button, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const getUsers = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (userToEdit, index) => {
        setUser(userToEdit);
        setCurrentIndex(index);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (index) => {
        const filteredUsers = users.filter((_, i) => i !== index);
        setUsers(filteredUsers);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
    };

    const handleSubmit = () => {
        const updatedUsers = [...users];

        if (isEditing) {
            updatedUsers[currentIndex] = user;
        } else {
            updatedUsers.push(user);
        }

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        resetForm();
    };

    const resetForm = () => {
        setUser({ firstName: '', lastName: '', email: '', password: '' });
        setIsEditing(false);
        setIsModalOpen(false);
        setCurrentIndex(null);
    };

    return (
        <div className={styles.usersContainer}>
            <div className={styles.usersHeader}>
                <h1>Users List</h1>
                <Button
                    variant="contained"
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                >
                    Add User
                </Button>
            </div>


            <div className="ap-table" style={{ marginBottom: '20px' }}>
                <div className="ap-th">
                    <Grid container spacing={1}>
                        <Grid item sm={1}><div className="th-heading">#</div></Grid>
                        <Grid item sm={2.25}><div className="th-heading">First Name</div></Grid>
                        <Grid item sm={2.25}><div className="th-heading">Last Name</div></Grid>
                        <Grid item sm={2.5}><div className="th-heading">Email</div></Grid>
                        <Grid item sm={2}><div className="th-heading">Password</div></Grid>
                        <Grid item sm={2}><div className="th-heading">Actions</div></Grid>
                    </Grid>
                </div>
                <div className='ap-tb'>
                    <ul>
                        {users.map((user, index) => (
                            <div className="ap-th" key={index}>
                                <Grid container spacing={1}>
                                    <Grid item sm={1}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">#</div>
                                            <div className="tr-data">{index + 1}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2.25}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">First Name</div>
                                            <div className="tr-data">{user?.firstName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2.25}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Last Name</div>
                                            <div className="tr-data">{user?.lastName}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2.5}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Email</div>
                                            <div className="tr-data">{user?.email}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Password</div>
                                            <div className="tr-data">{user?.password}</div>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <div className="ap-tr">
                                            <div className="th-heading1">Actions</div>
                                            <div>
                                                <EditIcon
                                                    onClick={() => handleEdit(user, index)}
                                                    sx={{ cursor: 'pointer', color: 'blue', marginRight: 1 }}
                                                />
                                                <DeleteIcon
                                                    onClick={() => handleDelete(index)}
                                                    sx={{ cursor: 'pointer', color: 'red' }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={resetForm}>
                <div className={styles.container}>
                    <h1>{isEditing ? 'Edit User' : 'Add User'}</h1>
                    <TextField
                        label='First Name'
                        fullWidth
                        onChange={e => setUser({ ...user, firstName: e.target.value })}
                        value={user.firstName}
                    />
                    <TextField
                        label='Last Name'
                        fullWidth
                        onChange={e => setUser({ ...user, lastName: e.target.value })}
                        value={user.lastName}
                    />
                    <TextField
                        label='Email'
                        fullWidth
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        value={user.email}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        fullWidth
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        value={user.password}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        size='large'
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
