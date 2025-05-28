import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import EarningDetails from "@/Drawer/PayrollSummary/EarningDetails";

const employees = [
  {
    fname: "Nitish",
    department: "IT",
    design: "Developer",
  },
  {
    fname: "Komal",
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
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-gray-700 text-xl font-semibold px-6 py-3 rounded-lg shadow-md shadow-gray-400 text-center mx-2 md:mx-10">
        Payroll Summary
      </div>

      <div className="shadow-lg rounded-b-lg overflow-x-scroll scrollbar-visible m-2 mt-8 md:m-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className="px-7 py-3 text-left">Name</th>
              <th className="px-7 py-3 text-left">Department</th>
              <th className="px-7 py-3 text-left">Designation</th>
              <th className="px-7 py-3 text-left">Summary</th>
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
                <td className="p-3 px-7">{emp.fname}</td>
                <td className="p-3 px-7">{emp.department}</td>
                <td className="p-3 px-7">{emp.design}</td>
                <td className="p-3 px-7">
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
      </div>

      {showModal && selectedEmployee && (
        <EarningDetails
          onClose={() => {
            setShowModal(false);
            setSelectedEmployee(null);
          }}
          earningDetails={earningDetails}
          employee={selectedEmployee} // Optional: in case modal shows employee info too
        />
      )}
    </div>
  );
};

export default PayrollSummary;
