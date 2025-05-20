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
    <div className="p-6 w-full">
      <div className="flex gap-4  mb-6">
        <button className="bg-gradient-to-l from-[#764ba2] to-[#667eea] hover:bg-gradient-to-r text-white px-4 py-2 rounded">Register Employee</button>
        <button className="bg-gradient-to-l from-[#764ba2] to-[#667eea] hover:bg-gradient-to-r text-white px-4 py-2 rounded">Background Verification</button>
        <button className="bg-gradient-to-l from-[#764ba2] to-[#667eea] hover:bg-gradient-to-r text-white px-4 py-2 rounded">Bank Account</button>
      </div>

      <div className="bg-purple-500 text-white text-center py-3 rounded-t">
        <h2 className="text-xl font-bold">Employee Details</h2>
      </div>

      <table className="min-w-full shadow-lg border border-gray-200 text-sm">
        <thead className="bg-purple-300 text-gray-700">
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
            
            <tr key={idx} className={`border-t border-gray-200 ${idx%2==0? "bg-white":'bg-purple-100'}`}>
              <td className="p-3 px-6">{emp.name}</td>
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
