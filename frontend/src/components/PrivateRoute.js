import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.user_type.toLowerCase())) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;