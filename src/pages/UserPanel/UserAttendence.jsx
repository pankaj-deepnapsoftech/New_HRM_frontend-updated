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
    <div className="min-h-screen bg-gray-100 px-6 md:px-12 py-10">
      {/* Title */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-2xl shadow-lg text-gray-600 py-5 px-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Attendance
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="bg-gray-50 py-6 md:py-10 flex flex-wrap justify-center gap-6 rounded-b-2xl shadow-inner">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Total Present Days
          </h2>
          <p className="text-2xl text-blue-600 font-bold mt-2">
            {data.presentDays}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Last Login Date
          </h2>
          <p className="text-2xl text-red-500 font-semibold mt-2">
            {data.lastLoginDate}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Last Login Time
          </h2>
          <p className="text-2xl text-green-500 font-semibold mt-2">
            {data.lastLoginTime}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Total Absent Days
          </h2>
          <p className="text-2xl text-orange-500 font-bold mt-2">
            {data.absentDays}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Name
              </th>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Email
              </th>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Present Days
              </th>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Absent Days
              </th>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Login Date
              </th>
              <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                Login Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <td className="py-4 px-5 flex items-center gap-2 font-medium text-gray-800">
                <FaUser className="text-blue-500" /> {data.name}
              </td>
              <td className="py-4 px-5 text-gray-600">{data.email}</td>
              <td className="py-4 px-5 text-gray-800 font-semibold">
                {data.presentDays}
              </td>
              <td className="py-4 px-5 text-gray-800 font-semibold">
                {data.absentDays}
              </td>
              <td className="py-4 px-5 text-gray-600">{data.lastLoginDate}</td>
              <td className="py-4 px-5 text-gray-800 font-semibold">
                {data.lastLoginTime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendance;
