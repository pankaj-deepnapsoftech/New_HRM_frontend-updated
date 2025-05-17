import Sidebar from '@/Components/shared/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <main className="flex min-h-screen font-sans bg-gray-50 text-gray-800">
            <Sidebar />
            <Outlet />
        </main>
    )
}

export default RootLayout