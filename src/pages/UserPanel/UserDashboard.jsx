import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaRupeeSign,
  FaDownload,
  FaHome,
  // FaStickyNote,
  // FaExclamationTriangle,
  FaDoorOpen,
  FaClock,
} from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  { label: "Attendance Check", icon: <FaCalendarAlt />, path: "/user/attendance-check", color: "bg-blue-100 text-blue-600" },
  { label: "Daily Attendance", icon: <FaCalendarAlt />, path: "/user/attendance", color: "bg-blue-100 text-blue-600" },
  { label: "Attendance Regularization", icon: <FaClock />, path: "/user/attendance-regularization", color: "bg-purple-100 text-purple-600" },
  { label: "Request Leaves", icon: <FcLeave />, path: "/user/request-leave", color: "bg-green-100 text-green-600" },
  { label: "Leave Status", icon: <FaCalendarAlt />, path: "/user/request-leave", color: "bg-yellow-100 text-yellow-600" },
  { label: "Documents", icon: <FaFileAlt />, path: "/user/document", color: "bg-orange-100 text-orange-600" },
  { label: "Advance Money Request", icon: <FaRupeeSign />, path: "/user/advance-money", color: "bg-lime-100 text-lime-600" },
  // { label: "Download Payslip", icon: <FaDownload />, path: "/user/payslip", color: "bg-indigo-100 text-indigo-600" },
  { label: "View Assets", icon: <FaHome />, path: "/user/assets", color: "bg-red-100 text-red-600" },
  // { label: "Notes", icon: <FaStickyNote />, path: "/user/notes", color: "bg-pink-100 text-pink-600" },
  { label: "Request Gate Pass", icon: <FaDoorOpen />, path: "/user/gate-pass", color: "bg-sky-100 text-sky-600" },
  // { label: "Show Cause Notice", icon: <FaExclamationTriangle />, path: "/user/show-cause", color: "bg-rose-100 text-rose-600" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => setSelectedDate(date);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="md:flex md:justify-between md:items-center text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-0">
          Employee Dashboard
        </h1>
        <button
          onClick={() => setShowCalendar(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View Attendance Calendar
        </button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[90%] max-w-lg">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Attendance Calendar
            </h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        </div>
      )}

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {actions.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className="cursor-pointer bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-lg mb-4 text-2xl ${item.color}`}
            >
              {item.icon}
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">
              {item.label}
            </h3>
            <p className="text-gray-500 text-sm mt-1">Click to view details</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
