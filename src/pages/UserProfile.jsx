import React from "react";
import { IoIosClose } from "react-icons/io";
const UserProfile = ({ showUserMenu, setShowMenu}) => {
  return (
    <div
      className={`${
        showUserMenu ? "flex" : "hidden"
      } fixed inset-0 z-50 bg-black/50 p-4 items-center justify-center`}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-purple-600 to-purple-400  p-5 text-white flex  items-top justify-between">
          <h1 className="text-xl font-semibold">User Profile</h1>
           
          <button
            className="text-white hover:text-gray-300 relative -top-3"
           onClick={() => setShowMenu(false)}
          >
            <IoIosClose size={28} />
          </button>
        </div>
        <div className=" w-full flex justify-center">
         <img
        src="/image.jpg" 
        alt="Profile"
        className="w-24 h-24 relative -top-10 rounded-full object-cover border-4 border-white "
      /></div>
        <div className="pb-6 space-y-4 bg-white text-gray-900 text-sm sm:text-base">
          <div className="text-center">
        <h2 className="text-xl font-bold">Dinki Kaur</h2>
        <p className="text-sm text-gray-900">Admin</p>
      </div>

          <div className="w-full text-sm space-y-3 px-10">
        <div className="flex justify-between">
          <span className="font-medium">Age</span>
          <span className="bg-blue-400/40 text-gray-600 h-6 w-10 rounded-full inline-block text-center font-semibold">21</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Education</span>
          <span className="bg-blue-400/40 text-gray-600 h-5 w-24 rounded-full inline-block text-center font-semibold">Graduated</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Location</span>
          <span className="bg-blue-400/40 text-gray-600 h-5 w-20 rounded-full inline-block text-center font-semibold">Faridabad</span>
        </div>
      </div>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
