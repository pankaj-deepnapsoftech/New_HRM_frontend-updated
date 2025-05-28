import React, { useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

const ViewModal = ({ isOpen, onClose, employee }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
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

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoMdClose size={22} />
        </button>

        {/* Profile Section */}
        <div className="text-center mb-6">
          <img
            src={employee.image || '/image.jpg'}
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full border border-gray-200"
          />
          <h3 className="text-lg font-semibold mt-2">{employee.name}</h3>
          <p className="text-gray-500 text-sm">{employee.designation}</p>
        </div>

        {/* Details Table */}
        <div className="bg-gray-100 rounded-lg p-6 text-sm">
          <div className="flex justify-between py-2">
            <span className="font-medium">Email:</span>
            <span>{employee.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Department:</span>
            <span>{employee.department}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Designation:</span>
            <span>{employee.designation}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Phone Number:</span>
            <span>{employee.phone || '-'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Emp-Code:</span>
            <span>{employee.empCode}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Joining Date:</span>
            <span>{employee.joiningDate || '-'}</span>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default ViewModal;
