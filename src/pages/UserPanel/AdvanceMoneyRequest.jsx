import { FaUser, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";

const AdvanceMoneyRequest = () => {
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-gray-50 shadow-2xl rounded-2xl p-8">
      {/* Header */}
      <div className=" bg-gray-400 text-white text-2xl font-bold text-center py-4 rounded-xl shadow-md mb-6">
        Advance Money Request
      </div>

      {/* Employee Details Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
          <FaUser className="text-gray-600" /> Employee Details
        </h2>
        <p><span className="font-bold">Name:</span> Rahul Gupta</p>
        <p><span className="font-bold">Salary:</span> <FaRupeeSign className="inline" /> 20000</p>
        <p><span className="font-bold">Joining Date:</span> <FaCalendarAlt className="inline" /> 6/28/2025</p>
      </div>

      {/* Advance Request Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Request Advance</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Reason</label>
        <textarea
          rows="4"
          placeholder="Provide a reason..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
<div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-md transition"
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
