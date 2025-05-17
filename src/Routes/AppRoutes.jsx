import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '@/Routes/Layouts/AuthLayout'
import { AuthRoute } from '@/Routes/Routing/AuthRoutes'
import RootLayout from '@/Routes/Layouts/RootLayout'
import { MainRoutes } from '@/Routes/Routing/MainRoutes'

const AppRoutes = () => {

    return (
        <Routes>
            {/* Auth Routing */}
            <Route element={<AuthLayout />}>
                {
                    AuthRoute.map((item, index) =>
                        <Route key={index} path={item.path} element={item.element} />
                    )
                }
            </Route>

            {/* main routing */}

            <Route element={<RootLayout />}>
                {MainRoutes.map((item,index) => <Route key={index} path={item.path} element={item.element} />)}
            </Route>

        </Routes>
    )
}

export default AppRoutes