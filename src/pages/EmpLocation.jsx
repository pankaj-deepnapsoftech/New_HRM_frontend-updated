import React from 'react'
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
const EmpLocation = () => {
  return (
    <div className="p-6 w-full">
        
   
         <div className="bg-gray-500 text-white text-center py-3 rounded-t-xl">
           <h2 className="text-xl font-bold">Employee Location</h2>
         </div>
   
         <table className="min-w-full shadow-lg border border-gray-200 text-sm">
           <thead className="bg-gray-300 text-gray-700">
             <tr>
               <th className="p-4  text-left">Full Name</th>
               <th className="p-2 text-left">Email</th>
               <th className="p-2 text-left">Location</th>
               <th className="p-2 text-left">Department</th>
               <th className="p-2 text-left">Designation</th>
               <th className="p-2 text-left">Emp-Code</th>
             </tr>
           </thead>
           <tbody>
             {employees.map((emp, idx) => (
               
               <tr key={idx} className={`border-t border-gray-200 ${idx%2==0? "bg-white":'bg-gray-100'}`}>
                 <td className="p-2 px-6">{emp.name}</td>
                 <td className="p-2">{emp.email}</td>
                 <td className="p-2 text-blue-700 cursor-pointer">View<br />Location</td>
                 <td className="p-2">{emp.department}</td>
                 <td className="p-2">{emp.designation}</td>
                 <td className="p-2">{emp.empCode}</td>
                 
               </tr>
             ))}
           </tbody>
         </table>
       </div>
  )
}
export default EmpLocation