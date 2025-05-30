/* eslint-disable no-undef */
import React, { useEffect } from 'react' ;
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/Routes/Layouts/AuthLayout';
import { AuthRoute } from '@/Routes/Routing/AuthRoutes';
import RootLayout from '@/Routes/Layouts/RootLayout';
import { MainRoutes } from '@/Routes/Routing/MainRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useLogedInuserQuery } from '@/service/Auth.services';
import { addData } from '@/store/slice/AuthSlice';

const AppRoutes = () => {
    const { isLoading, data,refetch } = useLogedInuserQuery("");
    const dispatch = useDispatch();
    const {Auth} = useSelector((state) => state);

    useEffect(() => {
        if (data?.data) {
            dispatch(addData(data.data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (Auth.isLogin || !Auth.isLogin) {
            console.log("this is call again")
            refetch(); 
        };
    },[Auth.isLogin,refetch])
    
    if(isLoading){
        return <p>loading...</p>
    }

    return (
        <Routes>
          
            {!data?.data && <Route element={<AuthLayout />}>
                {
                    AuthRoute.map((item, index) =>
                        <Route key={index} path={item.path} element={item.element} />
                    )
                }
            </Route>}

        
            {data?.data && <Route element={<RootLayout />}>
                {MainRoutes.map((item, index) => <Route key={index} path={item.path} element={item.element} />)}
            </Route>}

        </Routes>
    )
}

export default AppRoutes