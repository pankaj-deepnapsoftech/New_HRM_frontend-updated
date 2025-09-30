import React from "react";
import { FaBoxOpen } from "react-icons/fa";

const UserAssets = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Header */}
      <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 py-5 px-6 rounded-xl shadow-lg text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Employee Assets</h1>
      </div>

      {/* No Assets Card */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-start gap-4">
        <div className="flex items-center justify-start w-16 h-16 rounded-full bg-gray-200 mb-4">
          <FaBoxOpen className="text-gray-400 text-3xl mx-auto" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          No assets assigned to you
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Currently, there are no assets allocated to your account. Any assigned
          assets will appear here for easy tracking and management.
        </p>
      </div>
    </div>
  );
};

export default UserAssets;
