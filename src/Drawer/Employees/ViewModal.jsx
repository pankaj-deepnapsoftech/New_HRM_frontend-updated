import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ViewModal = ({ showDetailModal, setShowDetailModal, employee }) => {
  if (!employee) return null;

  // List keys in desired order (optional)
  const fieldsOrder = [
    "Emp_id",
    "Address",
    "Back_Name",
    "Bank_Account",
    "Bank_Proof",
    "Department",
    "Designation",
    "Driving_Licance",
    "IFSC_Code",
    "UAN_number",
    "aadhaar",
    "pancard",
    "photo",
    "salary",
  ];

  // Convert key string like 'Back_Name' to 'Back Name'
  const formatKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Check if value is a URL (file link)
  const isFileLink = (value) =>
    typeof value === "string" && value.startsWith("http");

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex justify-center items-center transition-all duration-500 ${showDetailModal ? "visible" : "invisible"
        }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setShowDetailModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoMdClose size={22}/>
        </button>

        {/* Photo & Name */}
        <div className="text-center mb-6">
          {employee.photo && (
            <img
              src={employee.photo}
              alt="Employee"
              className="w-24 h-24 rounded-full object-cover mx-auto shadow-md"
            />
          )}
          <h3 className="text-lg font-semibold mt-3">{employee.Designation || "No Designation"}</h3>
        </div>

        {/* Info Grid */}
        <div className="bg-gray-100 rounded-lg p-4 text-sm space-y-2">
          {fieldsOrder.map((key) => {
            // skip photo here since displayed above
            if (key === "photo") return null;
            const value = employee[key];
            return (
              <div
                key={key}
                className="flex justify-between border-b py-2 text-gray-700"
              >
                <span className="font-medium">{formatKey(key)}:</span>
                <span className="text-right text-gray-800 break-words max-w-[60%]">
                  {isFileLink(value) ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    value || "-"
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
