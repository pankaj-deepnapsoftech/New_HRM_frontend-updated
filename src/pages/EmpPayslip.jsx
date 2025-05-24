import React from 'react';

const EmpPayslip = () => {
  const employees = [
    {
      name: 'Nitish Prajapati',
      department: 'IT',
      designation: 'Developer',
      actualSalary: 5000,
      workingDays: 3,
    },
    {
      name: 'Abhi Pjpt',
      department: 'IT',
      designation: 'Manager',
      actualSalary: 12000,
      workingDays: 1,
    },
    {
      name: 'Komal Singh',
      department: 'sale',
      designation: 'manager',
      actualSalary: 10000,
      workingDays: 1,
    },
    {
      name: 'Deepak Sharma',
      department: 'Sales',
      designation: 'Boss',
      actualSalary: 10,
      workingDays: 0,
    },
  ];

  const calculateFund = (salary) => (salary * 0.12).toFixed(2);
  const calculateTotal = (salary, days) =>
    (salary - salary * 0.12) * (days / 3);

  return (
    <div className="p-2 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-400 text-white text-center py-4 rounded-t-2xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold">Generate Employee Payslip</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-b-2xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Actual Salary</th>
              <th className="px-6 py-3 text-left">Working Days</th>
              <th className="px-6 py-3 text-left">Fund (13%)</th>
              <th className="px-6 py-3 text-left">Total Salary</th>
              <th className="px-6 py-3 text-left">Generate Pay Slip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp, index) => {
              const fund = calculateFund(emp.actualSalary);
              const total = calculateTotal(emp.actualSalary, emp.workingDays).toFixed(2);

              return (
                <tr key={index} className={`border-t border-gray-200 ${index %2 == 0? "bg-white":"bg-gray-100"}`} >
                  <td className="px-6 py-3 font-medium text-gray-900">{emp.name}</td>
                  <td className="px-6 py-3 text-gray-600 capitalize">{emp.department}</td>
                  <td className="px-6 py-3 text-gray-700 capitalize">{emp.designation}</td>
                  <td className="px-6 py-3">₹{emp.actualSalary.toFixed(2)}</td>
                  <td className="px-6 py-3">{emp.workingDays}</td>
                  <td className="px-6 py-3">₹{fund}</td>
                  <td className="px-6 py-3">₹{total}</td>
                  <td className="px-6 py-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                      SalarySlip
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpPayslip;
