import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Shared/LanguageSwitcher';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            login(response.data);
            setError(null);

            // Redirect based on user role
            const userType = response.data.user_type.toLowerCase();
            if (userType === 'admin') {
                navigate('/admin');
            } else if (userType === 'institution representative') {
                navigate('/representative');
            } else if (userType === 'instructor') {
                navigate('/instructor');
            } else {
                navigate('/login');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.non_field_errors?.[0] || t('failed_to_login');
            setError(errorMessage);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 8, p: 4, border: '1px solid #ccc', borderRadius: 2 }}>
                <LanguageSwitcher />
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>{t('login')}</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label={t('email')}
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label={t('password')}
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit">
                        {t('login')}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;