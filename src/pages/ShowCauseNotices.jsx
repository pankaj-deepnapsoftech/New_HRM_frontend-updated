import React, { useState } from "react";
import { useGetAllEmpDataWithoutPaginatioQuery } from "@/service/EmpData.services";
import { useGetAllTermsStatusQuery, useSendTermsReminderMutation } from "@/service/TermsAndConditions.services";
import { FaCheckCircle, FaTimesCircle, FaUser, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ShowCauseNotices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: employeesData, isLoading, error } = useGetAllEmpDataWithoutPaginatioQuery();
  const { data: termsStatusData, isLoading: termsLoading, error: termsError } = useGetAllTermsStatusQuery();
  const [sendTermsReminder, { isLoading: reminderLoading }] = useSendTermsReminderMutation();

  const getTermsStatus = (employeeId) => {
    if (!termsStatusData?.data) {
      return { submitted: false, submittedAt: null, version: "1.0" };
    }
    
    const employeeTerms = termsStatusData.data.find(emp => emp.employeeId === employeeId);
    return employeeTerms?.termsStatus || { submitted: false, submittedAt: null, version: "1.0" };
  };

  const filteredEmployees = employeesData?.data?.filter(emp => {
    const fullName = `${emp.fname || ''} ${emp.lastName || ''}`.trim();
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.empCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const termsStatus = getTermsStatus(emp.empCode);
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "submitted" && termsStatus.submitted) ||
                         (statusFilter === "not_submitted" && !termsStatus.submitted);
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleSendReminder = async (employeeId, employeeName) => {
    try {
      const result = await sendTermsReminder(employeeId).unwrap();
      toast.success(result.message || `Reminder sent to ${employeeName} for terms and conditions submission`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send reminder");
    }
  };

  if (isLoading || termsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading employees and terms data...</div>
      </div>
    );
  }

  if (error || termsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-6 rounded-xl shadow-lg mb-6">
          <div className="flex items-center gap-4">
            <FaUser className="text-3xl" />
            <div>
              <h1 className="text-2xl font-bold">Employee Terms & Conditions Status</h1>
              <p className="text-blue-100 mt-1">Track which employees have submitted their terms and conditions</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Employee</label>
              <input
                type="text"
                placeholder="Search by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Employees</option>
                <option value="submitted">Submitted</option>
                <option value="not_submitted">Not Submitted</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                Total: {filteredEmployees.length} employees
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terms Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee, index) => {
                  const termsStatus = getTermsStatus(employee.empCode);
                  return (
                    <tr key={employee._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {(employee.fname || "").trim()} {employee.lastName || ""}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FaBuilding className="h-4 w-4 text-gray-400 mr-2" />
                          {employee.department || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.empCode || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          termsStatus.submitted 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {termsStatus.submitted ? (
                            <>
                              <FaCheckCircle className="w-3 h-3 mr-1" />
                              Submitted
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="w-3 h-3 mr-1" />
                              Not Submitted
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {termsStatus.submitted ? (
                          <div className="flex items-center">
                            <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                            {new Date(termsStatus.submittedAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!termsStatus.submitted && (
                          <button
                            onClick={() => handleSendReminder(employee.empCode, `${employee.fname || ''} ${employee.lastName || ''}`.trim())}
                            disabled={reminderLoading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-xs transition-colors duration-200"
                          >
                            {reminderLoading ? "Sending..." : "Send Reminder"}
                          </button>
                        )}
                        {termsStatus.submitted && (
                          <span className="text-green-600 text-xs">Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FaUser className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employeesData?.data?.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Submitted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employeesData?.data?.filter(emp => getTermsStatus(emp.employeeId).submitted).length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <FaTimesCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Not Submitted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employeesData?.data?.filter(emp => !getTermsStatus(emp.employeeId).submitted).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCauseNotices;
