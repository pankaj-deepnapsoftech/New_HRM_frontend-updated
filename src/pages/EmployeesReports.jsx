import React from "react";

const employees_report = [
  {
    name: "Nitish",
    location: "View Location",
    department: "IT",
    designation: "Developer",
    salary: 5000,
    assets: ["Bike", "keyboard"],
    presentDays: 3,
    gatePass: 1,
    status: "active",
  },
  {
    name: "abhi",
    location: "View Location",
    department: "IT",
    designation: "Manager",
    salary: 12000,
    assets: [],
    presentDays: 1,
    gatePass: 0,
    status: "active",
  },
  {
    name: "komal",
    location: "View Location",
    department: "sale",
    designation: "manager",
    salary: 10000,
    assets: ["Laptop"],
    presentDays: 1,
    gatePass: 1,
    status: "terminated",
  },
  {
    name: "Deepak",
    location: "View Location",
    department: "Sales",
    designation: "Boss",
    salary: 10,
    assets: [],
    presentDays: 0,
    gatePass: 0,
    status: "active",
  },
];

const EmployeesReports = () => {
  return (
    <div className="p-2 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center  mx-4 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employees Report</h2>
      </div>

      <div className="overflow-x-scroll scrollbar-visible rounded-t-sm md:rounded-t-xl shadow-md mx-4 md:mx-10 mb-8">
        <table className=" min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className=" font-[600] py-4 px-4 ">Name</th>
              <th className=" font-[600] py-4 px-4">Location</th>
              <th className=" font-[600] py-4 px-4">Department</th>
              <th className=" font-[600] py-4 px-4">Designation</th>
              <th className=" font-[600] py-4 px-4">Salary</th>
              <th className=" font-[600] py-4 px-4">Assets</th>
              <th className=" font-[600] py-4 px-2">Present Days</th>
              <th className=" font-[600] py-4 px-4">Gate Pass</th>
              <th className=" font-[600] py-4 px-4">Status</th>
              <th className="flex justify-end mx-3 mt-5"><button className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200">
          EXPORT
        </button></th>
            </tr>
          </thead>
          <tbody>
            {employees_report.map((emp, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200  ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-3">{emp.name}</td>
                <td className="py-3 px-4 font-[400] text-blue-600 hover:underline cursor-pointer">
                  {emp.location}
                </td>
                <td className="py-3 px-4 capitalize">{emp.department}</td>
                <td className="py-3 px-4 capitalize">{emp.designation}</td>
                <td className="py-3 px-4">${emp.salary.toLocaleString()}</td>
                <td className="py-3 px-4">
                  {emp.assets.length > 0 ? emp.assets.join(", ") : "None"}
                </td>
                <td className="py-3 px-4">{emp.presentDays}</td>
                <td className="py-3 px-4">{emp.gatePass}</td>
                <td
                  className={` my-5 py-4 px-4 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit 
    ${
      emp.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
                >
                  {emp.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesReports;
