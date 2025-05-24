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
    <div className="p-1 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gradient-to-b from-gray-300 to bg-gray-300 text text-center mx-10 py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employee Details</h2>
      </div>
      <div className="flex gap-4  mb-10 mx-10">
        <button onClick={()=> setShowFrom(!showForm)}  className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gradient-to-r text-white px-4 py-2 rounded shadow-md">Register Employee</button>
        <button onClick={() => setVerificationForm(!VerificationForm)} className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gradient-to-r text-white px-4 py-2 rounded shadow-md">Background Verification</button>
        <button className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gradient-to- text-white px-4 py-2 rounded shadow-md">Bank Account</button>
      </div>

      
       <div className="overflow-hidden rounded-t-xl shadow-md mx-8 mb-8">
      <table className="min-w-full shadow-lg border border-gray-200 ">
        <thead className=" text-gray-700 bg-gray-200  ">
          <tr>
            <th className="p-4 text-left font-[700] ">Full Name</th>
            <th className="p-4 text-left font-[700] ">Email</th>
            <th className="p-4 text-left font-[700] ">Location</th>
            <th className="p-4 text-left font-[700] ">Department</th>
            <th className="p-4 text-left font-[700] ">Designation</th>
            <th className="p-4 text-left font-[700] ">Emp-Code</th>
            <th className="p-4 text-left font-[700] ">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            
            <tr key={idx} className={`  border-t border-gray-200 ${idx%2==0? "bg-white":'bg-gray-100'}`}>
              <td className="p-3 text-left font-[400]">{emp.name}</td>
              <td className="p-3 text-left font-[400]">{emp.email}</td>
              <td className="p-3 font-[400] text-blue-600 cursor-pointer">View<br />Location</td>
              <td className="p-3 text-left font-[400]">{emp.department}</td>
              <td className="p-3 text-left font-[400]">{emp.designation}</td>
              <td className="p-3 text-left font-[400]">{emp.empCode}</td>
              <td className="p-3 text-left my-4 flex gap-5">
                <FaEye className="text-blue-500 cursor-pointer" />
                <FaEdit className="text-green-400 cursor-pointer" />
                <FaTrash className="text-red-400 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <EmployeeForm setShowFrom={setShowFrom} showForm={showForm}/>
      <BackroundVerification VerificationForm={VerificationForm} setVerificationForm={setVerificationForm} />
    </div>
  );
};

export default EmployeeTable;
