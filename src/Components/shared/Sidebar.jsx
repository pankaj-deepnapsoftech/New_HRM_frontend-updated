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
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/service/Auth.services";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeData } from "@/store/slice/AuthSlice";

// Pages
import EmployeeTable from "@/pages/Employees";
import EmployeesReports from "@/pages/EmployeesReports";
import DailyAttendance from "@/pages/DailyAttendance";
import AllAttendence from "@/pages/AllAttendence";
import Projects from "@/pages/Projects";
import EmpLeaveBalance from "@/pages/EmpLeaveBalance";
import SalaryManagement from "@/pages/SalaryManagement";
import EmpLocation from "@/pages/EmpLocation";
import AssignAssets from "@/pages/Assets";
import TerminatedEmp from "@/pages/TerminatedEmp";
import GatepassApprovals from "@/pages/GatepassAproval";
import ShowCauseNotices from "@/pages/ShowCauseNotices";
import { FaChalkboardUser, FaUsersRectangle } from "react-icons/fa6";

const Sidebar = () => {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const navigator = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [LogoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const currPath = location.pathname;

  const handleLogout = async () => {
    try {
      const res = await LogoutUser().unwrap();
      dispatch(removeData());
      window.location.href = "/";
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
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
      text: <span className="text-[1rem] font-semibold">Dashboard</span>,
      icon: <FaHome className="text-2xl" />,
      path: "/",
    },
    {
      text: <span className="text-[1rem] font-semibold">Emp Dashboard</span>,
      icon: <FaChalkboardUser className="text-2xl" />,
      path: "/empdashboard",
    },
    {
      text: <span className="text-[1rem] font-semibold">Employees</span>,
      icon: <BsPersonCircle className="text-2xl" />,
      path: "/employees",
      element: <EmployeeTable />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Projects</span>,
      icon: <HiOutlineDocumentReport className="text-xl" />,
      path: "/projects",
      element: <Projects />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Reports</span>,
      icon: <RiListSettingsLine className="text-2xl" />,
      path: "/employees-reports",
      element: <EmployeesReports />,
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Update Leave Balance</span>
      ),
      icon: <MdPerson className="text-2xl" />,
      path: "/empleaves",
      element: <EmpLeaveBalance />,
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Salary Management</span>
      ),
      icon: <RiMoneyRupeeCircleFill className="text-2xl" />,
      path: "/salarymanagement",
      element: <SalaryManagement />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Attendance</span>,
      icon: <MdCoPresent className="text-2xl" />,
      onClick: () => setAttendanceOpen(!attendanceOpen),
      subMenu: attendanceOpen && [
        {
          text: (
            <span className="text-[1rem] font-semibold">Daily Attendance</span>
          ),
          icon: <MdCoPresent className="text-xl mr-2" />,
          path: "/empyloyees-attendence",
          element: <DailyAttendance />,
        },
        {
          text: <span className="text-[1rem] font-semibold">All Attendance</span>,
          icon: <FaFingerprint className="text-2xl mr-2" />,
          path: "/all-attendence",
          element: <AllAttendence />,
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
      icon: <IoLocationOutline className="text-2xl" />,
      path: "/employee/location",
      element: <EmpLocation />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Assets</span>,
      icon: <GiLaptop className="text-2xl" />,
      path: "/company/assets",
      element: <AssignAssets />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Terminated Emp</span>,
      icon: <MdOutlineBlock className="text-2xl" />,
      path: "/employee/terminated",
      element: <TerminatedEmp />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Gatepass Approval</span>,
      icon: <GiSecurityGate className="text-2xl" />,
      path: "/gatepass/approval",
      element: <GatepassApprovals />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Show Cause Notice</span>,
      icon: <FiAlertTriangle className="text-2xl" />,
      path: "/view/employee/show-cause/notice",
      element: <ShowCauseNotices />,
    },
    {
      text: <span className="text-[1rem] font-semibold">Payroll</span>,
      icon: <RiMoneyRupeeCircleLine className="text-2xl" />,
      onClick: () => setPayrollOpen(!payrollOpen),
      subMenu: payrollOpen && [
        {
          text: <span className="text-[1rem] font-semibold">Payroll Summary</span>,
          icon: <MdOutlineStickyNote2 className="text-2xl mr-2" />,
          path: "/employee/payrollSummary",
        },
        {
          text: <span className="text-[1rem] font-semibold">Advanced Money</span>,
          icon: <TbReportMoney className="text-2xl mr-2" />,
          path: "/employee/advance/money/request",
        },
        {
          text: <span className="text-[1rem] font-semibold">Incentives</span>,
          icon: <GiMoneyStack className="text-2xl mr-2" />,
          path: "/employee/incentives",
        },
        {
          text: <span className="text-[1rem] font-semibold">Reimbursements</span>,
          icon: <GiTakeMyMoney className="text-2xl mr-2" />,
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
      <div className="md:hidden absolute z-50 top-4 left-3">
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <FaBars className="text-2xl text-black" />
        </button>
      </div>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 bottom-0 h-full w-40 md:w-64 bg-gradient-to-r from-[#5072A7] to-[#5072A7]  text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
    ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:block`}
      >

        <div className="flex items-center py-2 w-full border-b border-white/20 px-4">
          <img
            src="/d logo.png"
            alt="Deepnap Softech Logo"
            className="brightness-0 invert h-[100px]"
          />
          <h2 className="text-lg md:text-xl font-bold tracking-wide">
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
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition duration-300 
              ${isActive
                    ? "bg-[#92929285] font-bold shadow-md"
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
                          onClick={() => navigator(subItem.path)}
                          className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition duration-300 
                      ${isSubActive
                            ? "bg-[#92929285]/30 font-semibold"
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
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/30 text-white font-semibold rounded-lg transition duration-300 hover:brightness-110"
          >
            Logout
          </button>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
