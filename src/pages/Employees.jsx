import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const employees = [
  {
    name: 'Nitish Prajapati',
    email: 'nitishprajapati987@gmail.com',
    location: 'Location',
    department: 'IT',
    designation: 'Developer',
    empCode: 'NIT51130226',
  },
  {
    name: 'abhi pjpt',
    email: 'abhi123@gmail.com',
    location: 'Location',
    department: 'IT',
    designation: 'Manager',
    empCode: 'ABH74130227',
  },
  {
    name: 'komal singh',
    email: 'komal@gmail.com',
    location: 'Location',
    department: 'sale',
    designation: 'manager',
    empCode: 'KOM98740307',
  },
  {
    name: 'Deepak Sharma',
    email: 'dsharma1010@gmail.com',
    location: 'Location',
    department: 'Sales',
    designation: 'Boss',
    empCode: 'DEE23890101',
  },
];

const EmployeeTable = () => {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register Employee</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Background Verification</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Bank Account</button>
      </div>

      <div className="bg-blue-600 text-white text-center py-2 rounded-t">
        <h2 className="text-xl font-bold">Employee Details</h2>
      </div>

      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Designation</th>
            <th className="p-2 text-left">Emp-Code</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={idx} className="border-t border-gray-200">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2 text-blue-600 cursor-pointer">View<br />Location</td>
              <td className="p-2">{emp.department}</td>
              <td className="p-2">{emp.designation}</td>
              <td className="p-2">{emp.empCode}</td>
              <td className="p-2 flex gap-2">
                <FaEye className="text-blue-500 cursor-pointer" />
                <FaEdit className="text-green-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
