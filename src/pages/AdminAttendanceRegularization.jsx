import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';
import moment from 'moment';
import { AttendanceRegularizationService } from '../service/AttendanceRegularization.services';
import { useLogedInuserQuery } from '@/service/Auth.services';

const AdminAttendanceRegularization = () => {
    const { data: adminUser } = useLogedInuserQuery();
    const [updatingId, setUpdatingId] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [managerRemark, setManagerRemark] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const data = await AttendanceRegularizationService.getPendingRequests();
            setRequests(data.data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Failed to load attendance regularization requests');
        } finally {
            setLoading(false);
        }
    };

    const updateRequestStatus = async (requestId, status) => {
        try {
            setUpdatingId(requestId);
            const approvedBy = adminUser?.data?._id;
            if (!approvedBy) {
                toast.error('Your user id is missing; please re-login.');
                return;
            }
            await AttendanceRegularizationService.updateRequestStatus(
                requestId, 
                status, 
                managerRemark || '', 
                approvedBy
            );

            toast.success(`Request ${status} successfully`);
            setShowModal(false);
            setManagerRemark('');
            fetchPendingRequests();
        } catch (error) {
            console.error('Error updating request:', error);
            toast.error(`Failed to ${status} request`);
        } finally {
            setUpdatingId(null);
        }
    };

    const viewRequestDetails = (request) => {
        setSelectedRequest(request);
        setManagerRemark('');
        setShowModal(true);
    };

    const filteredRequests = filterStatus === 'all' 
        ? requests 
        : requests.filter(req => req.status === filterStatus);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', text: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getRequestTypeBadge = (type) => {
        const typeConfig = {
            checkin: { color: 'bg-blue-100 text-blue-800', text: 'Check-in' },
            checkout: { color: 'bg-purple-100 text-purple-800', text: 'Check-out' },
            both: { color: 'bg-indigo-100 text-indigo-800', text: 'Both' }
        };
        
        const config = typeConfig[type] || typeConfig.checkin;
        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <FaCalendarAlt className="mr-3 text-blue-600" />
                                Attendance Regularization Requests
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage and approve employee attendance regularization requests
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Total Requests: {requests.length}
                            </span>
                            <button
                                onClick={fetchPendingRequests}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Requests</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {filteredRequests.length === 0 ? (
                        <div className="p-8 text-center">
                            <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Found</h3>
                            <p className="text-gray-500">
                                {filterStatus === 'all' 
                                    ? 'No attendance regularization requests available.' 
                                    : `No ${filterStatus} requests found.`
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Request Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Requested Times
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <FaUser className="text-blue-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {request.employeeId?.fname} {request.employeeId?.lastName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.employeeId?.empCode} • {request.employeeId?.department}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {moment(request.date).format('MMM DD, YYYY')}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {moment(request.createdAt).format('MMM DD, h:mm A')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getRequestTypeBadge(request.requestType)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {request.requestedCheckInTime && (
                                                        <div className="flex items-center">
                                                            <FaClock className="mr-1 text-green-500" />
                                                            In: {request.requestedCheckInTime}
                                                        </div>
                                                    )}
                                                    {request.requestedCheckOutTime && (
                                                        <div className="flex items-center">
                                                            <FaClock className="mr-1 text-red-500" />
                                                            Out: {request.requestedCheckOutTime}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(request.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => viewRequestDetails(request)}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                                    >
                                                        <FaEye className="mr-1" />
                                                        View
                                                    </button>
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateRequestStatus(request._id, 'approved')}
                                                                disabled={updatingId === request._id}
                                                                className="text-green-600 hover:text-green-900 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <FaCheck className="mr-1" />
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => updateRequestStatus(request._id, 'rejected')}
                                                                disabled={updatingId === request._id}
                                                                className="text-red-600 hover:text-red-900 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <FaTimes className="mr-1" />
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal for Request Details */}
                {showModal && selectedRequest && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Request Details
                                    </h3>
                                    <button
                                        onClick={() => { setShowModal(false); setManagerRemark(''); }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Employee</label>
                                            <p className="text-sm text-gray-900">
                                                {selectedRequest.employeeId?.fname} {selectedRequest.employeeId?.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {selectedRequest.employeeId?.empCode} • {selectedRequest.employeeId?.department}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Date</label>
                                            <p className="text-sm text-gray-900">
                                                {moment(selectedRequest.date).format('MMM DD, YYYY')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Request Type</label>
                                            <p className="text-sm text-gray-900">
                                                {getRequestTypeBadge(selectedRequest.requestType)}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Status</label>
                                            <p className="text-sm text-gray-900">
                                                {getStatusBadge(selectedRequest.status)}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedRequest.requestedCheckInTime && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Requested Check-in Time</label>
                                            <p className="text-sm text-gray-900">{selectedRequest.requestedCheckInTime}</p>
                                        </div>
                                    )}

                                    {selectedRequest.requestedCheckOutTime && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Requested Check-out Time</label>
                                            <p className="text-sm text-gray-900">{selectedRequest.requestedCheckOutTime}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                                            {selectedRequest.reason}
                                        </p>
                                    </div>

                                    {selectedRequest.supportingDocument && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Supporting Document</label>
                                            <a 
                                                href={selectedRequest.supportingDocument}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                View Document
                                            </a>
                                        </div>
                                    )}

                                    {selectedRequest.managerRemark && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Manager Remark</label>
                                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                                                {selectedRequest.managerRemark}
                                            </p>
                                        </div>
                                    )}

                                    {selectedRequest.status === 'pending' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Manager Remark (Optional)
                                            </label>
                                            <textarea
                                                value={managerRemark}
                                                onChange={(e) => setManagerRemark(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                placeholder="Add any remarks about this request..."
                                            />
                                        </div>
                                    )}
                                </div>

                                {selectedRequest.status === 'pending' && (
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            onClick={() => updateRequestStatus(selectedRequest._id, 'rejected')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => updateRequestStatus(selectedRequest._id, 'approved')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAttendanceRegularization;
