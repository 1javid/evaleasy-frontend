import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

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
            setError(err.response?.data || 'Failed to login.');
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default Login;