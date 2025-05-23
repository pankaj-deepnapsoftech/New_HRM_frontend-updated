import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import EarningDetails from "@/Drawer/EarningDetails"; 

const employees = [
  {
    fname: "Nitish",
    department: "IT",
    design: "Developer",
  },
  {
    fname: "komal",
    department: "Sales",
    design: "Manager",
  },
  {
    fname: "Dinki",
    department: "IT",
    design: "Developer",
  },
  {
    fname: "Nitin",
    department: "IT",
    design: "Boss",
  },
];

const earningDetails = {
  basic: 12000,
  fund: 1440,
  incentives: 500,
  reimbursement: 0,
  advance: 0,
  total: 11060,
};

const PayrollSummary = () => {
    
     const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleViewClick = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
    };

  return (
    <div className="p-5">
      <div className="bg-gray-500 text-white text-xl font-semibold px-6 py-3 rounded-t-lg shadow-md text-center">
        Payroll Summary
      </div>

      <div className="shadow-lg rounded-b-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Summary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-300 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 px-6">{emp.fname}</td>
                <td className="p-3 px-6">{emp.department}</td>
                <td className="p-3 px-6">{emp.design}</td>
                <td className="p-3 px-6">
                  <button
                    className="text-blue-600 hover:underline flex items-center gap-1"
                    onClick={() => handleViewClick(emp)}
                  >
                    <MdRemoveRedEye />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && selectedEmployee (
          <EarningDetails
            onClose={() => setShowModal(false)}
            earningDetails={earningDetails}
          />
        )}
      </div>
    </div>
  );
};

export default PayrollSummary;
