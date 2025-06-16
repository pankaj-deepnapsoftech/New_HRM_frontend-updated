import React from "react";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services";
import * as XLSX from "xlsx";

const EmployeesReports = () => {
  const { data, isLoading } = useGetAllEmpDataQuery();
  const employees = data?.data || [];

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg font-medium">Loading report...</div>
    );
  }

  const handleExport = () => {
    const exportData = employees.map((emp) => ({
      Name: emp.fname || "NA",
      Location: emp.location || "NA",
      Department: emp.department || "NA",
      Designation: emp.designation || "NA",
      Salary: emp.salary ? emp.salary.toLocaleString() : "NA",
      Assets: emp.assets && emp.assets.length > 0 ? emp.assets.join(", ") : "NA",
      PresentDays: emp.attendance ? emp.attendance.length : "NA",
      GatePass: emp.gatePassRequests ? emp.gatePassRequests.length : "NA",
      Status: emp.Empstatus || "NA",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Report");

    XLSX.writeFile(workbook, "Employee_Report.xlsx");
  };

  return (
    <div className="p-2 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center mx-4 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employees Report</h2>
      </div>

      <div className="overflow-x-scroll scrollbar-visible rounded-t-sm md:rounded-t-xl shadow-md mx-4 md:mx-6 mb-8">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="font-[600] py-4 px-4">Name</th>
              <th className="font-[600] py-4 px-4">Location</th>
              <th className="font-[600] py-4 px-4">Department</th>
              <th className="font-[600] py-4 px-4">Designation</th>
              <th className="font-[600] py-4 px-4">Salary</th>
              <th className="font-[600] py-4 px-4">Assets</th>
              <th className="font-[600] py-4 px-2">Present Days</th>
              <th className="font-[600] py-4 px-4">Gate Pass</th>
              <th className="font-[600] py-4 px-4">Status</th>
              <th className="flex justify-end px-2 mt-5">
                <button
                  onClick={handleExport}
                  className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200"
                >
                  EXPORT
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-3">{emp.fname || "NA"}</td>
                  <td className="py-3 px-4 font-[400] text-blue-600 hover:underline cursor-pointer">
                    {emp.location || "NA"}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {emp.department || "NA"}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {emp.designation || "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.salary ? emp.salary : "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.assets && emp.assets.length > 0
                      ? emp.assets.join(", ")
                      : "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.attendance ? emp.attendance.length : "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.gatePassRequests ? emp.gatePassRequests.length : "NA"}
                  </td>
                  <td
                    className={`my-5 py-4 px-4 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit ${
                      emp.Empstatus === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.Empstatus || "NA"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesReports;
