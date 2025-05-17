
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import UserProfile from "@/pages/UserProfile";

const Header = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (

    <div className="w-full h-14 border-b border-gray-400 shadow-md shadow-neutral-400 relative flex items-center justify-end pr-10 bg-white">
      <div className="bg-[#d5bbf083] w-10 h-10 flex items-center justify-center rounded-full mr-4">
        <FaRegBell className="text-purple-900 text-xl" />
      </div>

      <div className="relative">
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="bg-[#d5bbf083] text-purple-900 font-semibold text-xl w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        >
          DK
        </div>
        
{/* 
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
                  Dinki
                </div>
                <div>
                  <p className="font-semibold text-sm">Dinki Kaur</p>
                  <p className="text-sm text-gray-500">dinki@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="divide-y">
              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-sm">
                <FaSignOutAlt /> Logout
              </button>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left text-sm"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 /> Close
              </button>
            </div>
          </div>
        )} */}
      </div>
      <UserProfile showUserMenu={showUserMenu} setShowMenu={setShowUserMenu} />
    </div>
  );
};

export default Header;
