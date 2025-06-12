import React from "react";

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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title Bar */}
      <div className="bg-gray-400 text-white text-xl font-bold text-center py-3 rounded-xl shadow-md mb-6">
        Payroll Summary
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
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
            <tr className="border-t border-gray-400">
              <td className="px-6 py-3 font-semibold">{data.fullName}</td>
              <td className="px-6 py-3">{data.email}</td>
              <td className="px-6 py-3">{data.department}</td>
              <td className="px-6 py-3">{data.role}</td>
              <td className="px-6 py-3">{data.actualSalary.toFixed(2)}</td>
              <td className="px-6 py-3">{data.workingDays}</td>
              <td className="px-6 py-3">{data.fund.toFixed(2)}</td>
              <td className="px-6 py-3">{data.totalSalary}</td>
              <td className="px-6 py-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow">
                  PAYSLIP
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
