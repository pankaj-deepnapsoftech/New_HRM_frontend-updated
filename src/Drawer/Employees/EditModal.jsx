import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const EditModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const modalRef = useRef();
  const [formData, setFormData] = useState(employee || {});
  

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-md shadow-md p-6 w-full max-w-md relative">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <IoMdClose size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block font-medium">Name</label>
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm block font-medium">Email</label>
            <input
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-sm block font-medium">Location</label>
            <input
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm block font-medium">Department</label>
            <input
              name="department"
              value={formData.department || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm block font-medium">Role</label>
            <input
              name="designation"
              value={formData.designation || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-br from-gray-500 to-gray-700 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
