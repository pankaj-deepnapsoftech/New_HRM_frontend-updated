import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";

const data = {
  fullName: "Dinki",
  email: "dinki@gmail.com",
  department: "IT",
  role: "frontend",
  actualSalary: 20000.0,
  workingDays: 3,
  fund: 2400.0,
  totalSalary: 17600,
};

const UserPaySlip = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 text-2xl md:text-3xl font-bold text-center py-4 rounded-xl shadow-lg mb-8">
        Payroll Summary
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm md:text-base text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actual Salary</th>
              <th className="px-6 py-3 text-left">Working Days</th>
              <th className="px-6 py-3 text-left">Fund (12%)</th>
              <th className="px-6 py-3 text-left">Total Salary</th>
              <th className="px-6 py-3 text-left">Generate Payslip</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 font-medium text-gray-800">
                {data.fullName}
              </td>
              <td className="px-6 py-4 text-gray-600">{data.email}</td>
              <td className="px-6 py-4">{data.department}</td>
              <td className="px-6 py-4">{data.role}</td>
              <td className="px-6 py-4">{data.actualSalary.toFixed(2)}</td>
              <td className="px-6 py-4">{data.workingDays}</td>
              <td className="px-6 py-4">{data.fund.toFixed(2)}</td>
              <td className="px-6 py-4 font-semibold text-green-600">
                {data.totalSalary}
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105">
                  <FaFileInvoiceDollar /> PAYSLIP
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaySlip;
