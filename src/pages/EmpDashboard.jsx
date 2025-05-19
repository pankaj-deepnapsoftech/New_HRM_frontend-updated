import React from 'react'

const EmpDashboard = () => {
  return (
<>
   {/* <div className="bg-purple-500 text-white text-xl font-semibold px-6 py-4 rounded-t-lg shadow-md text-center">
    Employee Dashboard
  </div>  */}

  <div className="overflow-x-auto shadow-lg rounded-b-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-purple-300 text-gray-700 text-sm font-semibold uppercase">
        <tr>
          <th className="px-6 py-3 text-left">Full Name</th>
          <th className="px-6 py-3 text-left">Department</th>
          <th className="px-6 py-3 text-left">Designation</th>
          <th className="px-6 py-3 text-left">Emp-Code</th>
          <th className="px-6 py-3 text-left">Salary</th>
          <th className="px-6 py-3 text-left">Joining Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-sm">
        <tr className="bg-white">
          <td className="px-6 py-4">Nitish Prajapati</td>
          <td className="px-6 py-4">IT</td>
          <td className="px-6 py-4">Developer</td>
          <td className="px-6 py-4">NIT51130226</td>
          <td className="px-6 py-4">5,000</td>
          <td className="px-6 py-4">2/26/2025</td>
        </tr>
        <tr className="bg-purple-100">
          <td className="px-6 py-4">abhi pjpt</td>
          <td className="px-6 py-4">IT</td>
          <td className="px-6 py-4">Manager</td>
          <td className="px-6 py-4">ABH74130227</td>
          <td className="px-6 py-4">12,000</td>
          <td className="px-6 py-4">2/26/2025</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="px-6 py-4">komal singh</td>
          <td className="px-6 py-4">sale</td>
          <td className="px-6 py-4">manager</td>
          <td className="px-6 py-4">KOM98740307</td>
          <td className="px-6 py-4">10,000</td>
          <td className="px-6 py-4">3/1/2025</td>
        </tr>
        <tr className="bg-purple-100">
          <td className="px-6 py-4">Deepak Sharma</td>
          <td className="px-6 py-4">Sales</td>
          <td className="px-6 py-4">Boss</td>
          <td className="px-6 py-4">DEE23890101</td>
          <td className="px-6 py-4">10</td>
          <td className="px-6 py-4">1/1/2020</td>
        </tr>
      </tbody>
    </table>
  </div> 
  </>
  )
}

export default EmpDashboard