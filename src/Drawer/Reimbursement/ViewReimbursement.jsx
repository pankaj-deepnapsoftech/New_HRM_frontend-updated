import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

const ViewReimbursement = ({ isOpen, onClose, employeeName, incentives }) => {
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const isEmpty = !incentives || Object.keys(incentives).length === 0;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-6 shadow-lg w-[350px] md:w-[400px] animate-fade-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <MdClose />
        </button>

        <h2 className="text-center text-xl font-medium mb-5">
          View Employee Reimbursements
        </h2>

        <div className="bg-gray-50 p-4 rounded shadow-md">
          <h3 className="text-lg font-bold text-center mb-3">
            {employeeName}'s Reimbursements
          </h3>

          {isEmpty ? (
            <p className="text-center text-gray-500">
              No reimbursements found for this employee.
            </p>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-3 text-green-600 font-medium">
                    ₹{incentives.amount}
                  </td>
                  <td className="py-2 px-3">{incentives.date}</td>
                  <td className="py-2 px-3">{incentives.notes}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReimbursement;
