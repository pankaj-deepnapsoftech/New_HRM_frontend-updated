import React from 'react'

const employees=[
    {
    projectName:"CRM",
    member:"Ashish",
    manager:"Abhi",
    startDate:"20-12-2024",
    endDate:"15-03-2025"
    },
    {
    projectName:"HRM",
    member:"Aman",
    manager:"Deepak",
    startDate:"10-1-2024",
    endDate:"9-03-2025"
    }
]
const Projects = () => {
  return (
    <div className="p-5">
    <div className="bg-gray-500 text-white text-xl font-[600] px-6 py-3 rounded-t-lg shadow-md text-center ">Projects</div>

    <div className="overflow-x-auto shadow-lg rounded-b-lg">
   <table className="min-w-full divide-y divide-gray-200">
         <thead className='bg-gray-300 text-gray-700 text-sm font-[600] uppercase'>
            <tr>
                <th className="px-6 py-3 text-left">Project Name</th>
                <th className="px-6 py-3 text-left">Member</th>
                <th className="px-6 py-3 text-left">Manager</th>
                <th className="px-6 py-3 text-left">Start-Date</th>
                <th className="px-6 py-3 text-left">End-Date</th>
            </tr>
         </thead>
           <tbody>
            {employees.map((emp, idx) => {
                return( <tr
                key={idx}
                className={`border-t border-gray-200 ${
                  idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 px-6">{emp.projectName}</td>
                <td className="p-3 px-6">{emp.member}</td>
                <td className="p-3 px-6">{emp.manager}</td>
                <td className="p-3 px-6">{emp.startDate}</td>
                <td className="p-3 px-6">{emp.endDate}</td>
              </tr>)
             
            })}
         </tbody>
   </table>
   </div>
    </div>
  )
};

export default Projects