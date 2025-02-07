import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RedirectHandler = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        } else {
            const userType = auth.user_type.toLowerCase();
            if (userType === 'admin') {
                navigate('/admin');
            } else if (userType === 'institution representative') {
                navigate('/representative');
            } else if (userType === 'instructor') {
                navigate('/instructor');
            }
        }
    }, [auth, navigate]);

    return null;
};

export default RedirectHandler;