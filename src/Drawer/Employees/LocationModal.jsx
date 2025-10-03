import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io"; // Close icon

const LocationModal = ({ showModal, setShowModal, location }) => {
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-3 px-16 relative"
      >
        {/* Close Icon */}
        <button
          onClick={() => setShowModal(false)}
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
