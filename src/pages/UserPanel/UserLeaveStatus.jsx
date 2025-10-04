import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const UserLeaveStatus = () => {
  const data = [
    {
      name: "Rahul Gupta",
      presentDate: "2025-06-07",
      absentDate: "No",
      halfDay: "N/A",
      fullDay: "N/A",
      reason: "N/A",
      status: "Pending",
    },
    {
      name: "Rahul Gupta",
      presentDate: "2025-06-09",
      absentDate: "No",
      halfDay: "N/A",
      fullDay: "N/A",
      reason: "N/A",
      status: "Pending",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100  px-6 md:px-12 py-10">
      {/* Header */}
      <div className="bg-gray-400 text-white text-center rounded-2xl py-4 px-5 shadow-md mb-10">
        <h1 className="text-2xl md:text-3xl font-bold">Employee Request Leave Status</h1>
      </div>

      {/* Table Card */}
   
       

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left  uppercase text-xs tracking-wider">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Present Dates</th>
              <th className="px-4 py-3">Absent Dates</th>
              <th className="px-4 py-3">Half Day</th>
              <th className="px-4 py-3">Full Day</th>
              <th className="px-4 py-3">Reason for Leave</th>
              <th className="px-4 py-3">Leave Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.presentDate}</td>
                <td className="px-4 py-3">{row.absentDate}</td>
                <td className="px-4 py-3">{row.halfDay}</td>
                <td className="px-4 py-3">{row.fullDay}</td>
                <td className="px-4 py-3">{row.reason}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
 
  );
};

export default UserLeaveStatus;
