import ViewIncentive from "@/Drawer/Incentives/ViewIncentive";
import React, { useState } from "react";

import { MdRemoveRedEye } from "react-icons/md";

const Incentives = () => {
  const employees = [
    {
      name: "Nitish",
      department: "IT",
      designation: "Developer",
      hasIncentive: false,
    },
    {
      name: "abhi",
      department: "IT",
      designation: "Manager",
      hasIncentive: true,
    },
    {
      name: "komal",
      department: "sale",
      designation: "manager",
      hasIncentive: false,
    },
    {
      name: "Deepak",
      department: "Sales",
      designation: "Boss",
      hasIncentive: true,
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);

  const sampleIncentive = {
    amount: 500,
    date: "2/26/2025",
    notes: "for better performance",
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-gray-600 text-center py-4 rounded-xl shadow-md shadow-gray-400  mx-2 md:mx-10">
        <h2 className="text-xl font-bold">Incentives</h2>
      </div>

      <div className="overflow-x-auto  shadow-lg rounded-t-sm md:rounded-2xl mt-10 mx-2 md:mx-10">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 text-gray-700  uppercase text-xs ">
            <tr>
              <th className="px-6 py-5 text-left">Name</th>
              <th className="px-6 py-5 text-left">Department</th>
              <th className="px-6 py-5 text-left">Designation</th>
              <th className="px-6 py-5 text-left">Incentives</th>
              <th className="px-6 py-5 text-left">Add Incentives</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp, index) => (
              <tr
                key={index}
                className={`border-b border-gray-300 ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-6 py-5 font-medium text-gray-900">
                  {emp.name}
                </td>
                <td className="px-6 py-5 text-gray-500 capitalize">
                  {emp.department}
                </td>
                <td className="px-6 py-5 text-gray-700 capitalize">
                  {emp.designation}
                </td>
                <td className="px-6 py-5">
                  {emp.hasIncentive ? (
                    <button
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                      onClick={() => setModalOpen(true)}
                    >
                      <MdRemoveRedEye className="w-4 h-4" />
                      View
                    </button>
                  ) : (
                    <span></span>
                  )}
                </td>

                <ViewIncentive
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  employeeName={emp.name}
                  incentives={sampleIncentive}
                />
                <td className="px-6 py-3">
                  {emp.hasIncentive ? (
                    <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                      ADD
                    </button>
                  ) : (
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

export default Incentives;
