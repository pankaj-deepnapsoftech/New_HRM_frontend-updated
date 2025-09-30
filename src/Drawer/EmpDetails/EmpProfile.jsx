import React from "react";
import { IoIosClose } from "react-icons/io";

const EmpProfile = ({ showUserMenu, setShowMenu }) => {
  const handleBackgroundClick = () => {
    setShowMenu(false);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className={`fixed top-0 left-0 w-full h-screen inset-0 z-50 bg-black/40 p-4 flex items-start md:items-center justify-center transition-opacity duration-300 ease-in-out
        ${showUserMenu ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 scale-95 md:scale-100"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="h-28 bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white flex items-start justify-between rounded-t-2xl shadow-md">
          <h1 className="text-xl md:text-2xl font-semibold">Employee Profile</h1>
          <button
            className="text-white hover:text-gray-300 transition"
            onClick={() => setShowMenu(false)}
            aria-label="Close"
          >
            <IoIosClose size={28} />
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src="/3dd.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info Section */}
        <div className="px-6 py-6 text-gray-900 text-sm sm:text-base">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Dinki Kaur</h2>
            <p className="text-sm md:text-base text-gray-400">Employee</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition cursor-default">
              <span className="font-medium text-gray-700">User Name</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">21</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition cursor-default">
              <span className="font-medium text-gray-700">Email</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Graduated</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition cursor-default">
              <span className="font-medium text-gray-700">Phone</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Faridabad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
