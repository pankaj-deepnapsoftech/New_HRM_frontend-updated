import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaFingerprint, FaBars } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  RiListSettingsLine,
  RiMoneyRupeeCircleFill,
  RiMoneyRupeeCircleLine,
  RiSecurePaymentLine,
} from "react-icons/ri";
import {
  MdPerson,
  MdCoPresent,
  MdOutlineBlock,
  MdOutlineStickyNote2,
} from "react-icons/md";
import { TbListDetails, TbReportMoney } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import {
  GiLaptop,
  GiSecurityGate,
  GiMoneyStack,
  GiTakeMyMoney,
} from "react-icons/gi";
import { FiAlertTriangle } from "react-icons/fi";

const Sidebar = () => {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const handleAttendanceToggle = () => setAttendanceOpen(!attendanceOpen);
  const handlePayrollToggle = () => setPayrollOpen(!payrollOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
      text: <span className="text-[1rem]  font-semibold">Dashboard</span>,
      icon: <FaHome className="text-2xl " />,
      path: "/home",
    },
    {
      text: <span className="text-[1rem] font-semibold">Employees</span>,
      icon: <BsPersonCircle className="text-2xl " />,
      path: "/employee-details",
    },
    {
      text: <span className="text-[1rem] font-semibold">Projects</span>,
      icon: <HiOutlineDocumentReport className="text-1xl " />,
      path: "/projects",
    },
    {
      text: <span className="text-[1rem] font-semibold">Reports</span>,
      icon: <RiListSettingsLine className="text-2xl " />,
      path: "/reports",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Update Leave Balance</span>
      ),
      icon: <MdPerson className="text-2xl " />,
      path: "/employee/leave/changes",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Salary Management</span>
      ),
      icon: <RiMoneyRupeeCircleFill className="text-2xl " />,
      path: "/employee/salary/management",
    },
    {
      text: <span className="text-[1rem] font-semibold">Attendence</span>,
      icon: <MdCoPresent className="text-2xl" />,
      onClick: handleAttendanceToggle,
      subMenu: attendanceOpen && [
        {
          text: (
            <span className="text-[1rem] font-semibold">Daily Attendence</span>
          ),
          icon: <MdCoPresent className="text-xl mr-2" />,
          path: "/employee/daily/attendance",
        },
        {
          text: (
            <span className="text-[1rem] font-semibold">All Attendance</span>
          ),
          icon: <FaFingerprint className="text-2xl mr-2" />,
          path: "/employee/all/attendence",
        },
        {
          text: <span className="text-[1rem] font-semibold">All Leave</span>,
          icon: <TbListDetails className="text-2xl mr-2" />,
          path: "/employee/all/leave",
        },
      ],
    },
    {
      text: <span className="text-[1rem] font-semibold">Emp Location</span>,
      icon: <IoLocationOutline className="text-2xl " />,
      path: "/employee/location",
    },
    {
      text: <span className="text-[1rem] font-semibold">Assets</span>,
      icon: <GiLaptop className="text-2xl " />,
      path: "/company/assets",
    },
    {
      text: <span className="text-[1rem] font-semibold">Terminated Emp</span>,
      icon: <MdOutlineBlock className="text-2xl " />,
      path: "/employee/termination",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Gatepass Approval</span>
      ),
      icon: <GiSecurityGate className="text-2xl " />,
      path: "/gatepass/approval",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Show Cause Notice</span>
      ),
      icon: <FiAlertTriangle className="text-2xl " />,
      path: "/view/employee/show/cause/notice",
    },
    {
      text: <span className="text-[1rem] font-semibold">Payroll</span>,
      icon: <RiMoneyRupeeCircleLine className="text-2xl" />,
      onClick: handlePayrollToggle,
      subMenu: payrollOpen && [
        {
          text: (
            <span className="text-[1rem] font-semibold">Payroll Summary</span>
          ),
          icon: <MdOutlineStickyNote2 className="text-2xl mr-2" />,
          path: "/employee/payrollSummary",
        },
        {
          text: (
            <span className="text-[1rem] font-semibold">Advanced Money</span>
          ),
          icon: <TbReportMoney className="text-2xl mr-2" />,
          path: "/employee/advance/money/request",
        },
        {
          text: <span className="text-[1rem] font-semibold">Incentives</span>,
          icon: <GiMoneyStack className="text-2xl mr-2" />,
          path: "/employee/incentives",
        },
        {
          text: (
            <span className="text-[1rem] font-semibold">Reimbursements</span>
          ),
          icon: <GiTakeMyMoney className="text-2axl mr-2" />,
          path: "/employee/reimbursements",
        },
        {
          text: <span className="text-[1rem] font-semibold">Emp Payslip</span>,
          icon: <RiSecurePaymentLine className="text-2xl mr-2" />,
          path: "/generate/employee/payslip",
        },
      ],
    },
  ];

  return (
    <>
      <div className="md:hidden absolute z-50 top-4 left-3 ">
        <button onClick={toggleSidebar}>
          <FaBars className="text-2xl text-black" />
        </button>
      </div>

      <aside
        ref={sidebarRef}
        className={` fixed top-0 left-0 bottom-0  h-fit md:h-auto  w-40 md:w-64 bg-gradient-to-b from-purple-900 to-purple-700 text-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex items-center mb-5 relative -left-2 right-2">
          <img
            src="/d logo.png"
            alt="Deepnap Softech Logo"
            className=" w-20 md:w-24 h-24 object-contain invert brightness-0"
          />
          <h2 className=" text-[15px] md:text-lg font-bold tracking-wide relative right-2">
            Deepnap Softech
          </h2>
        </div>
        <nav className=" relative flex flex-col space-y-3 md:px-4 font-medium text-xl">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={item.onClick || (() => {})}
                className="flex items-center gap-3 px-3 py-2 rounded-xl transition duration-300 hover:bg-gradient-to-r from-purple-600 to-purple-400 cursor-pointer"
              >
                {item.icon}
                {item.text}
              </div>
              {item.subMenu && (
                <div className="ml-6 mt-1 space-y-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center gap-3 px-4 py-2 rounded-sm transition duration-300 hover:bg-purple-700 cursor-pointer"
                    >
                      {subItem.icon}
                      {subItem.text}

                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
         <div className="w-full px-8 py-6">
  <button
    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-tl from-purple-400 to-purple-300  text-white font-semibold rounded-lg transition duration-300"
  >
    
    Logout
  </button>
</div> 
       
      </aside>
    </>
  );
};

export default Sidebar;
