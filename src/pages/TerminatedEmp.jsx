import React from "react";

const employees = [
  {
    fullName: "Nitish Prajapati",
    department: "IT",
    role: "Developer",
    empCode: "NIT51130226",
    salary: 5000,
    assets: ["Bike", "keyboard"],
    status: "Active",
  },
  {
    fullName: "abhi pjpt",
    department: "IT",
    role: "Manager",
    empCode: "ABH74130227",
    salary: 12000,
    assets: [],
    status: "Active",
  },
  {
    fullName: "komal singh",
    department: "sale",
    role: "manager",
    empCode: "KOM98740307",
    salary: 10000,
    assets: ["Laptop"],
    status: "Terminated",
  },
  {
    fullName: "Deepak Sharma",
    department: "Sales",
    role: "Boss",
    empCode: "DEE23890101",
    salary: 10,
    assets: [],
    status: "Active",
  },
];

const TerminatedEmp = () => {
  return (
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-center text-xl font-semibold py-4 rounded-xl shadow-md shadow-gray-400 mb-10 ">
        Terminated Employee
      </div>

      <div className="overflow-x-auto scrollbar-visible shadow-md rounded-sm md:rounded-xl">
        <table className=" w-5xl md:min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Emp-Code</th>
              <th className="py-3 px-4 text-left">Salary</th>
              <th className="py-3 px-4 text-left">Assets</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Terminate</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {employees.map((emp, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-3 px-4">{emp.fullName}</td>
                <td className="py-3 px-4">{emp.department}</td>
                <td className="py-3 px-4">{emp.role}</td>
                <td className="py-3 px-4">{emp.empCode}</td>
                <td className="py-3 px-4">{emp.salary}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    {emp.assets.map((asset, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {emp.status === "Terminated" ? (
                    <span className="text-red-500 bg-red-100 rounded-full  py-1 px-2 font-semibold text-sm">
                      Terminated
                    </span>
                  ) : (
                     <span className="text-green-500 bg-green-100 rounded-full py-1 px-2 font-semibold text-sm">Active</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {emp.status === "Active" ? (
                  <button className="bg-gradient-to-br from-red-400 to-red-700 hover:scale-105 tansition transform  text-white px-2 py-1 rounded-sm shadow-md">
                    Terminate 
                  </button>
                  ):(
                    <span></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TerminatedEmp;
