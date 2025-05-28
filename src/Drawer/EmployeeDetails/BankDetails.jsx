import React, { useRef, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaUniversity } from 'react-icons/fa';

const BankDetails = ({ isOpen, onClose, onSubmit }) => {
    
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <IoMdClose size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          Bank Account Verification <FaUniversity className="text-gray-700" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Account Holder's Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Account Holder's Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Account Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter Account Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bank Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter Bank Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">IFSC Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter IFSC Code"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-700 rounded"
            >
              Closed
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;
