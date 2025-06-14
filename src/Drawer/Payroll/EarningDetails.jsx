import React from "react";
import { IoIosClose } from "react-icons/io";
const EarningDetails = ({ showEarningDetails, setShowEarningDetails, employee }) => {
  if (!employee) return null;

  const earningDetails = {
    basic: 12000,
    fund: 1440,
    incentives: 500,
    reimbursement: 0,
    advance: 0,
    total: 11060,
  };

  return (
    <section className={`${showEarningDetails ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/40  transition-opacity duration-500 ease-in-out`}>
      <div className="bg-white rounded-xl w-lg p-8 shadow-2xl animate-fade-in border border-gray-200">
        <button
          className="text-gray-600 flex cursor-pointer justify-end w-full hover:text-red-600"
          onClick={() => setShowEarningDetails(false)}
          aria-label="Close"
        >
          <IoIosClose size={36} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
          Earning Details - {employee?.fname}
        </h2>

        <div className="space-y-4 text-base text-gray-700">
          <div className="flex justify-between">
            <span>Basic Salary</span>
            <span className="font-medium">₹ {earningDetails.basic.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Fund (12%)</span>
            <span className="font-medium">₹ {earningDetails.fund.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Incentives</span>
            <span className="font-medium">₹ {earningDetails.incentives.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Reimbursement</span>
            <span className="font-medium">₹ {earningDetails.reimbursement.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Advance</span>
            <span className="font-medium">₹ {earningDetails.advance.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-700 font-bold border-t border-gray-300 pt-4 text-lg">
            <span>Total Earning</span>
            <span>₹ {earningDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EarningDetails