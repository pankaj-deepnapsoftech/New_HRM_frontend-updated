import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuperAdminRouteGuard = ({ children }) => {
    const Auth = useSelector((state) => state.Auth);

    // Check if user is authenticated and has SuperAdmin role
    if (!Auth.isLogin) {
        return <Navigate to="/" replace />;
    }

    if (Auth.role !== 'SuperAdmin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SuperAdminRouteGuard;



