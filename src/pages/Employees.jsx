import BackroundVerification from '@/Drawer/EmployeeDetails/BackroundVerification';
import EmployeeForm from '@/Drawer/EmployeeDetails/EmployeeRegistration';
import React, { useState } from 'react';
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

const [showForm, setShowFrom] = useState(false)
const [VerificationForm, setVerificationForm] = useState(false)

  return (
    <div className="p-6 w-full">
      <div className="flex gap-4  mb-6">
        <button onClick={()=> setShowFrom(!showForm)}  className="bg-gray-500 hover:bg-gradient-to-r text-white px-4 py-2 rounded">Register Employee</button>
        <button onClick={() => setVerificationForm(!VerificationForm)} className="bg-gray-500 hover:bg-gradient-to-r text-white px-4 py-2 rounded">Background Verification</button>
        <button className="bg-gray-500 hover:bg-gradient-to-r text-white px-4 py-2 rounded">Bank Account</button>
      </div>

      <div className="bg-gray-500 text-white text-center py-3 rounded-t-md">
        <h2 className="text-xl font-[500]">Employee Details</h2>
      </div>

      <table className="min-w-full shadow-lg border border-gray-200 text-sm">
        <thead className=" text-gray-700 ">
          <tr>
            <th className="p-3 text-left font-[700] ">Full Name</th>
            <th className="p-3 text-left font-[700] ">Email</th>
            <th className="p-3 text-left font-[700] ">Location</th>
            <th className="p-3 text-left font-[700] ">Department</th>
            <th className="p-3 text-left font-[700] ">Designation</th>
            <th className="p-3 text-left font-[700] ">Emp-Code</th>
            <th className="p-3 text-left font-[700] ">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            
            <tr key={idx} className={`  border-t border-gray-200 ${idx%2==0? "bg-white":'bg-gray-100'}`}>
              <td className="p-3 px-6 font-[600]">{emp.name}</td>
              <td className="p-2 font-[600]">{emp.email}</td>
              <td className="p-2 font-[600] text-gray-600 cursor-pointer">View<br />Location</td>
              <td className="p-2 font-[600]">{emp.department}</td>
              <td className="p-2 font-[600]">{emp.designation}</td>
              <td className="p-2 font-[600]">{emp.empCode}</td>
              <td className="p-2 font-[600] flex gap-2">
                <FaEye className="text-gray-500 cursor-pointer" />
                <FaEdit className="text-green-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeForm setShowFrom={setShowFrom} showForm={showForm}/>
      <BackroundVerification VerificationForm={VerificationForm} setVerificationForm={setVerificationForm} />
    </div>
  );
};

export default EmployeeTable;
