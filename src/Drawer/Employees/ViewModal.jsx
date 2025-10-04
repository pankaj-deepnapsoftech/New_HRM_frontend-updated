import React from "react";
import { IoMdClose } from "react-icons/io";

const ViewModal = ({ showDetailModal, setShowDetailModal, employee }) => {
  if (!showDetailModal || !employee) return null;

  const getValue = (obj, path) => {
    if (!obj) return null;
    if (typeof path === "string" && path.includes(".")) {
      return path.split(".").reduce((current, key) => current?.[key], obj);
    }
    return obj[path];
  };

  const fieldsOrder = [
    { key: "Emp_id.empCode", label: "Employee Code" },
    { key: "Emp_id.fname", label: "Employee Name" },
    { key: "Address", label: "Address" },
    { key: "Back_Name", label: "Bank Name" },
    { key: "Bank_Account", label: "Bank Account" },
    { key: "IFSC_Code", label: "IFSC Code" },
    { key: "UAN_number", label: "UAN Number" },
    { key: "Department", label: "Department" },
    { key: "Designation", label: "Designation" },
    { key: "salary", label: "Salary" },
    { key: "aadhaar", label: "Aadhaar" },
    { key: "pancard", label: "PAN Card" },
    { key: "Voter_Id", label: "Voter ID" },
    { key: "Driving_Licance", label: "Driving License" },
    { key: "Bank_Proof", label: "Bank Proof" },
  ];

  const isFileLink = (value) =>
    typeof value === "string" && value.startsWith("http");

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex justify-center items-center transition-all duration-500 ${
        showDetailModal ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowDetailModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoMdClose size={22} />
        </button>

        <div className="text-center mb-6">
          {employee.photo && (
            <img
              src={employee.photo || "/profilee.png"}
              alt="Employee"
              className="w-24 h-24 rounded-full object-cover mx-auto shadow-md"
              onError={(e) => {
                e.target.src = "/profilee.png";
              }}
            />
          )}
          <h3 className="text-lg font-semibold mt-3">
            {getValue(employee, "Emp_id.fname") || "No Name"}
          </h3>
          <p className="text-gray-600">
            {employee.Designation || "No Designation"}
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-sm space-y-2">
          {fieldsOrder?.map((field) => {
            const value = getValue(employee, field.key);
            if (!value) return null;

            return (
              <div
                key={field.key}
                className="flex justify-between border-b py-2 text-gray-700"
              >
                <span className="font-medium">{field.label}:</span>
                <span className="text-right text-gray-800 break-words max-w-[60%]">
                  {isFileLink(value) ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Document
                    </a>
                  ) : (
                    value
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
