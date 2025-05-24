import Header from "@/Components/shared/Header";
import Sidebar from "@/Components/shared/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex  h-screen font-sans bg-gray-50 text-gray-800 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header />

        <div className="flex-1 outlet-scroll overflow-y-auto p-2 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
