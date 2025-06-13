import React, { useEffect, useRef } from "react";
import { FaHome, FaFingerprint } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {  RiMoneyRupeeCircleFill, RiSecurePaymentLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {useLogoutUserMutation } from "@/service/Auth.services";
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
      const res = await LogoutUser({isMobile, browser: browserName}).unwrap();
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
    icon: <FaHome  className="text-2xl" />,
    path: "/user",
    element:<UserDashboard/>
  },
  {
    text:<span className="text-[1rem] font-semibold">View Attendance</span>,
     icon: <FaFingerprint className="text-2xl" />,
   path:"/user/attendance",
   element:<UserAttendance/>
  },
  {
    text: <span className="text-[1rem] font-semibold">Request Leave</span>,
    icon: <RiMoneyRupeeCircleFill
     className="text-2xl" />,
    path: "/user/request-leave",
    element:<UserLeaveRequest/>
  },
    
    {
      text: <span className="text-[1rem] font-semibold">Document</span>,
      icon: <HiOutlineDocumentReport className="text-xl" />,
      path: "/user/document",
      element: <UserDocument/>,
    },
    {
      text: <span className="text-[1rem] font-semibold">Advanced Money</span>,
      icon: <TbReportMoney className="text-2xl " />,
      path: "/user/advance-money",
      element: <AdvanceMoneyRequest/>,
    },
    {
      text: <span className="text-[1rem] font-semibold">Payslip</span>,
    icon: <RiSecurePaymentLine className="text-2xl " />,
      path: "/user/payslip",
      element: <UserPaySlip/>,
    },
    {
      text: <span className="text-[1rem] font-semibold">Assets</span>,
      icon: <GiLaptop className="text-2xl" />,
      path: "/user/assets",
      element: <UserAssets />,
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
          className={`sidebar-scroll  overflow-y-auto fixed top-0 left-0 bottom-0 h-screen  w-full bg-gradient-to-t from-[#281c30] to-[#806097] text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
  ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:block`}
        >
          <div className="flex items-center py-1 w-full border-b border-white/40   ">
            <img
              src="/d logo.png"
              alt="Deepnap Softech Logo"
              className="brightness-0 invert h-[120px] "
            />
            <h2 className="text-xl relative right-4 font-bold tracking-wide">
              Deepnap Softech
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-1 mt-6 px-4 text-sm">
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
                  ? "bg-white/80 text-purple-500 font-bold shadow-md"
                  : "hover:bg-white/10"
              }`}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>

                  {/* Submenu */}
                  {item.subMenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => {
                        const isSubActive = currPath === subItem.path;
                        return (
                          <div
                            key={subIndex}
                            onClick={() => {
                              navigator(subItem.path);
                              if (window.innerWidth < 768)
                                setShowSidebar(false);
                            }}
                            className={`flex items-center gap-1 px-1 py-3 rounded-md cursor-pointer transition duration-300 
                      ${
                        isSubActive
                          ? "bg-white/80 text-purple-500 font-bold shadow-md"
                          : "hover:bg-white/10"
                      }`}
                          >
                            {subItem.icon}
                            <span>{subItem.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-auto w-full px-6 py-4">
            <button
              onClick={handleLogout}
              className=" w-40  flex items-center justify-center py-2 mt-8  mb-5 p-3 bg-white/50 text-white font-semibold rounded-lg transition duration-300 hover:brightness-110 hover:scale-105"
            >
              {" "}
              <FiLogOut size={15} className="shrink-0  " />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default UserSidebar;
