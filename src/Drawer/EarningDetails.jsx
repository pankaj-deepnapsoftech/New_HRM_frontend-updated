import React from 'react';

const EarningDetails = ({ onClose, earningDetails }) => {
  if (!earningDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg animate-fade-in">
        <h2 className="text-lg font-semibold text-center mb-4">Earning Details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Basic Salary</span><span>₹ {earningDetails.basic.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Fund(12%)</span><span>₹ {earningDetails.fund.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Incentives</span><span>₹ {earningDetails.incentives.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Reimbursement</span><span>₹ {earningDetails.reimbursement.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Advance</span><span>₹ {earningDetails.advance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600 font-semibold border-t pt-2">
            <span>Total Earning</span><span>₹ {earningDetails.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningDetails;
