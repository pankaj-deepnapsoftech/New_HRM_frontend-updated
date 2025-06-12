import React from "react";

const UserLeaveRequest = () => {
  return (
    <div className="min-h-screen  bg-gray-50 px-4 py-2 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className=" text-gray-800 text-center py-8 rounded-t-xl  mb-6">
          <h1 className="text-2xl font-bold">Employee Leave Request</h1>
        </div>

        <form className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                From Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                To Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Request Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Request Leave
              </label>
              <p className="text-sm text-gray-400">Available: 0 half-day leaves</p>
              <p className="text-sm text-gray-400 mb-2">Available: 0 full-day leaves</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-blue-500" />
                  Half Day
                </label>
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-blue-500" />
                  Full Day
                </label>
              </div>
            </div>

            {/* Leave Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Leave Type<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Leave Type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="earned">Earned Leave</option>
              </select>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Reason for Leave
            </label>
            <textarea
              rows={4}
              placeholder="Write reason here..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLeaveRequest;
