import { Box, Button, Input, Typography, IconButton, Snackbar, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
   

    const userDetails = async () => {
        try {
            const response = await fetch('https://full-stack-app-zgeq.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            console.log(data);
            setSnackbarMessage('Sign-up successful!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error signing up:', error);
            setSnackbarMessage('Error signing up. Please try again.');
            setSnackbarOpen(true);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (username && email && password) {
            userDetails();
        } else {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarOpen(true);
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

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: "400px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>
                    Sign Up
                </Typography>

                <form onSubmit={handleFormSubmit}>
                    <Typography sx={{ marginBottom: 1, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>Username:</Typography>
                    <Input
                        variant="outlined"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2, width: '100%' }}
                    />

                    <Typography sx={{ marginBottom: 1, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>Email:</Typography>
                    <Input
                        variant="outlined"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        sx={{ marginBottom: 2, width: '100%' }}
                    />

                    <Typography sx={{ marginBottom: 1, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>Password:</Typography>
                    <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                        <Input
                            variant="outlined"
                            placeholder="Enter password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleChange}
                            required
                            sx={{ flex: 1 }}
                        />
                        <IconButton onClick={toggleShowPassword} sx={{ ml: 1 }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em" } }}>
                        Already Registered? <Link to="/login">Login</Link>
                    </Typography>

                    <Button variant="contained" type="submit" fullWidth sx={{fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"}}}>
                        Sign Up
                    </Button>
                </form>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />
            </Paper>
        </Box>
    );
};

export default SignUp;
