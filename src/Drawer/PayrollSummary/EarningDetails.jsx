import React, { useRef, useEffect } from 'react';

const EarningDetails = ({ onClose, earningDetails }) => {
  const modalRef = useRef(null);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!earningDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg w-[400px] p-6 shadow-lg animate-fade-in"
      >
        {/* Close (X) Button */}
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center mb-10">Earning Details</h2>
        <div className="space-y-6 text-sm">
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

      
      </div>
    </div>
  );
};

export default EarningDetails;
