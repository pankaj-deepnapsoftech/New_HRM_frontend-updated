import React from "react";
import { FaUser } from "react-icons/fa";

const UserAttendance = () => {
  const data = {
    name: "Rahul",
    email: "Rahul@gmail.com",
    presentDays: 30,
    absentDays: 0,
    lastLoginDate: "2025-06-28",
    lastLoginTime: "11:30",
  };

  return (
    <div className="min-h-screen bg-gray-100  px-6 md:px-12 py-10">
      {/* Title */}
      <div className="bg-gray-400 rounded-t-2xl shadow-md text-white py-4 px-6 text-center ">
        <h1 className="text-3xl font-bold tracking-wide">Employee Attendance</h1>
      </div>

      {/* Stat Cards */}
      <div className="bg-gray-50 py-4 md:py-10 md:flex justify-center mb-10 gap-8  rounded-b-xl">
        <div className="bg-white rounded-xl p-6 m-6 md:m-0 shadow-md hover:shadow-xl text-center">
          <h2 className="text-lg font-medium text-gray-700">Total Present Days</h2>
          <p className="text-xl text-blue-600 font-bold mt-2">{data.presentDays}</p>
        </div>
        <div className="bg-white rounded-xl p-6 m-6 md:m-0 shadow-md hover:shadow-xl text-center">
          <h2 className="text-lg font-medium text-gray-700">Last Login Date</h2>
          <p className="text-xl text-red-600 font-semibold mt-2">{data.lastLoginDate}</p>
        </div>
        <div className="bg-white rounded-xl p-6 m-6 md:m-0 shadow-md hover:shadow-xl text-center">
          <h2 className="text-lg font-medium text-gray-700">Last Login Time</h2>
          <p className="text-xl text-green-500 font-semibold mt-2">{data.lastLoginTime}</p>
        </div>
        <div className="bg-white rounded-xl p-6 m-6 md:m-0 shadow-md hover:shadow-xl  text-center">
          <h2 className="text-lg font-medium text-gray-700">Total Absent Days</h2>
          <p className="text-xl text-orange-500 font-bold mt-2">{data.absentDays}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-700 text-left">
            <tr>
              <th className="py-3 px-5 font-semibold">Name</th>
              <th className="py-3 px-5 font-semibold">Email</th>
              <th className="py-3 px-5 font-semibold">Present Days</th>
              <th className="py-3 px-5 font-semibold">Absent Days</th>
              <th className="py-3 px-5 font-semibold">Login Date</th>
              <th className="py-3 px-5 font-semibold">Login Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-400 hover:bg-gray-50">
              <td className="py-4 px-5 flex items-center gap-2 font-medium text-gray-800">
            
                {data.name}
              </td>
              <td className="py-4 px-5 text-gray-700">{data.email}</td>
              <td className="py-4 px-5 text-gray-700 font-semibold">{data.presentDays}</td>
              <td className="py-4 px-5 text-gray-700 font-semibold">{data.absentDays}</td>
              <td className="py-4 px-5 ">{data.lastLoginDate}</td>
              <td className="py-4 px-5 text-gray-700 font-semibold">{data.lastLoginTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendance;
