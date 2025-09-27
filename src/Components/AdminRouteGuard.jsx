import React from 'react';
import { useLogedInuserQuery } from '@/service/Auth.services';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRouteGuard = ({ children }) => {
  const { data, isLoading } = useLogedInuserQuery("");

  // Show loading while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user is logged in and has Admin role
  if (!data?.data) {
    toast.error('Please login to access this page');
    return <Navigate to="/" replace />;
  }

  if (data?.data?.role !== 'Admin') {
    toast.error(`Access denied. Admin privileges required. Current role: ${data?.data?.role}`);
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default AdminRouteGuard;
