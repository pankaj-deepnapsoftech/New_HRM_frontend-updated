import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuperAdminRouteGuard = ({ children }) => {
    const Auth = useSelector((state) => state.Auth);

    // Check if user is authenticated
    if (!Auth || !Auth.isLogin) {
        return <Navigate to="/" replace />;
    }

    // STRICT: Only SuperAdmin users can access SuperAdmin routes
    // Block Admin and all other users
    if (Auth.role !== 'SuperAdmin') {
        // Redirect Admin users to their dashboard
        if (Auth.role === 'Admin') {
            return <Navigate to="/dashboard" replace />;
        }
        // Redirect other users to home
        return <Navigate to="/" replace />;
    }

    // Only SuperAdmin users reach here
    return children;
};

export default SuperAdminRouteGuard;



