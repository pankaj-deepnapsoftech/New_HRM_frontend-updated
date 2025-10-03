import React, { useState } from "react";

const EmpMoneyRequest = () => {
  const [criteria, setCriteria] = useState(2);

  const employees = [
    {
      name: "Nitish Prajapati",
      designation: "Developer",
      salary: 5000,
      joiningDate: "26 Feb 2025",
    },
    {
      name: "abhi pjpt",
      designation: "Manager",
      salary: 12000,
      joiningDate: "26 Feb 2025",
    },
    {
      name: "komal singh",
      designation: "manager",
      salary: 10000,
      joiningDate: "01 Mar 2025",
    },
    {
      name: "Deepak Sharma",
      designation: "Boss",
      salary: 10,
      joiningDate: "01 Jan 2020",
    },
  ];

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 px-6 py-4 rounded-lg font-semibold text-lg text-center shadow-md shadow-gray-400 ">
        Employee Advance Money Request
      </div>
      <div className="bg-gray-100 px-6 my-7 py-3 rounded-xl shadow-md ">
        <h2 className=" text-xl font-semibold mb-4 text-gray-700  ">
          Set Eligibility Criteria For Advance Money Request
        </h2>
        <div className="flex  space-x-4 mb-6">
          <input
            type="number"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            className="border border-gray-400 px-2 py-2  w-12 text-center"
          />
          <button className="bg-slate-600 text-white px-4 py-2 rounded-full hover:bg-slate-700">
            Update
          </button>
        </div>
      </div>
      <div className="overflow-x-scroll scrollbar-visible rounded-t-sm md:rounded-t-xl shadow-md">
        <table className=" w-3xl md:w-full table-auto border-b border-gray-200 ">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-4 text-left">Employee Name</th>
              <th className="px-4 py-4 text-left">Designation</th>
              <th className="px-4 py-4 text-left">Basic Salary</th>
              <th className="px-4 py-4 text-left">Joining Date</th>
              <th className="px-4 py-4 text-left">Advance Money Requests</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={index}
                className={`border-t border-gray-300 ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-4">{emp.name}</td>
                <td className="px-4 py-4 text-gray-700">{emp.designation}</td>
                <td className="px-4 py-4">₹ {emp.salary.toLocaleString()}</td>
                <td className="px-4 py-4">{emp.joiningDate}</td>
                <td className="px-4 py-4 text-gray-500">
                  No advance requests.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpMoneyRequest;
