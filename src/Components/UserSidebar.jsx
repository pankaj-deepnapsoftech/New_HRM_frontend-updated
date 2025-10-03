import React, { useEffect, useRef } from "react";
import { FaHome, FaFingerprint, FaFileContract } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiMoneyRupeeCircleFill, RiSecurePaymentLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/service/Auth.services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeData } from "@/store/slice/AuthSlice";

// Pages
import EmpLeaveBalance from "@/pages/EmpLeaveBalance";
import SalaryManagement from "@/pages/SalaryManagement";
import UserDashboard from "@/pages/UserPanel/UserDashboard";
import { GiLaptop } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import UserAttendance from "@/pages/UserPanel/UserAttendence";
import UserLeaveRequest from "@/pages/UserPanel/UserLeaveRequest";
import UserDocument from "@/pages/UserPanel/UserDocument";
import AdvanceMoneyRequest from "@/pages/UserPanel/AdvanceMoneyRequest";
import UserPaySlip from "@/pages/UserPanel/UserPaySlip";
import UserAssets from "@/pages/UserPanel/UserAssets";
import TermsAndConditions from "@/pages/UserPanel/TermsAndConditions";
import { browserName, isMobile } from "react-device-detect";

const UserSidebar = ({ showSidebar, setShowSidebar }) => {
  const navigator = useNavigate();

  const sidebarRef = useRef(null);
  const [LogoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const currPath = location.pathname;

  const handleLogout = async () => {
    try {
      const res = await LogoutUser({ isMobile, browser: browserName }).unwrap();
      dispatch(removeData());
      toast.success(res.message || "Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      text: <span className="text-[1rem] font-semibold">Home</span>,
      icon: <FaHome className="text-2xl" />,
      path: "/user",
      element: <UserDashboard />,
    },
    {
      text: <span className="text-[1rem] font-semibold">View Attendance</span>,
      icon: <FaFingerprint className="text-2xl" />,
      path: "/user/attendance",
      element: <UserAttendance />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Request Leave</span>,
      icon: <RiMoneyRupeeCircleFill className="text-2xl" />,
      path: "/user/request-leave",
      element: <UserLeaveRequest />,
    },

    {
      text: <span className="text-[1rem] font-semibold">Document</span>,
      icon: <HiOutlineDocumentReport className="text-xl" />,
      path: "/user/document",
      element: <UserDocument />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Advanced Money</span>,
      icon: <TbReportMoney className="text-2xl " />,
      path: "/user/advance-money",
      element: <AdvanceMoneyRequest />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Payslip</span>,
      icon: <RiSecurePaymentLine className="text-2xl " />,
      path: "/user/payslip",
      element: <UserPaySlip />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Assets</span>,
      icon: <GiLaptop className="text-2xl" />,
      path: "/user/assets",
      element: <UserAssets />,
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Terms & Conditions</span>
      ),
      icon: <FaFileContract className="text-2xl" />,
      path: "/user/terms-conditions",
      element: <TermsAndConditions />,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-10">
        <div className="md:hidden absolute z-50 top-4 left-3">
          {/* <button onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars className="text-2xl text-black" />
          </button> */}
        </div>
      </div>
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-30 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div className=" flex w-full  min-h-screen">
        <aside
          ref={sidebarRef}
          className={`sidebar-scroll overflow-y-auto fixed top-0 left-0 bottom-0 h-screen w-64 md:w-72 
  bg-white text-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
  ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:flex md:flex-col`}
        >
          {/* Logo */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-100 to-indigo-50 shadow-sm rounded-b-xl">
            <div className="flex-shrink-0 relative">
              <img
                src="/d logo.png"
                alt="Deepnap Softech Logo"
                className="h-14 w-14 rounded-lg bg-white p-1 shadow-md transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-lg md:text-xl font-medium tracking-wide text-sky-800">
              Deepnap Softech
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-1 mt-6 px-4 text-sm flex-1">
            {menuItems.map((item, index) => {
              const isActive = item.path && currPath === item.path;
              return (
                <div key={index}>
                  <div
                    onClick={() => {
                      if (item.path) navigator(item.path);
                      if (item.onClick) item.onClick();
                      if (window.innerWidth < 768) setShowSidebar(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition duration-300 
              ${
                isActive
                  ? "bg-indigo-500 text-white font-bold shadow-md"
                  : "hover:bg-indigo-50 hover:text-indigo-600"
              }`}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Logout at bottom */}
          <div className="mt-auto w-full px-6 py-6 border-t border-gray-300">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
              style={{
                background: "linear-gradient(80deg, #1e40af 0%, #4f46e5 100%)",
                backgroundSize: "200% 200%",
                animation: "gradientAnimation 4s ease infinite",
              }}
            >
              <FiLogOut size={15} className="shrink-0" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default UserSidebar;
