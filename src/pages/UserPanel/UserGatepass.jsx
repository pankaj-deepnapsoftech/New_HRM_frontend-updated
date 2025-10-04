import React, { useState } from "react";
import { FaRegFileAlt, FaMoneyBillWave, FaPlus, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { MdLogout, MdDateRange } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { toast } from "react-toastify";
import {
  useCreateGatepassRequestMutation,
  useGetEmployeeGatepassRequestsQuery,
  useDeleteGatepassRequestMutation,
} from "@/service/Gatepass.services";

const UserGatepass = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    reason: "",
    requestDate: "",
    logoutTime: "",
    distance: "",
    workReason: "",
    estimatedPayment: ""
  });

  // API hooks
  const [createGatepassRequest, { isLoading: isSubmitting }] = useCreateGatepassRequestMutation();
  const [deleteGatepassRequest] = useDeleteGatepassRequestMutation();
  const { data: gatepassData, isLoading, refetch } = useGetEmployeeGatepassRequestsQuery({ page: 1, limit: 50 });

  const gatepassRequests = gatepassData?.data || [];

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!applicationForm.reason || !applicationForm.requestDate || !applicationForm.logoutTime || 
        !applicationForm.distance || !applicationForm.workReason || !applicationForm.estimatedPayment) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createGatepassRequest({
        reason: applicationForm.reason,
        requestDate: applicationForm.requestDate,
        logoutTime: applicationForm.logoutTime,
        distance: parseInt(applicationForm.distance),
        workReason: applicationForm.workReason,
        estimatedPayment: parseInt(applicationForm.estimatedPayment)
      }).unwrap();

      setShowApplicationForm(false);
      setApplicationForm({
        reason: "",
        requestDate: "",
        logoutTime: "",
        distance: "",
        workReason: "",
        estimatedPayment: ""
      });
      toast.success("Gatepass request submitted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit gatepass request");
    }
  };

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this gatepass request?")) {
      try {
        await deleteGatepassRequest(requestId).unwrap();
        toast.success("Gatepass request deleted successfully!");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete gatepass request");
      }
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
        Gate Pass Application
      </div>

      {/* Action Bar */}
      <div className="bg-white w-full max-w-4xl shadow-sm rounded-b-xl p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">My Gate Pass Requests</h2>
        <button
          onClick={() => setShowApplicationForm(!showApplicationForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <FaPlus /> New Application
        </button>
      </div>

      {/* Application Form */}
      {showApplicationForm && (
        <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-4xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Apply for Gate Pass</h3>
          
          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                <select
                  value={applicationForm.reason}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="Company Work">Company Work</option>
                  <option value="Personal Work">Personal Work</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Date *</label>
                <input
                  type="date"
                  value={applicationForm.requestDate}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, requestDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logout Time *</label>
                <input
                  type="time"
                  value={applicationForm.logoutTime}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, logoutTime: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (KM) *</label>
                <input
                  type="number"
                  value={applicationForm.distance}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, distance: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter distance"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Reason *</label>
              <textarea
                value={applicationForm.workReason}
                onChange={(e) => setApplicationForm(prev => ({ ...prev, workReason: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Describe the reason for gatepass in detail"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Payment (₹) *</label>
              <input
                type="number"
                value={applicationForm.estimatedPayment}
                onChange={(e) => setApplicationForm(prev => ({ ...prev, estimatedPayment: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter estimated payment amount"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gate Pass Requests List */}
      <div className="w-full max-w-4xl mt-6 space-y-4">
        {gatepassRequests.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-lg">No gatepass requests found.</p>
            <p className="text-gray-400 text-sm mt-2">Click "New Application" to create your first gatepass request.</p>
          </div>
        ) : (
          gatepassRequests.map((request) => (
            <div key={request._id} className="bg-white p-4 md:p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Gate Pass Request</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  {request.status === "pending" && (
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Request"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                <ul className="space-y-3 text-sm text-gray-700">
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
                  {request.approvedAt && (
                    <li className="flex items-start gap-2">
                      <FaCheck className="mt-1 text-green-600" />
                      <span><strong>Processed On:</strong> {new Date(request.approvedAt).toLocaleDateString()}</span>
                    </li>
                  )}
                  {request.rejectionReason && (
                    <li className="flex items-start gap-2">
                      <FaTimes className="mt-1 text-red-600" />
                      <span><strong>Rejection Reason:</strong> {request.rejectionReason}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserGatepass;
