/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "@/Routes/Layouts/AuthLayout";
import { AuthRoute } from "@/Routes/Routing/AuthRoutes";
import RootLayout from "@/Routes/Layouts/RootLayout";
import SuperAdminLayout from "@/Routes/Layouts/SuperAdminLayout";
import { MainRoutes } from "@/Routes/Routing/MainRoutes";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import SuperAdminRouteGuard from "@/Components/SuperAdminRouteGuard";
import { useDispatch, useSelector } from "react-redux";
import { useLogedInuserQuery } from "@/service/Auth.services";
import { addData } from "@/store/slice/AuthSlice";

import Login from "@/pages/UserAuth/Login";
import Register from "@/pages/UserAuth/Register";
import EmpLogin from "@/pages/UserAuth/Login";
import Subscription from "@/pages/Subscription";

import UserLayout from "./Layouts/UserLayout";
import { UserRoute } from "./Routing/UserRoute";
import Loader from "@/Components/Loader/Loader";
// import Header from '@/Components/UserHeader';

const AppRoutes = () => {
  const { isLoading, data, refetch } = useLogedInuserQuery("");
  const dispatch = useDispatch();
  const { Auth } = useSelector((state) => state);

  useEffect(() => {
    if (data?.data) {
      dispatch(addData(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (Auth.isLogin) {
      refetch();
    }
  }, [Auth.isLogin, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {data?.data && data?.data?.role === "SuperAdmin" && (
        <Route path="/" element={<Navigate to="/superadmin-dashboard" replace />} />
      )}
      {!data?.data && (
        <Route element={<AuthLayout />}>
          {AuthRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

      {(data?.data && (data?.data?.role === "Admin" || data?.data?.role === "SuperAdmin")) && (
        <Route element={<RootLayout />}>
          {MainRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

      {data?.data && data?.data?.role === "SuperAdmin" && (
        <Route element={<SuperAdminLayout />}>
          <Route
            path="/superadmin-dashboard"
            element={<SuperAdminRouteGuard><SuperAdminDashboard /></SuperAdminRouteGuard>}
          />
        </Route>
      )}

      {data?.data && data?.data?.role !== "Admin" && data?.data?.role !== "SuperAdmin" && (
        <Route path="/user" element={<UserLayout />}>
          {UserRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

     
      <Route path="/register" element={<Register />} />
      <Route path="/subscription" element={<Subscription />} />
      {/* Fallback to ensure we always have a home route */}
      {!data?.data && <Route path="/" element={<Navigate to="/" replace />} />}
      {data?.data && data?.data?.role === 'Admin' && (
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      )}
      {data?.data && data?.data?.role !== 'Admin' && data?.data?.role !== 'SuperAdmin' && (
        <Route path="/" element={<Navigate to="/user" replace />} />
      )}
    </Routes>
  );
};
export default AppRoutes;
