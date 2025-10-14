import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SuperAdminServices from '../service/SuperAdmin.services.js';

const SuperAdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [adminsData, setAdminsData] = useState(null);
    const [employeesData, setEmployeesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Employee pagination and filters
    const [employeeFilters, setEmployeeFilters] = useState({
        page: 1,
        limit: 10,
        status: '',
        department: '',
        search: ''
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    useEffect(() => {
        if (activeTab === 'employees') {
            loadEmployeesData();
        } else if (activeTab === 'admins') {
            loadAdminsData();
        }
    }, [activeTab, employeeFilters]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const response = await SuperAdminServices.getDashboardData();
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            toast.error(error.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const loadAdminsData = async () => {
        try {
            setLoading(true);
            const response = await SuperAdminServices.getAllAdmins();
            setAdminsData(response.data);
        } catch (error) {
            console.error('Error loading admins data:', error);
            toast.error(error.message || 'Failed to load admins data');
        } finally {
            setLoading(false);
        }
    };

    const loadEmployeesData = async () => {
        try {
            setLoading(true);
            const response = await SuperAdminServices.getAllEmployees(employeeFilters);
            setEmployeesData(response.data);
        } catch (error) {
            console.error('Error loading employees data:', error);
            toast.error(error.message || 'Failed to load employees data');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setEmployeeFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 // Reset to first page when filters change
        }));
    };

    const handlePageChange = (newPage) => {
        setEmployeeFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const StatCard = ({ title, value, icon, color = "blue" }) => (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`text-${color}-500 text-3xl`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    const OverviewTab = () => {
        if (!dashboardData) return <div>Loading...</div>;

        const { overview, recentEmployees, departmentDistribution, designationDistribution } = dashboardData;

        return (
            <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Admins"
                        value={overview.totalAdmins}
                        icon="👥"
                        color="blue"
                    />
                    <StatCard
                        title="Super Admins"
                        value={overview.totalSuperAdmins}
                        icon="👑"
                        color="purple"
                    />
                    <StatCard
                        title="Total Employees"
                        value={overview.totalEmployees}
                        icon="👤"
                        color="green"
                    />
                    <StatCard
                        title="Active Employees"
                        value={overview.activeEmployees}
                        icon="✅"
                        color="green"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Employees */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Employees</h3>
                        <div className="space-y-3">
                            {recentEmployees.map((employee, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {employee.fname} {employee.lastName}
                                        </p>
                                        <p className="text-sm text-gray-600">{employee.designation}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{employee.department}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(employee.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Department Distribution */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Departments</h3>
                        <div className="space-y-3">
                            {departmentDistribution.map((dept, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{dept._id || 'Unknown'}</p>
                                        <p className="text-sm text-gray-600">{dept.active} active</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{dept.count}</p>
                                        <p className="text-xs text-gray-500">total</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const AdminsTab = () => {
        if (!adminsData) return <div>Loading...</div>;

        const { admins, totalAdmins, subscribedAdmins, trialAdmins, inactiveAdmins, totalEmployees, activeEmployees, inactiveEmployees } = adminsData;

        // Local filters for Admins
        const [adminSearch, setAdminSearch] = useState("");
        const [adminStatus, setAdminStatus] = useState(""); // '', 'subscribed', 'trial', 'inactive'
        const [adminPage, setAdminPage] = useState(1);
        const adminPageSize = 10;

        const normalized = (v) => (v || "").toString().toLowerCase();
        const filteredAdmins = admins.filter((a) => {
            const hay = `${normalized(a.fullName)} ${normalized(a.username)} ${normalized(a.email)}`;
            const matchesSearch = normalized(adminSearch) ? hay.includes(normalized(adminSearch)) : true;
            const status = a.subscription?.isSubscribed
                ? 'subscribed'
                : (a.subscription?.onTrial ? 'trial' : 'inactive');
            const matchesStatus = adminStatus ? status === adminStatus : true;
            return matchesSearch && matchesStatus;
        });

        // Reset to first page when filters change
        useEffect(() => {
            setAdminPage(1);
        }, [adminSearch, adminStatus]);

        const totalAdminPages = Math.max(1, Math.ceil(filteredAdmins.length / adminPageSize));
        const pageStartIdx = (adminPage - 1) * adminPageSize;
        const pagedAdmins = filteredAdmins.slice(pageStartIdx, pageStartIdx + adminPageSize);

        return (
            <div className="space-y-6">
                {/* Admin Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Admins"
                        value={totalAdmins}
                        icon="👥"
                        color="blue"
                    />
                    <StatCard
                        title="Subscribed Admins"
                        value={subscribedAdmins}
                        icon="✅"
                        color="green"
                    />
                    <StatCard
                        title="On Free Trial"
                        value={trialAdmins}
                        icon="🆓"
                        color="purple"
                    />
                    <StatCard
                        title="Inactive Admins"
                        value={inactiveAdmins}
                        icon="⛔"
                        color="red"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search Admins</label>
                            <input
                                type="text"
                                placeholder="Search by name, username or email"
                                value={adminSearch}
                                onChange={(e) => setAdminSearch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Status</label>
                            <select
                                value={adminStatus}
                                onChange={(e) => setAdminStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All</option>
                                <option value="subscribed">Subscribed</option>
                                <option value="trial">On Trial</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Admins List */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">All Admins</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Admin Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee Stats
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pagedAdmins.map((admin, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {admin.fullName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    @{admin.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{admin.email}</div>
                                            <div className="text-sm text-gray-500">{admin.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-4">
                                                <div className="text-center">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {admin.employeeStats.total}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Total</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-medium text-green-600">
                                                        {admin.employeeStats.active}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Active</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-medium text-red-600">
                                                        {admin.employeeStats.inactive}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Inactive</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(admin.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {admin.subscription?.isSubscribed ? (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Subscribed</span>
                                            ) : admin.subscription?.onTrial ? (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Trial</span>
                                            ) : (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                                            )}
                                            {admin.subscription?.trialEndsAt && (
                                                <div className="text-xs text-gray-500 mt-1">Trial ends: {new Date(admin.subscription.trialEndsAt).toLocaleDateString()}</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Page {adminPage} of {totalAdminPages} — Showing {pagedAdmins.length} of {filteredAdmins.length}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                                disabled={adminPage <= 1}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setAdminPage((p) => Math.min(totalAdminPages, p + 1))}
                                disabled={adminPage >= totalAdminPages}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EmployeesTab = () => {
        if (!employeesData) return <div>Loading...</div>;

        const { employees, pagination, departmentStats, summary } = employeesData;

        return (
            <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={employeeFilters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={employeeFilters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                value={employeeFilters.department}
                                onChange={(e) => handleFilterChange('department', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Departments</option>
                                {departmentStats.map((dept, index) => (
                                    <option key={index} value={dept._id}>
                                        {dept._id} ({dept.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Per Page</label>
                            <select
                                value={employeeFilters.limit}
                                onChange={(e) => handleFilterChange('limit', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Employee Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Employees"
                        value={summary.total}
                        icon="👤"
                        color="blue"
                    />
                    <StatCard
                        title="Active Employees"
                        value={summary.active}
                        icon="✅"
                        color="green"
                    />
                    <StatCard
                        title="Inactive Employees"
                        value={summary.inactive}
                        icon="❌"
                        color="red"
                    />
                </div>

                {/* Employees Table */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">All Employees</h3>
                        <div className="text-sm text-gray-500">
                            Showing {employees.length} of {pagination.totalEmployees}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Salary
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.map((employee, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {employee.avatar ? (
                                                        <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {employee.fname?.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {employee.fname} {employee.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {employee.empCode}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{employee.email}</div>
                                            <div className="text-sm text-gray-500">{employee.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{employee.department}</div>
                                            <div className="text-sm text-gray-500">{employee.designation}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ₹{employee.salary?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                employee.Empstatus === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {employee.Empstatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrev}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.hasNext}
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading && !dashboardData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="hidden md:block w-64 shrink-0 bg-white rounded-lg border border-gray-200 h-[75vh] sticky top-6">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold">Modules</h2>
                            <p className="text-sm text-gray-500">Quick navigation</p>
                        </div>
                        <nav className="p-2">
                            {[
                                { id: 'overview', name: 'Overview', icon: '📊' },
                                { id: 'admins', name: 'Admins', icon: '👥' },
                                { id: 'employees', name: 'Employees', icon: '👤' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md mb-1 ${
                                        activeTab === item.id
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
                            <p className="mt-2 text-gray-600">Manage all admins and employees across the organization</p>
                        </div>

                        {/* Content by active module */}
                        <div>
                            {activeTab === 'overview' && <OverviewTab />}
                            {activeTab === 'admins' && <AdminsTab />}
                            {activeTab === 'employees' && <EmployeesTab />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;



