import React, { useState } from "react";
import {
  FaCalendarAlt, FaFileAlt, FaRupeeSign, FaDownload, FaHome,
  FaStickyNote,  FaExclamationTriangle, FaDoorOpen
} from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import UserAttendance from "./UserAttendence";
import { useNavigate } from "react-router-dom";

const actions = [
  { label: "Daily Attendence", icon: <FaCalendarAlt />,path:"/user/attendance", element:<UserAttendance/>, color: "bg-blue-100", textColor: "text-blue-500" },
  { label: "Request Leaves", icon: <FcLeave />, path:"/user/request-leave",color: "bg-blue-100", textColor: "text-yellow-500" },
  { label: "Request Leaves Status",path:"/user/leave-status", icon: <FaCalendarAlt />, color: "bg-green-100", textColor: "text-green-500" },
  { label: "Documents", icon: <FaFileAlt />, path:"/user/document", color: "bg-orange-100", textColor: "text-orange-500" },
  { label: "Advance Money Request", path:"/user/advance-money",icon: <FaRupeeSign />, color: "bg-lime-100", textColor: "text-lime-600" },
  { label: "Download Payment Slip", path:"/user/payslip" ,icon: <FaDownload />, color: "bg-yellow-100", textColor: "text-yellow-500" },
  { label: "View Assets", path:"/user/assets",icon: <FaHome />, color: "bg-red-100", textColor: "text-red-500" },
  { label: "Notes", icon: <FaStickyNote />, color: "bg-pink-100", textColor: "text-pink-500" },
  { label: "Request Gate Pass", icon: <FaDoorOpen />, color: "bg-sky-100", textColor: "text-sky-400" },
  { label: "Show Cause Notice", icon: <FaExclamationTriangle />, color: "bg-rose-100", textColor: "text-rose-500" },
];

const UserDashboard = () => {
const navigate = useNavigate();

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="h-full bg-gray-50 p-10 ">
      {/* Header */}
      <div className="md:flex md:justify-between md:items-center text-center mb-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-5 md:mb-0">Employee Dashboard</h1>
        <button
          onClick={() => setShowCalendar(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
        >
          View Attendance Calendar
        </button>
      </div>

      {/* Modal Calendar */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Attendance Calendar</h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        </div>
      )}

      {/* Grid of Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actions.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition"
            onClick={() => item.path && navigate(item.path)}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${item.color}`}>
              <span className={`text-2xl ${item.textColor}`}>{item.icon}</span>
            </div>
            <p className="text-center font-medium text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
