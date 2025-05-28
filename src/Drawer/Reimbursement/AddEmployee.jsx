import React from "react";
import { X } from "lucide-react";

const ReimbursementModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
      <div className="bg-white rounded-sm shadow-lg w-[350px] md:w-[420px] relative px-6 py-6">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center  mb-6">
          Add Employee Reimbursements
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount *"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <textarea
            placeholder="Notes *"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-around space-x-4">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded shadow bg-gradient-to-br from-slate-500 to-slate-600 text-sm hover:bg-gradient-to-tl"
          >
            ADD REIMBURSEMENTS
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ReimbursementModal;
