import React, { useState } from 'react';
import { Box, Paper, Typography, Input, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    async function Signup() {
        let response = await fetch(`https://actually-indecisive-stomach.glitch.me/api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast('Sign-up successful');
        setUser(data);
        console.log(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && email && password) {
            Signup();
        } else {
            toast('Please fill in all fields.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: '10px', width: '400px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant='h4' sx={{ textAlign: 'center', marginBottom: 2 }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Typography variant='body1'>Username</Typography>
                    <Input
                        variant="outlined"
                        placeholder='Enter Username'
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                        sx={{ width: '100%', marginBottom: 2, bgcolor: 'white' }}
                    />

                    <Typography variant='body1'>Email</Typography>
                    <Input
                        variant="outlined"
                        placeholder='Enter Email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        sx={{ width: '100%', marginBottom: 2, bgcolor: 'white' }}
                    />

                    <Typography variant='body1'>Password</Typography>
                    <Input
                        variant="outlined"
                        placeholder='Enter Password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        sx={{ width: '100%', marginBottom: 3, bgcolor: 'white' }}
                    />

                    <Button variant='contained' type='submit' sx={{ width: '100%', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                        Register
                    </Button>
                </form>
                <ToastContainer />
            </Paper>
        </Box>
    );
}

export default SignUp;
