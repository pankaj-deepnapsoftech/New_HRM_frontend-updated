
import Header from '@/Components/shared/Header';
import Sidebar from '@/Components/shared/Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <main className="flex min-h-screen font-sans bg-gray-50 text-gray-800">
            
            <aside className="w-64 bg-white shadow-md">
                <Sidebar />
            </aside>
          
            <div className="flex flex-col flex-1">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default RootLayout; 
