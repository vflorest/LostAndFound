import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Verificar si hay un token de autenticación

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
