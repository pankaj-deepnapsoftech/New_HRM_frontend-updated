import React, { useState, useEffect } from "react";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function SalaryManagement() {
  const [employees, setEmployees] = useState([]);
  const { data, isLoading } = useGetAllEmpDataQuery({ page: 1, limit: 1000 }); // Fetch all employees by setting a high limit (adjust if needed)

  useEffect(() => {
    if (data?.data) {
      setEmployees(
        data.data.map((emp) => {
          // Calculate default present days from attendance for current month (September 2025)
          const currentMonth = "2025-09"; // Based on the provided current date
          const presentDays = emp.attendance.filter(
            (a) => a.date.startsWith(currentMonth) && a.status.toLowerCase() === "present"
          ).length;

          // Calculate default leaves (full days + half days equivalent)
          const leaves = emp.fullDayLeavesThisMonth + emp.halfDayLeavesThisMonth * 0.5;

          return {
            id: emp._id,
            name: `${emp.fname} ${emp.lastName || ""}`.trim(),
            code: emp.empCode,
            salary: emp.salary,
            days: presentDays, // Default to calculated present days
            leaves: leaves, // Default to calculated leaves
          };
        })
      );
    }
  }, [data]);

  const handleInputChange = (index, field, value) => {
    const newEmps = [...employees];
    newEmps[index][field] = parseFloat(value) || 0;
    setEmployees(newEmps);
  };

  const calculateSalary = (emp) => {
    const daysInMonth = 30; // Assuming 30 days in the month for calculation
    return Math.round((emp.salary / daysInMonth) * emp.days); // Simple pro-rated calculation based on present days
  };

  const downloadReport = () => {
    const reportData = employees.map((emp) => ({
      "Full Name": emp.name,
      "Emp-Code": emp.code,
      "New Monthly Salary": emp.salary,
      "Present Days": emp.days,
      "Leaves": emp.leaves,
      "Calculated Salary": calculateSalary(emp),
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");
    XLSX.writeFile(wb, "salary_report.xlsx");
  };

  if (isLoading) return <div className="text-center py-10">Loading employee data...</div>;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center  py-4 my-6 mx-2 md:mx-10  rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Salary Management</h2>
      </div>
      <div className="overflow-x-scroll scrollbar-visible  rounded-t-sm md:rounded-t-xl shadow-md mx-1 md:mx-10 m-8">
        <table className="w-5xl md:min-w-full table-auto bg-white ">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm ">
            <tr>
              <th className=" py-4 font-[600] pr-6">Full Name</th>
              <th className=" py-4 font-[600] pr-6">Emp-Code</th>
              <th className=" py-4 font-[600] pr-6">New Monthly Salary</th>
              <th className=" py-4 font-[600] pr-6">Present Days</th>
              <th className=" py-4 font-[600] pr-6">Leaves</th>
              <th className=" py-4 font-[600] pr-6">Calculated Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr
                key={i}
                className={`border-b border-gray-200  ${
                  i % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="py-4 px-5">{emp.name}</td>
                <td className="py-4 px-5">{emp.code}</td>
                <td className="py-4 px-5">
                  <input
                    type="number"
                    value={emp.salary}
                    onChange={(e) => handleInputChange(i, "salary", e.target.value)}
                    className="w-40 px-5 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="py-4 px-5 ">
                  <input
                    type="number"
                    value={emp.days}
                    onChange={(e) => handleInputChange(i, "days", e.target.value)}
                    className="w-30 px-3 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="py-4 px-3">
                  <input
                    type="number"
                    value={emp.leaves}
                    onChange={(e) => handleInputChange(i, "leaves", e.target.value)}
                    className="w-30 px-3 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="py-4 px-3">{calculateSalary(emp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-4 px-3 bg-gray-50 text-center">
        <button
          onClick={downloadReport}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 mx-auto"
        >
          <FaDownload />
          Download Salary Report
        </button>
      </div>
    </div>
  );
}