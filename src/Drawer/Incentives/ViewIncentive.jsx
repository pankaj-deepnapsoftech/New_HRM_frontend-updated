import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md"; // Import Close icon

const ViewIncentive = ({ isOpen, onClose, employeeName, incentives }) => {
  const modalRef = useRef(null);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen || !incentives) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-6 shadow-lg w-[400px] animate-fade-in"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <MdClose />
        </button>

        <h2 className="text-center text-xl font-medium mb-5">
          View Employee Incentives
        </h2>

        <div className="bg-gray-50 p-4 rounded shadow-md">
          <h3 className="text-lg font-bold text-center mb-3">
            {employeeName}'s Incentives
          </h3>

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
                <td className="py-2 px-2 text-green-600 font-medium">
                  ₹{incentives.amount}
                </td>
                <td className="py-2 px-2">{incentives.date}</td>
                <td className="py-2 px-2">{incentives.notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewIncentive;
