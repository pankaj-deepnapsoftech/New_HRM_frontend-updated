
import React from "react";
import { IoIosClose } from "react-icons/io"

const UserProfile = ({ showUserMenu, setShowMenu }) => {



  return (
    <div

      className={`fixed top-0 left-0 w-full h-screen inset-0 z-50 bg-black/40 p-4 flex items-center justify-center transition-opacity duration-300 ease-in-out
      ${showUserMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}


    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative">

        <div className="h-24 bg-gradient-to-r from-[#533F60] to-[#372a41] p-5 text-white flex items-start justify-between">
          <h1 className="text-xl font-semibold">User Profile</h1>
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setShowMenu(false)}
            aria-label="Close"
          >
            <IoIosClose size={28} />
          </button>
        </div>


        <div className="flex justify-center -mt-12">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Profile"
            className="w-24 h-24  rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>


        <div className="px-6 py-4 text-gray-900 text-sm sm:text-base">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Dinki Kaur</h2>
            <p className="text-sm text-gray-600">Admin</p>
          </div>


          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Age</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">21</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Education</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">Graduated</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Location</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold">Faridabad</span>
            </div>
          </div>



        </div>
      </div>


    </div>
  );
};

export default UserProfile;
