import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import { AuthRoutes } from '@/Routes/Routing/AuthRoutes'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                {/* {AuthRoutes.map((item)=>{ */}
                <Route path="/" element={<Login />} />
                <Route path="/singup" element={<Signup />} />
                {/* })} */}
            </Route>
        </Routes>
    )
}

export default AppRoutes