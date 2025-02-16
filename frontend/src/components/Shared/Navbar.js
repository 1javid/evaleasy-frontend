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
                    <Box>
                        {auth.user_type.toLowerCase() === 'admin' && (
                            <Button color="inherit" component={Link} to="/admin">
                                {t('admin_dashboard')}
                            </Button>
                        )}
                        {auth.user_type.toLowerCase() === 'institution representative' && (
                            <Button color="inherit" component={Link} to="/representative">
                                {t('representative_dashboard')}
                            </Button>
                        )}
                        {auth.user_type.toLowerCase() === 'instructor' && (
                            <Button color="inherit" component={Link} to="/instructor">
                                {t('instructor_dashboard')}
                            </Button>
                        )}
                        <Button color="inherit" onClick={handleLogout}>
                            {t('logout')}
                        </Button>
                    </Box>
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