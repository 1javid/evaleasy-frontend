// filepath: /d:/React/evaleasy-frontend/frontend/src/components/Shared/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EvalEasy
                </Typography>
                {auth ? (
                    <Box>
                        {auth.user_type.toLowerCase() === 'admin' && (
                            <Button color="inherit" component={Link} to="/admin">
                                Admin Dashboard
                            </Button>
                        )}
                        {auth.user_type.toLowerCase() === 'institution representative' && (
                            <Button color="inherit" component={Link} to="/representative">
                                Representative Dashboard
                            </Button>
                        )}
                        {auth.user_type.toLowerCase() === 'instructor' && (
                            <Button color="inherit" component={Link} to="/instructor">
                                Instructor Dashboard
                            </Button>
                        )}
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;