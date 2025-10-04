import React, { useState } from "react";
import { FaRegFileAlt, FaMoneyBillWave, FaCheck, FaTimes } from "react-icons/fa";
import { MdLogout, MdDateRange } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { toast } from "react-toastify";
import {
  useGetAllGatepassRequestsQuery,
  useUpdateGatepassStatusMutation,
} from "@/service/Gatepass.services";

const GatepassApprovals = () => {
  const [filter, setFilter] = useState("all"); // "all", "pending", "approved", "rejected"
  const [rejectionReason, setRejectionReason] = useState("");

  // API hooks
  const { data: gatepassData, isLoading, refetch } = useGetAllGatepassRequestsQuery({ 
    status: filter === "all" ? "all" : filter, 
    page: 1, 
    limit: 50 
  });
  const [updateGatepassStatus] = useUpdateGatepassStatusMutation();

  const gatepassRequests = gatepassData?.data || [];

  const handleApproval = async (requestId, status) => {
    try {
      const payload = { id: requestId, status };
      
      if (status === "rejected" && rejectionReason) {
        payload.rejectionReason = rejectionReason;
      }
      
      await updateGatepassStatus(payload).unwrap();
      toast.success(`Request ${status} successfully!`);
      refetch();
      setRejectionReason("");
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${status} request`);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-500", text: "Pending" },
      approved: { bg: "bg-green-600", text: "Approved" },
      rejected: { bg: "bg-red-600", text: "Rejected" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`${config.bg} text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md`}>
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="bg-gray-300 text-gray-600 text-lg md:text-xl font-semibold py-3 px-4 rounded-t-xl shadow-md w-full max-w-4xl text-center">
        Gate Pass Approval Management
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-row sm:justify-center gap-4 sm:gap-8 bg-gray-100 py-6 px-4 sm:px-6 w-full max-w-4xl shadow-sm rounded-b-xl">
        <button 
          onClick={() => setFilter("all")}
          className={`font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm transition-colors ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter("pending")}
          className={`font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm transition-colors ${
            filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter("approved")}
          className={`font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm transition-colors ${
            filter === "approved" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Approved
        </button>
        <button 
          onClick={() => setFilter("rejected")}
          className={`font-semibold px-6 py-2 rounded shadow-sm shadow-gray-400 text-sm transition-colors ${
            filter === "rejected" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Gate Pass Requests List */}
      {gatepassRequests.length === 0 ? (
        <div className="bg-white mt-6 p-8 rounded-xl shadow-md w-full max-w-4xl text-center">
          <p className="text-gray-500 text-lg">No gatepass requests found for the selected filter.</p>
        </div>
      ) : (
        gatepassRequests.map((request) => (
          <div key={request._id} className="bg-white mt-6 p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl">
            <p className="text-base md:text-lg font-semibold mb-3">
              Employee Name:{" "}
              <span className="text-blue-600 font-medium">
                {request.employeeId?.fname} ({request.employeeId?.employeeId})
              </span>
            </p>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 relative">
              <div className="absolute top-4 right-4">
                {getStatusBadge(request.status)}
              </div>

              <ul className="space-y-3 text-sm text-gray-700 mt-1">
                <li className="flex items-start gap-2">
                  <FaRegFileAlt className="mt-1 text-gray-600" />
                  <span><strong>Reason:</strong> {request.reason}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MdDateRange className="mt-1 text-red-500" />
                  <span><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MdLogout className="mt-1 text-yellow-600" />
                  <span><strong>Logout Time:</strong> {request.logoutTime}</span>
                </li>
                <li className="flex items-start gap-2">
                  <GiPathDistance className="mt-1 text-blue-500" />
                  <span><strong>Total KM:</strong> {request.distance}</span>
                </li>
                <li className="flex items-start gap-2">
                  <BsFillBuildingsFill className="mt-1 text-indigo-500" />
                  <span><strong>Work Reason:</strong> {request.workReason}</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaMoneyBillWave className="mt-1 text-green-600" />
                  <span><strong>Estimated Payment:</strong> ₹{request.estimatedPayment}</span>
                </li>
                {request.approvedBy && (
                  <li className="flex items-start gap-2">
                    <FaCheck className="mt-1 text-green-600" />
                    <span><strong>Approved By:</strong> {request.approvedBy?.fullName}</span>
                  </li>
                )}
                {request.rejectionReason && (
                  <li className="flex items-start gap-2">
                    <FaTimes className="mt-1 text-red-600" />
                    <span><strong>Rejection Reason:</strong> {request.rejectionReason}</span>
                  </li>
                )}
              </ul>

              {/* Admin Action Buttons */}
              {request.status === "pending" && (
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-300">
                  <button
                    onClick={() => handleApproval(request._id, "approved")}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt("Please provide rejection reason:");
                      if (reason) {
                        setRejectionReason(reason);
                        handleApproval(request._id, "rejected");
                      }
                    }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default GatepassApprovals;
