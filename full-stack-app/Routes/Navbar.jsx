import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [show, setShow] = useState(false);

    const toggleMenu = () => {
        setShow((prevShow) => !prevShow);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#1976d2', 
                color: 'white',
                boxShadow: 1,
            }}
        >
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                MyApp
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={toggleMenu} sx={{ color: 'white' }}>
                    {show ? <CloseIcon /> : <MenuOutlinedIcon />}
                </Button>
            </Box>
            {show && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'absolute', top: 60, right: 20, backgroundColor: '#1976d2', padding: 2, borderRadius: 1, opacity:10 }}>
                    <Button component={Link} to="/signup" variant="contained" sx={{ color: 'white' }}>
                        Sign Up
                    </Button>
                    <Button component={Link} to="/login" variant="contained" sx={{ color: 'white' }}>
                        Login
                    </Button>
                    <Button component={Link} to="/" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                        Home
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Navbar;
