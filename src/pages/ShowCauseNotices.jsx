import React from "react";

const showCauseData = [
  {
    complaintBy: "Nitish Prajapati",
    department: "It",
    reason: "misbehave",
    issuedAt: "2/26/2025",
    complaintTo: "abhi (ABH74130227)",
    status: "Reviewed",
  },
  {
    complaintBy: "komal singh",
    department: "IT",
    reason: "absent ",
    issuedAt: "3/3/2025",
    complaintTo: "Nitish (NIT51130226)",
    status: "Reviewed",
  },
];

const ShowCauseNotices = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="bg-gray-300 text-gray-600 text-xl font-semibold py-4 px-4 rounded-t-xl shadow-md w-full max-w-6xl text-center">
        Employee Show Cause Notices
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl overflow-x-auto bg-white shadow rounded-b-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Complaint By</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Issued At</th>
              <th className="px-4 py-3">Complaint To</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {showCauseData.map((entry, index) => (
              <tr key={index} className="border-t text-gray-800">
                <td className="px-4 py-3">{entry.complaintBy}</td>
                <td className="px-4 py-3">{entry.department}</td>
                <td className="px-4 py-3">{entry.reason}</td>
                <td className="px-4 py-3">{entry.issuedAt}</td>
                <td className="px-4 py-3">{entry.complaintTo}</td>
                <td className="px-4 py-3">{entry.status}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-400 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded shadow">
                    Mark as Reviewed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowCauseNotices;
