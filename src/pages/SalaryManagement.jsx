import React, { useState, useEffect } from "react";
import {
  useGetAllEmpDataQuery,
  useGetMonthlyAttendanceQuery,
} from "@/service/EmpData.services";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import Pagination from "./Pagination/Pagination";

export default function SalaryManagement() {
  const API_BASE =
    import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL; // e.g., http://localhost:8075/api/v1
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const limit = 10;
  const { data, isLoading } = useGetAllEmpDataQuery({ page, limit }); // Fetch all employees by setting a high limit (adjust if needed)

  // Get attendance data for the selected month
  const { data: attendanceData, isLoading: attendanceLoading } =
    useGetMonthlyAttendanceQuery({
      month: selectedMonth.split("-")[1], // Extract month from "2025-01" format
      year: selectedMonth.split("-")[0], // Extract year from "2025-01" format
      department: "all", // Get all departments
    });

  useEffect(() => {
    if (data?.data && attendanceData?.data) {
      // Create a map of attendance data for quick lookup
      const attendanceMap = {};
      attendanceData.data.forEach((att) => {
        attendanceMap[att._id] = {
          presentDays: att.presentDays || 0,
          absentDays: att.absentDays || 0,
        };
      });

      setEmployees(
        data.data.map((emp) => {
          // Get attendance data from the attendance API
          const empAttendance = attendanceMap[emp._id] || {
            presentDays: 0,
            absentDays: 0,
          };

          return {
            id: emp._id,
            name: `${emp.fname || ""} ${emp.lastName || ""}`.trim(),
            code: emp.empCode || "",
            salary: Number(emp.salary) || 0,
            days: empAttendance.presentDays, // Present days from attendance API
            absentDays: empAttendance.absentDays, // Absent days from attendance API
          };
        })
      );
    }
  }, [data, attendanceData]);

  const calculateSalary = (emp) => {
    const daysInMonth = 30; // Assuming 30 days in the month for calculation
    return Math.round((emp.salary / daysInMonth) * emp.days); // Simple pro-rated calculation based on present days
  };

  const downloadReport = () => {
    const reportData = employees.map((emp) => ({
      "Full Name": emp.name,
      "Emp-Code": emp.code,
      "Monthly Salary": emp.salary,
      "Present Days": emp.days,
      "Absent Days": emp.absentDays,
      "Calculated Salary": calculateSalary(emp),
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");
    XLSX.writeFile(wb, "salary_report.xlsx");
  };

  const downloadPayslip = async (empDataId, empCode = "employee", metrics) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const params = new URLSearchParams();
      if (typeof metrics?.presentDays === "number")
        params.set("presentDays", String(metrics.presentDays));
      if (typeof metrics?.absentDays === "number")
        params.set("absentDays", String(metrics.absentDays));
      if (typeof metrics?.calculatedSalary === "number")
        params.set("calculatedSalary", String(metrics.calculatedSalary));
      // Add month for month-specific benefits
      if (selectedMonth) params.set("month", selectedMonth);
      const urlReq =
        `${API_BASE}/payslips/${empDataId}/download` +
        (params.toString() ? `?${params.toString()}` : "");
      const res = await fetch(urlReq, {
        method: "GET",
        headers,
        credentials: "include", // also send httpOnly cookie (ajt) if present
      });
      if (!res.ok) {
        const errText = await res.text();
        try {
          const errJson = JSON.parse(errText);
          throw new Error(errJson.message || `Failed (${res.status})`);
        } catch (_e) {
          throw new Error(errText || `Failed (${res.status})`);
        }
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payslip_${empCode}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.message || "Download failed");
    }
  };

  if (isLoading || attendanceLoading)
    return <div className="text-center py-10">Loading employee data...</div>;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center  py-4 my-6 mx-2 md:mx-10  rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Salary Management</h2>
      </div>

      {/* Month Selector */}
      <div className="mb-6 mx-2 md:mx-10">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Select Month:
          </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-scroll scrollbar-visible  rounded-t-sm md:rounded-t-xl shadow-md mx-1 md:mx-10 m-8">
        <table className="w-5xl md:min-w-full table-auto bg-white ">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm ">
            <tr>
              <th className=" py-4 font-[600] pr-6">Full Name</th>
              <th className=" py-4 font-[600] pr-6">Emp-Code</th>
              <th className=" py-4 font-[600] pr-6">Monthly Salary</th>
              <th className=" py-4 font-[600] pr-6">Present Days</th>
              <th className=" py-4 font-[600] pr-6">Absent Days</th>
              <th className=" py-4 font-[600] pr-6">Calculated Salary</th>
              <th className=" py-4 font-[600] pr-6">Payslip</th>
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
                  <span className="text-gray-800 font-semibold">
                    ₹{emp.salary.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-green-600 font-semibold">
                    {emp.days}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-red-600 font-semibold">
                    {emp.absentDays}
                  </span>
                </td>
                <td className="py-4 px-3">{calculateSalary(emp)}</td>
                <td className="py-4 px-5">
                  <button
                    onClick={() =>
                      downloadPayslip(emp.id, emp.code, {
                        presentDays: emp.days,
                        absentDays: emp.absentDays,
                        calculatedSalary: calculateSalary(emp),
                      })
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Download PDF
                  </button>
                </td>
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
      <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={employees?.length === 10}
      />
    </div>
  );
}
