import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
    useGetResignationRequestsQuery,
    useUpdateResignationRequestStatusMutation
} from '../service/ResignationRequest.services.js';
import {
    useGetAllEmpDataQuery,
    useTerminateEmployeeMutation,
    useGetAllTerminatedEmployeesQuery,
    useDeleteTerminatedEmployeeMutation,
} from '../service/EmpData.services.js';
import { FaEye, FaCheck, FaTimes, FaFilter, FaSearch, FaUserTimes, FaTrash } from 'react-icons/fa';
import Pagination from './Pagination/Pagination';

const AdminESeparation = () => {
    const [activeTab, setActiveTab] = useState('resignations'); // 'resignations' or 'terminated'
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        page: 1,
        limit: 10
    });
    const [statusForm, setStatusForm] = useState({
        status: '',
        adminComments: ''
    });

    // Termination states
    const [page, setPage] = useState(1);
    const [terminatedPage, setTerminatedPage] = useState(1);
    const [confirmId, setConfirmId] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [checkedAssets, setCheckedAssets] = useState({});

    const limit = 10;

    // RTK Query hooks for resignations
    const { data: requestsData, isLoading: loading, refetch: refetchRequests } = useGetResignationRequestsQuery(filters);
    const [updateResignationRequestStatus, { isLoading: isUpdating }] = useUpdateResignationRequestStatusMutation();

    // RTK Query hooks for employees and termination
    const { data: empData, isLoading: empLoading, refetch: refetchEmployees } = useGetAllEmpDataQuery({ page, limit });
    const { data: terminatedData, isLoading: terminatedLoading, refetch: refetchTerminated } = useGetAllTerminatedEmployeesQuery(
        { page: terminatedPage, limit },
        { skip: activeTab !== 'terminated' }
    );
    const [terminateEmployee] = useTerminateEmployeeMutation();
    const [deleteTerminatedEmployee] = useDeleteTerminatedEmployeeMutation();

    const requests = requestsData?.data || [];
    const pagination = requestsData?.pagination || { current: 1, pages: 1, total: 0 };
    const employees = empData?.data || [];
    const terminatedEmployees = terminatedData?.data || [];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value
        }));
    };

    const handleViewRequest = (id) => {
        // For RTK Query, we'll use the same data from the list or fetch separately
        const request = requests.find(req => req._id === id);
        if (request) {
            setSelectedRequest(request);
            setShowModal(true);
        }
    };

    const handleStatusUpdate = (request) => {
        setSelectedRequest(request);
        setStatusForm({
            status: '',
            adminComments: ''
        });
        setShowStatusModal(true);
    };

    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        
        if (!statusForm.status || !statusForm.adminComments.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            await updateResignationRequestStatus({ 
                id: selectedRequest._id, 
                data: statusForm 
            }).unwrap();
            toast.success(`Resignation request ${statusForm.status} successfully`);
            setShowStatusModal(false);
            refetchRequests();
        } catch (error) {
            toast.error(error.data?.message || error.message || 'Failed to update request status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'approved': return '✅';
            case 'rejected': return '❌';
            default: return '❓';
        }
    };

    // Termination functions
    const handleTerminate = async (id) => {
        try {
            await terminateEmployee({ id }).unwrap();
            refetchEmployees();
            setConfirmId(null);
            setCheckedAssets({});
            toast.success('Employee terminated successfully');
        } catch (err) {
            console.error("Failed to terminate:", err);
            toast.error('Failed to terminate employee');
        }
    };

    const handleDeleteTerminated = async (id) => {
        try {
            await deleteTerminatedEmployee({ id }).unwrap();
            refetchTerminated();
            setDeleteConfirmId(null);
            toast.success('Terminated employee deleted successfully');
        } catch (err) {
            console.error("Failed to delete:", err);
            toast.error('Failed to delete terminated employee');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Separation Management</h1>
                    <p className="text-gray-600">Manage employee resignation requests and termination</p>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('resignations')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'resignations'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <FaUserTimes className="inline mr-2" />
                                Resignation Requests ({requests.filter(req => req.status === 'pending').length} pending)
                            </button>
                            <button
                                onClick={() => setActiveTab('terminated')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'terminated'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <FaTrash className="inline mr-2" />
                                Terminated Employees ({terminatedEmployees.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'resignations' && (
                    <>
                        {/* Filters for Resignations */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Employee
                                    </label>
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or code..."
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Filter
                                    </label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => handleFilterChange('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Items per page
                                    </label>
                                    <select
                                        value={filters.limit}
                                        onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={() => setFilters({ status: '', search: '', page: 1, limit: 10 })}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Statistics - Resignations Tab */}
                {activeTab === 'resignations' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100">
                                    <span className="text-2xl">⏳</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(req => req.status === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Approved</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(req => req.status === 'approved').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-red-100">
                                    <span className="text-2xl">❌</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(req => req.status === 'rejected').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics - Terminated Tab */}
                {activeTab === 'terminated' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                                    <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-red-100">
                                    <span className="text-2xl">🚫</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Terminated Employees</p>
                                    <p className="text-2xl font-bold text-gray-900">{terminatedEmployees.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Active Employees</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {employees.filter(emp => emp.Empstatus === 'active').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tables */}
                {activeTab === 'resignations' && (
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Resignation Requests</h3>
                        </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading requests...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">No resignation requests found</p>
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
                                            Department
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Resignation Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Working Date
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
                                    {requests.map((request, index) => (
                                        <motion.tr
                                            key={request._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {request.employeeId?.avatar ? (
                                                            <img className="h-10 w-10 rounded-full" src={request.employeeId.avatar} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {request.employeeName?.charAt(0)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {request.employeeName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.employeeCode}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{request.department}</div>
                                                <div className="text-sm text-gray-500">{request.designation}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(request.resignationDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(request.lastWorkingDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                    <span className="mr-1">{getStatusIcon(request.status)}</span>
                                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleViewRequest(request._id)}
                                                        className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    {request.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(request)}
                                                            className="text-green-600 hover:text-green-900 transition-colors"
                                                            title="Update Status"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {((pagination.current - 1) * filters.limit) + 1} to {Math.min(pagination.current * filters.limit, pagination.total)} of {pagination.total} results
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleFilterChange('page', pagination.current - 1)}
                                        disabled={pagination.current === 1}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-3 py-1 text-sm text-gray-700">
                                        Page {pagination.current} of {pagination.pages}
                                    </span>
                                    <button
                                        onClick={() => handleFilterChange('page', pagination.current + 1)}
                                        disabled={pagination.current === pagination.pages}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                )}

                {/* Terminated Employees Table */}
                {activeTab === 'terminated' && (
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Employee Termination Management</h3>
                        </div>

                        {empLoading ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading employees...</p>
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
                                                Department
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Designation
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Employee Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Salary
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Assets
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
                                        {employees.map((emp, index) => (
                                            <motion.tr
                                                key={emp._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {emp.avatar ? (
                                                                <img className="h-10 w-10 rounded-full" src={emp.avatar} alt="" />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {emp.fname?.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {emp.fname} {emp.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {emp.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.designation}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.empCode}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ₹{emp.salary?.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {emp.assets?.length > 0 ? (
                                                            <>
                                                                {emp.assets.slice(0, 2).map((asset, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                                                        title={asset}
                                                                    >
                                                                        {asset}
                                                                    </span>
                                                                ))}
                                                                {emp.assets.length > 2 && (
                                                                    <span
                                                                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                                                                        title={emp.assets.slice(2).join(", ")}
                                                                    >
                                                                        +{emp.assets.length - 2} more
                                                                    </span>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-400 text-sm">No assets</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        emp.Empstatus === 'active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {emp.Empstatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {emp.Empstatus === 'active' ? (
                                                        <button
                                                            onClick={() => setConfirmId(emp._id)}
                                                            className="bg-gradient-to-br from-red-400 to-red-700 hover:scale-105 transition transform text-white px-3 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium"
                                                            title="Terminate employee and verify asset return"
                                                        >
                                                            Terminate
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400 flex items-center gap-1">
                                                            <span>✓</span>
                                                            Terminated
                                                        </span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination for Employees */}
                        <Pagination
                            page={page}
                            setPage={setPage}
                            hasNextPage={employees.length === limit}
                        />
                    </div>
                )}

                {/* Terminated Employees List */}
                {activeTab === 'terminated' && terminatedEmployees.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Terminated Employees History</h3>
                        </div>

                        {terminatedLoading ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading terminated employees...</p>
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
                                                Department
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Designation
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Employee Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Termination Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {terminatedEmployees.map((emp, index) => (
                                            <motion.tr
                                                key={emp._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {emp.avatar ? (
                                                                <img className="h-10 w-10 rounded-full" src={emp.avatar} alt="" />
                                                            ) : (
                                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {emp.fname?.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {emp.fname} {emp.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {emp.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.designation}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {emp.empCode}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(emp.terminationDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => setDeleteConfirmId(emp._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination for Terminated Employees */}
                        <Pagination
                            page={terminatedPage}
                            setPage={setTerminatedPage}
                            hasNextPage={terminatedEmployees.length === limit}
                        />
                    </div>
                )}

                {/* View Request Modal */}
                {showModal && selectedRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Resignation Request Details</h3>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.employeeName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Employee Code</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.employeeCode}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Department</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.department}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.designation}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Resignation Date</label>
                                        <p className="text-sm text-gray-900">{new Date(selectedRequest.resignationDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Working Date</label>
                                        <p className="text-sm text-gray-900">{new Date(selectedRequest.lastWorkingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Notice Period</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.noticePeriod} days</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                                            {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Reason for Resignation</label>
                                    <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">{selectedRequest.reason}</p>
                                </div>
                                {selectedRequest.handoverNotes && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Handover Notes</label>
                                        <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">{selectedRequest.handoverNotes}</p>
                                    </div>
                                )}
                                {selectedRequest.adminComments && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Admin Comments</label>
                                        <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">{selectedRequest.adminComments}</p>
                                    </div>
                                )}
                                {selectedRequest.approvedBy && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Processed By</label>
                                        <p className="text-sm text-gray-900">{selectedRequest.approvedBy.fname} {selectedRequest.approvedBy.lastName}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Submitted On</label>
                                    <p className="text-sm text-gray-900">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                                {selectedRequest.status === 'pending' && (
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            handleStatusUpdate(selectedRequest);
                                        }}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        Process Request
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="ml-3 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Update Modal */}
                {showStatusModal && selectedRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Update Request Status</h3>
                                    <button
                                        onClick={() => setShowStatusModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleStatusSubmit} className="px-6 py-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                                    <select
                                        value={statusForm.status}
                                        onChange={(e) => setStatusForm(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Comments *</label>
                                    <textarea
                                        value={statusForm.adminComments}
                                        onChange={(e) => setStatusForm(prev => ({ ...prev, adminComments: e.target.value }))}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Add your comments..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowStatusModal(false)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isUpdating ? 'Updating...' : 'Update Status'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Termination Confirmation Modal */}
                {confirmId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmId(null)} />
                        <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                Asset Return Verification
                            </h3>

                            {(() => {
                                const emp = employees.find((e) => e._id === confirmId);

                                // Initialize checked assets for this employee if not already done
                                if (emp && !checkedAssets[confirmId]) {
                                    setCheckedAssets((prev) => ({
                                        ...prev,
                                        [confirmId]: emp.assets?.map(() => false) || [],
                                    }));
                                }

                                const currentCheckedAssets = checkedAssets[confirmId] || [];
                                const allChecked = currentCheckedAssets.every(Boolean);
                                const hasAssets = emp?.assets?.length > 0;

                                const updateAssetCheck = (index, checked) => {
                                    setCheckedAssets((prev) => ({
                                        ...prev,
                                        [confirmId]:
                                            prev[confirmId]?.map((item, i) =>
                                                i === index ? checked : item
                                            ) || [],
                                    }));
                                };

                                return (
                                    <>
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {emp?.fname?.charAt(0)?.toUpperCase() || "E"}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">
                                                        {emp?.fname || "N/A"}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {emp?.designation || "N/A"} •{" "}
                                                        {emp?.department || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Emp Code:</span>{" "}
                                                {emp?.empCode || "N/A"}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="font-medium text-gray-800 mb-3">
                                                Verify Asset Return ({emp?.assets?.length || 0} assets)
                                            </h4>
                                            {hasAssets ? (
                                                <div className="space-y-2">
                                                    {emp.assets.map((asset, index) => (
                                                        <label
                                                            key={index}
                                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={currentCheckedAssets[index] || false}
                                                                onChange={(e) =>
                                                                    updateAssetCheck(index, e.target.checked)
                                                                }
                                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            />
                                                            <span className="text-sm text-gray-700">{asset}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">
                                                    No assets assigned to this employee
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setConfirmId(null)}
                                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleTerminate(confirmId)}
                                                disabled={hasAssets && !allChecked}
                                                className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                                                    hasAssets && !allChecked
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-gradient-to-br from-red-400 to-red-700 hover:from-red-500 hover:to-red-800"
                                                }`}
                                            >
                                                {hasAssets && !allChecked
                                                    ? "Verify Assets First"
                                                    : "Confirm Termination"}
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirmId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteConfirmId(null)} />
                        <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                            <h3 className="text-xl font-bold text-red-600 mb-4 text-center">
                                Delete Terminated Employee
                            </h3>
                            <p className="text-gray-600 mb-6 text-center">
                                Are you sure you want to permanently delete this terminated employee record? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteTerminated(deleteConfirmId)}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Permanently
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminESeparation;
