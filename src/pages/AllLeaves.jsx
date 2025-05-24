import React from "react";

const employees = [
  {
    fullName: "Nitish Prajapati",
    email: "nitishprajapati987@gmail.com",
    department: "IT",
    role: "Developer",
    empCode: "NIT51130226",
    halfLeaves: 0,
    fullLeaves: 1,
    presentLeave: "N/A",
  },
  {
    fullName: "abhi pjpt",
    email: "abhi123@gmail.com",
    department: "IT",
    role: "Manager",
    empCode: "ABH74130227",
    halfLeaves: 0,
    fullLeaves: 0,
    presentLeave: "N/A",
  },
  {
    fullName: "komal singh",
    email: "komal@gmail.com",
    department: "sale",
    role: "manager",
    empCode: "KOM98740307",
    halfLeaves: 1,
    fullLeaves: 0,
    presentLeave: "N/A",
  },
  {
    fullName: "Deepak Sharma",
    email: "dsharma1010@gmail.com",
    department: "Sales",
    role: "Boss",
    empCode: "DEE23890101",
    halfLeaves: 0,
    fullLeaves: 0,
    presentLeave: "N/A",
  },
];

const AllLeaves = () => {
  return (
    <div className="p-2 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10 ">
      <div className="bg-gray-300 text-gray-600 font-semibold text-xl py-4 px-6 mx-6 text-center  rounded-lg shadow-md shadow-gray-400">
        Employee All Leave
      </div>
      
      <div className="overflow-hidden rounded-t-xl shadow-md mx-6 mb-8 mt-8">

        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-3 py-3 text-left">Name</th>
              <th className="px-3 py-3 text-left">Email</th>
              <th className="px-3 py-3 text-left">Department</th>
              <th className="px-3 py-3 text-left">Role</th>
              <th className="px-3 py-3 text-left">Emp-Code</th>
              <th className="px-3 py-3 text-left">No. of Half Leaves</th>
              <th className="px-3 py-3 text-left">No. of Full Leaves</th>
              <th className="px-3 py-3 text-left">Present Leave</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {employees.map((emp, index) => (
              <tr
                 key={index}
                className={`border-b border-gray-200  ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-3 py-4">{emp.fullName}</td>
                <td className="px-3 py-4">{emp.email}</td>
                <td className="px-3 py-4">{emp.department}</td>
                <td className="px-3 py-4">{emp.role}</td>
                <td className="px-3 py-4">{emp.empCode}</td>
                <td className="px-3 py-4">{emp.halfLeaves}</td>
                <td className="px-3 py-4">{emp.fullLeaves}</td>
                <td className="px-3 py-4">{emp.presentLeave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLeaves;
