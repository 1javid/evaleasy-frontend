// filepath: /d:/React/evaleasy-frontend/frontend/src/components/RedirectHandler.js
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RedirectHandler = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        } else {
            const userType = auth.user_type.toLowerCase();
            const currentPath = location.pathname;

            if (userType === 'admin' && currentPath !== '/admin') {
                navigate('/admin');
            } else if (userType === 'institution representative' && currentPath !== '/representative') {
                navigate('/representative');
            } else if (userType === 'instructor' && currentPath !== '/instructor' && !currentPath.startsWith('/subject/') && !currentPath.startsWith('/question-pool/') && !currentPath.startsWith('/test/') && !currentPath.startsWith('/assessment/')) {
                navigate('/instructor');
            }
        }
    }, [auth, navigate, location]);

    return null;
};

export default RedirectHandler;