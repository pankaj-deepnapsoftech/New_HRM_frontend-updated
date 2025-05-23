import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';

const Incentives = () => {
  const employees = [
    { name: 'Nitish', department: 'IT', designation: 'Developer', hasIncentive: false },
    { name: 'abhi', department: 'IT', designation: 'Manager', hasIncentive: true },
    { name: 'komal', department: 'sale', designation: 'manager', hasIncentive: false },
    { name: 'Deepak', department: 'Sales', designation: 'Boss', hasIncentive: true },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <div className="bg-purple-400 text-white text-center py-4 rounded-t-2xl shadow-md">
        <h2 className="text-xl font-bold">Incentives</h2>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-b-2xl">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 text-gray-700  uppercase text-xs">
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
              <tr key={index}  className={`border-t border-gray-200 ${index %2 == 0? "bg-white":"bg-gray-100"}`}>
                <td className="px-6 py-3 font-medium text-gray-900">{emp.name}</td>
                <td className="px-6 py-3 text-gray-500 capitalize">{emp.department}</td>
                <td className="px-6 py-3 text-gray-700 capitalize">{emp.designation}</td>
                <td className="px-6 py-3">
                  {emp.hasIncentive ? (
                    <button className="flex items-center gap-1 text-blue-600 hover:underline">
                      <MdRemoveRedEye className="w-4 h-4" />
                      View
                    </button>
                  ) : (
                    <span></span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                    ADD
                  </button>
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
