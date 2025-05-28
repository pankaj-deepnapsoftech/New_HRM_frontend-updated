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
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-4xl mx-auto mt-10">
   <div className="bg-gray-300 text text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Projects</h2>
      </div>

    <div className="overflow-x-auto scrollbar-visible shadow-lg rounded-t-sm md:rounded-t-lg">
   <table className="w-3xl md:min-w-full divide-y divide-gray-200">
         <thead className='bg-gray-200 text-gray-700 text-sm font-[600] uppercase'>
            <tr>
                <th className="px-2 py-3 text-left">Project Name</th>
                <th className="px-2 py-3 text-left">Member</th>
                <th className="px-2 py-3 text-left">Manager</th>
                <th className="px-2 py-3 text-left">Start-Date</th>
                <th className="px-2 py-3 text-left">End-Date</th>
            </tr>
         </thead>
           <tbody>
            {employees.map((emp, idx) => {
                return( <tr
                key={idx}
                 className={`border-b border-gray-200  ${
                  idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 px-2">{emp.projectName}</td>
                <td className="p-3 px-2">{emp.member}</td>
                <td className="p-3 px-2">{emp.manager}</td>
                <td className="p-3 px-2">{emp.startDate}</td>
                <td className="p-3 px-2">{emp.endDate}</td>
              </tr>)
             
            })}
         </tbody>
   </table>
   </div>
    </div>
  )
};

export default Projects