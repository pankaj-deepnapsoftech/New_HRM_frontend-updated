import React from "react";
import { FaUserCircle } from "react-icons/fa";

const EmpAccountSettings = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start md:items-center justify-center overflow-auto p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 border-r border-gray-200 pr-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src="/profilee.png"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg"
              />
              <div className="absolute -bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition">
                <FaUserCircle className="w-6 h-6" />
              </div>
            </div>
            <h2 className="font-semibold text-lg mb-6 text-gray-700">Nitin</h2>
            <ul className="space-y-4 w-full">
              <li className="text-gray-600 hover:text-blue-500 font-semibold cursor-pointer transition-colors">
                Account Settings
              </li>
              <li className="text-gray-600 hover:text-blue-500 font-semibold cursor-pointer transition-colors">
                Privacy
              </li>
            </ul>
          </aside>

          {/* Form Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Account Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="Ryan"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="Gosling"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="Sebastian"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="******"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">E-mail</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="ryan876@gmail.com"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  defaultValue="+380997601979"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6 justify-start">
              <button className="bg-gradient-to-br from-blue-400 to-blue-600 hover:scale-105 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition transform">
                Save
              </button>
              <button
                onClick={onClose}
                className="text-gray-600 px-6 py-2 border border-gray-300 rounded-lg hover:scale-105 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAccountSettings;
