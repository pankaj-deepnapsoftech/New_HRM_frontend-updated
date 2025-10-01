/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/Routes/Layouts/AuthLayout";
import { AuthRoute } from "@/Routes/Routing/AuthRoutes";
import RootLayout from "@/Routes/Layouts/RootLayout";
import { MainRoutes } from "@/Routes/Routing/MainRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useLogedInuserQuery } from "@/service/Auth.services";
import { addData } from "@/store/slice/AuthSlice";

import Login from "@/pages/UserAuth/Login";
import Register from "@/pages/UserAuth/Register";
import EmpLogin from "@/pages/UserAuth/Login";

import UserLayout from "./Layouts/UserLayout";
import { UserRoute } from "./Routing/UserRoute";
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
    return <p>loading...</p>;
  }

  return (
    <Routes>
      {!data?.data && (
        <Route element={<AuthLayout />}>
          {AuthRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

      {data?.data && data?.data?.role === "Admin" && (
        <Route element={<RootLayout />}>
          {MainRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

      {data?.data && data?.data?.role !== "Admin" && (
        <Route path="/user" element={<UserLayout />}>
          {UserRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      )}

      <Route path="/login" element={<EmpLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default AppRoutes;
