import ReimbursementModal from "@/Drawer/Reimbursement/AddEmployee";
import ViewReimbursement from "@/Drawer/Reimbursement/ViewReimbursement";
import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

const Reimbursements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedIncentive, setSelectedIncentive] = useState({});

  const employees = [
    {
      name: "Nitish",
      department: "IT",
      designation: "Developer",
      hasIncentive: false,
    },
    {
      name: "abhi",
      department: "IT",
      designation: "Manager",
      hasIncentive: true,
    },
    {
      name: "komal",
      department: "sale",
      designation: "manager",
      hasIncentive: false,
    },
    {
      name: "Deepak",
      department: "Sales",
      designation: "Boss",
      hasIncentive: true,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="p-5 md:p-10 bg-gray-50 rounded shadow-md max-w-4xl mx-auto m-14">
      <div className="bg-gray-300 text-gray-700 text-center py-4 rounded-xl shadow-md shadow-gray-400 ">
        <h2 className="text-xl font-bold">Reimbursements</h2>
      </div>

      <div className="overflow-x-auto scrollbar-visible shadow-lg rounded-t-sm md:rounded-xl mt-10">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 text-[15px] text-gray-700  uppercase text-xs">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap text-left">Name</th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Department
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Designation
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Reimbursements
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left">
                Add Reimbursements
              </th>
            </tr>
          </thead>
          <tbody className="divide-y text-[16px] divide-gray-100">
            {employees.map((emp, index) => (
              <tr
                key={index}
                className={`border-b border-gray-300 ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-6 py-5 font-medium text-gray-900">
                  {emp.name}
                </td>
                <td className="px-6 py-5 text-gray-500 capitalize">
                  {emp.department}
                </td>
                <td className="px-6 py-5 text-gray-700 capitalize">
                  {emp.designation}
                </td>
                <td className="px-6 py-5">
                  {emp.hasIncentive ? (
                    <>
                      <button
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedEmployee(emp.name);
                          setSelectedIncentive(emp.incentive || {}); // fallback in case incentive is missing
                        }}
                      >
                        <MdRemoveRedEye className="w-4 h-4" />
                        View
                      </button>

                      {modalOpen && selectedEmployee === emp.name && (
                        <ViewReimbursement
                          isOpen={modalOpen}
                          onClose={() => setModalOpen(false)}
                          employeeName={emp.name}
                          incentives={selectedIncentive}
                        />
                      )}
                    </>
                  ) : (
                    <span></span>
                  )}
                </td>

                <td className="px-6 py-3">
                  {emp.hasIncentive ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
                      onClick={() => setOpen(true)}
                    >
                      ADD
                    </button>
                  ) : (
                    <span></span>
                  )}
                  {open && (
                    <ReimbursementModal onClose={() => setOpen(false)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reimbursements;
