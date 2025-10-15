import React, { useState } from "react";
import { useLogedInuserQuery } from "@/service/Auth.services";
import {
  useCreateRegularizationRequestMutation,
  useGetEmployeeRegularizationRequestsQuery,
} from "@/service/AttendanceRegularization.services";
import { toast } from "react-toastify";
import { FaClock, FaCalendarAlt, FaFileUpload, FaTimes } from "react-icons/fa";

const AttendanceRegularization = () => {
  const { data: userData } = useLogedInuserQuery();
  const employeeId = userData?.data?._id;

  const [createRequest, { isLoading: isCreating }] = useCreateRegularizationRequestMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const { data: requestsData, refetch } = useGetEmployeeRegularizationRequestsQuery({
    employeeId,
    page: currentPage,
    limit: showAll ? 1000 : 10, // Show all requests if showAll is true
  }, {
    skip: !employeeId, // Skip the query if employeeId is not available
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    requestType: "checkin",
    requestedCheckInTime: "",
    requestedCheckOutTime: "",
    reason: "",
    supportingDocument: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.reason) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.requestType === "checkin" && !formData.requestedCheckInTime) {
      toast.error("Please provide check-in time");
      return;
    }

    if (formData.requestType === "checkout" && !formData.requestedCheckOutTime) {
      toast.error("Please provide check-out time");
      return;
    }

    if (formData.requestType === "both" && (!formData.requestedCheckInTime || !formData.requestedCheckOutTime)) {
      toast.error("Please provide both check-in and check-out times");
      return;
    }

    try {
      const requestData = {
        employeeId,
        date: formData.date,
        requestType: formData.requestType,
        requestedCheckInTime: formData.requestedCheckInTime,
        requestedCheckOutTime: formData.requestedCheckOutTime,
        reason: formData.reason,
      };

      await createRequest(requestData).unwrap();
      toast.success("Regularization request submitted successfully");
      setFormData({
        date: "",
        requestType: "checkin",
        requestedCheckInTime: "",
        requestedCheckOutTime: "",
        reason: "",
        supportingDocument: null,
      });
      setShowForm(false);
      setCurrentPage(1); // Reset to first page to see the new request
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit request");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRequestTypeText = (type) => {
    switch (type) {
      case 'checkin': return 'Check-in';
      case 'checkout': return 'Check-out';
      case 'both': return 'Both Check-in & Check-out';
      default: return type;
    }
  };

  const renderPaginationControls = () => {
    if (showAll || !requestsData?.pagination || requestsData.pagination.totalPages <= 1) {
      return null;
    }
    
    const startIndex = ((currentPage - 1) * 10) + 1;
    const endIndex = currentPage * 10 > requestsData.pagination.totalRequests 
      ? requestsData.pagination.totalRequests 
      : currentPage * 10;
    const totalRequests = requestsData.pagination.totalRequests;
    
    return (
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {startIndex} to {endIndex} of {totalRequests} requests
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {currentPage} of {requestsData.pagination.totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => prev < requestsData.pagination.totalPages ? prev + 1 : requestsData.pagination.totalPages)}
            disabled={currentPage === requestsData.pagination.totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaClock className="text-blue-500" />
              Attendance Regularization
            </h1>
            <p className="text-gray-600 mt-1">
              Request corrections for missed check-ins or check-outs
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            New Request
          </button>
        </div>
      </div>

      {/* Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">New Regularization Request</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="checkin">Check-in Only</option>
                  <option value="checkout">Check-out Only</option>
                  <option value="both">Both Check-in & Check-out</option>
                </select>
              </div>

              {/* Check-in Time */}
              {(formData.requestType === "checkin" || formData.requestType === "both") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requested Check-in Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="requestedCheckInTime"
                    value={formData.requestedCheckInTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              {/* Check-out Time */}
              {(formData.requestType === "checkout" || formData.requestType === "both") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requested Check-out Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="requestedCheckOutTime"
                    value={formData.requestedCheckOutTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please explain why you missed the check-in/check-out..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Supporting Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting Document (Optional)
                </label>
                <input
                  type="file"
                  name="supportingDocument"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload any supporting documents (PDF, images, or documents)
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {isCreating ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Requests History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            Your Regularization Requests
          </h2>
          
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showAll 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showAll ? 'Show Paginated' : 'Show All Requests'}
            </button>
            
            {requestsData?.pagination && (
              <span className="text-sm text-gray-600">
                Total: {requestsData.pagination.totalRequests} requests
              </span>
            )}
          </div>
        </div>

        {requestsData?.data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Check-in Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Check-out Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Manager Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requestsData.data.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {new Date(request.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {getRequestTypeText(request.requestType)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {request.requestedCheckInTime || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {request.requestedCheckOutTime || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {request.managerRemark || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaCalendarAlt className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No regularization requests found.</p>
            <p className="text-sm">Click "New Request" to submit your first request.</p>
          </div>
        )}
        
        {/* Pagination Controls */}
        {renderPaginationControls()}
      </div>
    </div>
  );
};

export default AttendanceRegularization;
