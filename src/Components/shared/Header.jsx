import React, { useState } from "react";
import { FaRegBell, FaBars } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import UserProfile from "@/pages/UserProfile";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="w-full h-16 border-b border-gray-400 shadow-md shadow-neutral-400 bg-white px-4 sm:px-6 md:px-10 flex items-center justify-between">
    
      <div className="flex items-center gap-10">
        
        
        {/* Search Bar */}
       <div className="relative w-48 ml-12 md:ml-1  md:w-72 right-4">
  <input
    type="search"
    placeholder="Type to Search..."
    className="w-full pl-4 pr-12 py-1.5 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
  />
  
  <div className="absolute right-0 top-0 bottom-0 bg-[#818185c7] px-3 flex items-center justify-center rounded-tr rounded-br cursor-pointer">
    <IoSearchSharp className="text-white text-lg"/>
  </div>
</div>

      </div>

      {/* Right Section: Notification & User */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="bg-[#818185c7] w-10 h-10 flex items-center justify-center rounded-full">
          <FaRegBell className="text-gray-100 text-xl" />
        </div>

        <div className="relative">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="bg-[#818185c7] text-gray-100 font-semibold text-xl w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            DK
          </div>
        </div>

        <UserProfile
          showUserMenu={showUserMenu}
          setShowMenu={setShowUserMenu}
        />
      </div>
    </div>
  );
};

export default Header;
