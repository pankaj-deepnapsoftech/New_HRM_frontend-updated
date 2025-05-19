import React, { useState } from "react";
import { FaRegBell, FaBars } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import UserProfile from "@/pages/UserProfile";

const Header = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="w-full h-16 border-b border-gray-400 shadow-md shadow-neutral-400 bg-white px-4 sm:px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            <FaBars className="text-2xl text-black" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-52 sm:w-64 md:w-72">
          <input
            type="search"
            placeholder="Type to search..."
            className="w-full pl-10 pr-10 py-2  border border-gray-300 shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* <div className="bg-purple-500 ">
            <IoSearchSharp className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800 " />
          </div> */}
          <div className="px-3 flex items-center justify-center border border-purple-400">
            <IoSearchSharp className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800 " />
          </div>
        </div>
      </div>

      {/* Right Section: Notification & User */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="bg-[#d5bbf083] w-10 h-10 flex items-center justify-center rounded-full">
          <FaRegBell className="text-purple-900 text-xl" />
        </div>

        <div className="relative">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="bg-[#d5bbf083] text-purple-900 font-semibold text-xl w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
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
