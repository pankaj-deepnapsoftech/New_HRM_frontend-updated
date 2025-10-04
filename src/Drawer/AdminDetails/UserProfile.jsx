import React from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

const UserProfile = ({ showUserMenu, setShowMenu }) => {
  const fullName = useSelector((state) => state.Auth.fullName);
  const username = useSelector((state) => state.Auth.username);
  const email = useSelector((state) => state.Auth.email);
  const phone = useSelector((state) => state.Auth.phone);

  const FirstLetter = fullName?.split(" ").map((word) => word[0]).join("").toUpperCase()



  const handleBackgroundClick = () => {
    setShowMenu(false);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className={`fixed top-0 left-0 w-full h-screen inset-0 z-50 bg-black/40 flex items-center justify-center transition-opacity duration-300 ease-in-out
        ${showUserMenu ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
      {/* Modal Content */}
      <div
        onClick={handleContentClick}
        className={`w-full max-w-md bg-white rounded-2xl shadow-2xl relative transform transition-all duration-300 ease-in-out
          ${showUserMenu ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="h-24 bg-indigo-500 p-5 text-white flex items-start justify-end rounded-t-2xl">
          
          <button
            className="text-white hover:text-red-400 transition"
            onClick={() => setShowMenu(false)}
            aria-label="Close"
          >
            <IoIosClose size={28} />
          </button>
        </div>

        
        <div className="flex justify-center -mt-12">
          
        </div>

        {/* User Info */}
        <div className="px-6 py-6 text-gray-900 text-sm sm:text-base">
          <div className="flex flex-col items-center justify-center mb-6 text-center">
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-500 text-white font-bold text-xl rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-2">
              {FirstLetter}
            </div>

            <p className="mt-2 text-base text-gray-700 font-medium tracking-wide">
              Admin
            </p>
          </div>


          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">User Name</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">
                {username}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Email</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">
                {email}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Phone Number</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">
                {phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
