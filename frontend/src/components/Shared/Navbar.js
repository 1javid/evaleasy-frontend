// filepath: /frontend/src/components/Shared/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SmartEval
                </Typography>
                {auth ? (
                    <Button color="inherit" onClick={handleLogout}>
                        {t('logout')}
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        {t('login')}
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;