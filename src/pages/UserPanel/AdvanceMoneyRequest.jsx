import { FaUser, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";

const AdvanceMoneyRequest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-50 shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 text-3xl font-bold text-center py-5 rounded-xl shadow-md mb-8">
          Advance Money Request
        </div>

        {/* Employee Details Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-700 border-b border-gray-200 pb-2">
            <FaUser className="text-blue-500" /> Employee Details
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Name:</span> Rahul Gupta
            </p>
            <p>
              <span className="font-medium text-gray-900">Salary:</span>{" "}
              <FaRupeeSign className="inline text-green-600" /> 20,000
            </p>
            <p>
              <span className="font-medium text-gray-900">Joining Date:</span>{" "}
              <FaCalendarAlt className="inline text-gray-500" /> 28/06/2025
            </p>
          </div>
        </div>

        {/* Advance Request Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-2">
            Request Advance
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 px-3">
              <FaRupeeSign className="text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              rows="4"
              placeholder="Provide a reason..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceMoneyRequest;
