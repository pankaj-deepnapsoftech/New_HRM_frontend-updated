import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io"; // Close icon

const LocationModal = ({ isOpen, onClose, location }) => {
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl text-center font-semibold mb-5">
          Employee Location
        </h2>

        <p className="text-gray-700 text-sm break-words">{location}</p>
      </div>
    </div>
  );
};

export default LocationModal;
