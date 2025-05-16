import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex bg-gray-100">
            <div className="w-1/2 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center relative">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/30 rounded-full blur-3xl opacity-30 z-0"></div>
                <img
                    src="/Mobile login-rafiki.png"
                    alt="login illustration"
                    className="relative z-10 w-full max-w-md"
                />
            </div>
            <Outlet />
        </div>
    )
}

export default AuthLayout