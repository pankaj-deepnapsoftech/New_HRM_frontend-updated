import React, { useMemo } from "react";
import {
  useGetPendingLeaveRequestsQuery,
  useUpdateLeaveRequestMutation,
} from "@/service/LeaveRequest.services";
import { toast } from "react-toastify";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "-";
  }
};

const HRDashboard = () => {
  const { data, isLoading, isError, refetch } =
    useGetPendingLeaveRequestsQuery();
  const [updateLeaveRequest, { isLoading: isUpdating }] =
    useUpdateLeaveRequestMutation();

  const requests = useMemo(() => data?.data || [], [data]);

  const handleAction = async (id, action) => {
    try {
      await updateLeaveRequest({ id, status: action }).unwrap();
      toast.success(`Request ${action} successfully`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || `Failed to ${action} request`);
    }
  };

  if (isLoading) return <div className="p-4">Loading pending requests...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Failed to load requests.</div>;

  return (
    <div className="p-2 h-screen bg-gray-50 rounded shadow-md max-w-5xl mx-auto">
      {/* Heading */}
      <div className="bg-gray-300 text-center mx-4 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employee Leave Balance</h2>
      </div>

      <div className="overflow-x-scroll scrollbar-visible rounded-t-sm md:rounded-t-xl shadow-md mx-4 md:mx-6 mb-8">
        {requests.length === 0 ? (
          <div className="text-gray-600 text-center py-6">
            No pending requests.
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 whitespace-nowrap text-gray-700 text-left">
                <th className="font-[600] py-4 px-4">Employee Code</th>
                <th className="font-[600] py-4 px-4">Employee</th>
                <th className="font-[600] py-4 px-4">Type</th>
                <th className="font-[600] py-4 px-4">Mode</th>
                <th className="font-[600] py-4 px-4">From</th>
                <th className="font-[600] py-4 px-4">To</th>
                <th className="font-[600] py-4 px-4">Status</th>
                <th className="font-[600] py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    {req.employeeId?.empCode || "NA"}
                  </td>
                  <td className="py-3 px-4">{req.employeeId?.fname || "NA"}</td>
                  <td className="py-3 px-4 capitalize">{req.type || "NA"}</td>
                  <td className="py-3 px-4 capitalize">{req.mode || "NA"}</td>
                  <td className="py-3 px-4">{formatDate(req.from)}</td>
                  <td className="py-3 px-4">{formatDate(req.to)}</td>
                  <td
                    className={`my-5 py-2 px-3 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit ${
                      req.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        disabled={isUpdating}
                        onClick={() => handleAction(req._id, "approved")}
                        className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white disabled:opacity-60 transition"
                      >
                        Approve
                      </button>
                      <button
                        disabled={isUpdating}
                        onClick={() => handleAction(req._id, "rejected")}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
