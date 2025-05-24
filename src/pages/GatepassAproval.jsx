import React from "react";
import { FaRegFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdLogout, MdDateRange } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";

const GatepassApprovals = () => {
  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="bg-gray-300 text-gray-600 text-xl font-semibold py-3 px-6 rounded-t-xl shadow-md w-full max-w-4xl text-center">
        Employee Gate Pass Request
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-8 bg-gray-50 py-8 px-64 w-full max-w-4xl shadow-sm rounded-b-xl">
        <button className="bg-gray-200 hover:bg-gray-200  font-semibold px-8 py-2 rounded shadow-sm shadow-gray-400  hover:shadow-black text-sm">
          All
        </button>
        <button className="bg-gray-200 hover:bg-gray-200 font-semibold px-4 py-1 rounded shadow-sm shadow-gray-400 hover:shadow-black text-sm">
          This Week
        </button>
        <button className="bg-gray-200 hover:bg-gray-200 font-semibold px-4 py-1 rounded shadow-sm shadow-gray-400 hover:shadow-black text-sm">
          This Month
        </button>
      </div>

      {/* Request Card */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-4xl">
        <p className="text-lg font-semibold mb-3 ">
          Employee Name:{" "}
          <span className="text-blue-600 font-medium">
            Nitish (NIT51130226)
          </span>
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 relative">
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-full">
              Approved
            </span>
          </div>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <FaRegFileAlt className="mt-1 text-gray-600" />
              <span>
                <strong>Reason:</strong> Company Work
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MdDateRange className="mt-1 text-red-500" />
              <span>
                <strong>Request Date:</strong> 2/26/2025
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MdLogout className="mt-1 text-yellow-600" />
              <span>
                <strong>Logout Time:</strong> 10:53:59
              </span>
            </li>
            <li className="flex items-start gap-2">
              <GiPathDistance className="mt-1 text-blue-500" />
              <span>
                <strong>Total KM:</strong> 10
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BsFillBuildingsFill className="mt-1 text-indigo-500" />
              <span>
                <strong>Company Work Reason:</strong> submit documents in bank
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaMoneyBillWave className="mt-1 text-green-600" />
              <span>
                <strong>Total Payment:</strong> ₹50
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-4xl">
        <p className="text-lg font-semibold mb-3">
          Employee Name:{" "}
          <span className="text-blue-600 font-medium">
           Komal (KOM51130226)
          </span>
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 relative">
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-full shadow-md ">
              Approved
            </span>
          </div>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <FaRegFileAlt className="mt-1 text-gray-600" />
              <span>
                <strong>Reason:</strong> Company Work
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MdDateRange className="mt-1 text-red-500" />
              <span>
                <strong>Request Date:</strong> 2/26/2025
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MdLogout className="mt-1 text-yellow-600" />
              <span>
                <strong>Logout Time:</strong> 10:53:59
              </span>
            </li>
            <li className="flex items-start gap-2">
              <GiPathDistance className="mt-1 text-blue-500" />
              <span>
                <strong>Total KM:</strong> 10
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BsFillBuildingsFill className="mt-1 text-indigo-500" />
              <span>
                <strong>Company Work Reason:</strong> submit documents in bank
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaMoneyBillWave className="mt-1 text-green-600" />
              <span>
                <strong>Total Payment:</strong> ₹50
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GatepassApprovals;
