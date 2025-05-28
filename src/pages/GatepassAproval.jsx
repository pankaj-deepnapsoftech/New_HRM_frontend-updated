import React from "react";
import { FaRegFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdLogout, MdDateRange } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";

const GatepassApprovals = () => {
  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="bg-gray-300 text-gray-600 text-lg md:text-xl font-semibold py-3 px-4 rounded-t-xl shadow-md w-full max-w-4xl text-center">
        Employee Gate Pass Request
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-row sm:justify-center gap-4 sm:gap-8 bg-gray-100 py-6 px-4 sm:px-6 w-full max-w-4xl shadow-sm rounded-b-xl">
        <button className="bg-gray-200 font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm">
          All
        </button>
        <button className="bg-gray-200 font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm">
          This Week
        </button>
        <button className="bg-gray-200 font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm">
          This Month
        </button>
      </div>

      {/* Request Card */}
      {[{
        name: "Nitish",
        id: "NIT51130226",
        status: "Approved",
        reason: "Company Work",
        requestDate: "2/26/2025",
        logoutTime: "10:53:59",
        distance: "10",
        workReason: "submit documents in bank",
        payment: "₹50"
      }, {
        name: "Komal",
        id: "KOM51130226",
        status: "Approved",
        reason: "Company Work",
        requestDate: "2/26/2025",
        logoutTime: "10:53:59",
        distance: "10",
        workReason: "submit documents in bank",
        payment: "₹50"
      }].map((emp, index) => (
        <div key={index} className="bg-white mt-6 p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl">
          <p className="text-base md:text-lg font-semibold mb-3">
            Employee Name:{" "}
            <span className="text-blue-600 font-medium">
              {emp.name} ({emp.id})
            </span>
          </p>

          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-green-600 text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md">
                {emp.status}
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-700 mt-1">
              <li className="flex items-start gap-2">
                <FaRegFileAlt className="mt-1 text-gray-600" />
                <span><strong>Reason:</strong> {emp.reason}</span>
              </li>
              <li className="flex items-start gap-2">
                <MdDateRange className="mt-1 text-red-500" />
                <span><strong>Request Date:</strong> {emp.requestDate}</span>
              </li>
              <li className="flex items-start gap-2">
                <MdLogout className="mt-1 text-yellow-600" />
                <span><strong>Logout Time:</strong> {emp.logoutTime}</span>
              </li>
              <li className="flex items-start gap-2">
                <GiPathDistance className="mt-1 text-blue-500" />
                <span><strong>Total KM:</strong> {emp.distance}</span>
              </li>
              <li className="flex items-start gap-2">
                <BsFillBuildingsFill className="mt-1 text-indigo-500" />
                <span><strong>Company Work Reason:</strong> {emp.workReason}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMoneyBillWave className="mt-1 text-green-600" />
                <span><strong>Total Payment:</strong> {emp.payment}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GatepassApprovals;
