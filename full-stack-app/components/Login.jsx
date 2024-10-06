import React, { useState } from 'react';
import { Box, Button, Input, Typography, IconButton, Snackbar, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate()

    const handleLoginDetails = async () => {
        try {
            const response = await fetch(`https://full-stack-app-zgeq.onrender.com/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:"include",
                body: JSON.stringify({ email, password }) 
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.userToken.accessToken); 
            console.log(data.userToken.accessToken)
            setSnackbarMessage('Login successful!');
            navigate("/")
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setSnackbarMessage('Error logging in. Please try again.');
            setSnackbarOpen(true);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleLoginDetails();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: '400px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>
                    Login
                </Typography>

                <form onSubmit={handleFormSubmit}>
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
                        <IconButton onClick={toggleShowPassword} sx={{width:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"}}}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Box>

                    <Button variant="contained" type="submit" fullWidth sx={{fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"}}}>
                        Login
                    </Button>

                    <Typography sx={{ marginTop: 2, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"} }}>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
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

export default Login;
