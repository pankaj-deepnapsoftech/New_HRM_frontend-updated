import React, { useState } from "react";
import UserSidebar from "@/Components/UserSidebar";
import UserHeader from "@/Components/UserHeader";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-full font-sans bg-gray-50 text-gray-800 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden shadow-md w-full bg-gray-100 p-4 flex items-center justify-between">
        <button
          className="text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>
        <UserHeader isMobile />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-white z-40 w-64 md:w-[20%] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow md:shadow-none`}
      >
        <UserSidebar
          showSidebar={sidebarOpen}
          setShowSidebar={setSidebarOpen}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen w-full md:w-[80%]">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <UserHeader />
        </div>

        {/* Main Page Content */}
        <div class="h-screen overflow-y-auto px-4 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
