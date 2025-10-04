import Header from "@/Components/shared/Header";
import Sidebar from "@/Components/shared/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex  h-screen font-sans text-gray-800 overflow-hidden" style={{ backgroundColor: '#e6f7f9' }}>
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header />

        <div className="flex-1 outlet-scroll  overflow-y-auto p-2" style={{ backgroundColor: '#f0fbfc' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
