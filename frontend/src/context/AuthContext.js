// filepath: /d:/React/evaleasy-frontend/frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth) {
            setAuth(storedAuth);
        }
    }, []);

    const login = (userData) => {
        setAuth(userData);
        localStorage.setItem('auth', JSON.stringify(userData));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};