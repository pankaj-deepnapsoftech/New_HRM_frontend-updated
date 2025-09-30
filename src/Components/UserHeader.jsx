import React, { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import EmpMenuBar from "@/Drawer/EmpDetails/EmpMenuBar";
import EmpNotification from "@/Drawer/EmpDetails/EmpNotification";
import { useLogedInuserQuery } from "@/service/Auth.services";

const UserHeader = () => {
  const [showEmpMenuBar, setShowEmpMenuBar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef();
  const { data: username } = useLogedInuserQuery()
  const userName = username?.data?.fullName ;

  const userInitials = userName?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-16 border-b border-gray-200 shadow-sm bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 md:px-10 flex items-center justify-between z-10">
      {/* Right Section: Notification & User */}
      <div className="flex items-center gap-5 ml-auto relative">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-300 shadow-sm"
          >
            <FaRegBell className="text-gray-600 text-xl sm:text-2xl hover:text-blue-600 transition-colors" />
            {/* Badge */}
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 shadow">
              3
            </span>
          </button>
          {showNotification && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-3 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-200 animate-fadeIn scale-95 origin-top transition-transform duration-300 z-50"
            >
              <EmpNotification />
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative w-10 h-10">
          {/* Pulsating Outer Ring */}
          <span className="absolute inset-0 rounded-full border-4 border-blue-300 animate-pulseSlow z-0"></span>

          <div
            onClick={() => setShowEmpMenuBar(!showEmpMenuBar)}
            className="relative z-10 bg-gradient-to-br from-blue-600 to-sky-500 text-white font-semibold text-lg w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 shadow-2xl transition-transform duration-300"
          >
            {userInitials}
          </div>
        </div>
      </div>

      {/* Drawer / Sidebar */}
      <EmpMenuBar
        setShowEmpMenuBar={setShowEmpMenuBar}
        showEmpMenuBar={showEmpMenuBar}
      />

      {/* Animations */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }

        .animate-pulseSlow {
          animation: pulseSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UserHeader;
