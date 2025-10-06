import { useLogedInuserQuery } from "@/service/Auth.services";
import { useGetEmpAttendenceByIdQuery } from "@/service/EmpData.services";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";


const UserAttendance = () => {
  // 🔹 Default month/year (current)
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const {data:UserData } = useLogedInuserQuery()
  const employeeId = UserData?.data?._id ;
  const { data, isLoading, error } = useGetEmpAttendenceByIdQuery({
    employeeId,
    month,
    year,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-xl">
        Loading attendance...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        Error: {error?.data?.message || "Something went wrong"}
      </div>
    );

  const employee = data?.employee || {};
  const report = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-12 py-10">
      
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-2xl shadow-lg text-gray-700 py-5 px-6 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Attendance
        </h1>
      </div>

      
      <div className="bg-white p-5 flex flex-wrap justify-center gap-5 shadow-md rounded-b-2xl">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Select Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[
              "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
            ].map((m, i) => (
              <option key={m} value={m}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Select Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Stat Cards */}
      <div className="bg-gray-50 py-6 md:py-10 flex flex-wrap justify-center gap-6 rounded-b-2xl shadow-inner">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Total Present Days
          </h2>
          <p className="text-2xl text-blue-600 font-bold mt-2">
            {data?.presentDays || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Total Absent Days
          </h2>
          <p className="text-2xl text-orange-500 font-bold mt-2">
            {data?.absentDays || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center w-52">
          <h2 className="text-md font-medium text-gray-500 uppercase">
            Attendance %
          </h2>
          <p className="text-2xl text-green-600 font-bold mt-2">
            {Math.round(
              (data?.presentDays / data?.totalDays) * 100 || 0
            )}
            %
          </p>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
      
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                  Date
                </th>
                <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                  Status
                </th>
                <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                  Login Time
                </th>
                <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                  Logout Time
                </th>
                <th className="py-3 px-5 text-left text-sm font-semibold uppercase">
                  Working Hours
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {report?.length > 0 ? (
                report.map((day, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="py-4 px-5 text-gray-800 font-medium flex items-center gap-2">
                      <FaUser className="text-blue-500" /> {employee.name || "—"}
                    </td>
                    <td
                      className={`py-4 px-5 font-semibold ${day.status === "Present"
                          ? "text-green-600"
                          : "text-red-500"
                        }`}
                    >
                      {day.status}
                    </td>
                    <td className="py-4 px-5 text-gray-700">
                      {day.loginTime || "-"}
                    </td>
                    <td className="py-4 px-5 text-gray-700">
                      {day.logoutTime || "-"}
                    </td>
                    <td className="py-4 px-5 text-gray-700">
                      {day.totalWorkingHours || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 text-lg"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserAttendance;
