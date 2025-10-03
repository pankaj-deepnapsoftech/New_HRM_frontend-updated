// src/components/TerminatedEmp.jsx
import React, { useState } from "react";
import {
  useGetAllEmpDataQuery,
  useTerminateEmployeeMutation,
  useGetAllTerminatedEmployeesQuery,
  useDeleteTerminatedEmployeeMutation,
} from "@/service/EmpData.services";
import Pagination from "./Pagination/Pagination";

const TerminatedEmp = () => {
  const [page, setPage] = useState(1); // Pagination for active employees
  const [terminatedPage, setTerminatedPage] = useState(1); // Pagination for terminated employees
  const limit = 10; // Limit for both tables
  const [confirmId, setConfirmId] = useState(null); // For terminate confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // For delete confirmation
  const [showTerminatedModal, setShowTerminatedModal] = useState(false); // Modal state

  // Fetch active employees
  const { data, isLoading, refetch } = useGetAllEmpDataQuery({ page, limit });
  const employees = data?.data || [];

  // Fetch terminated employees (only when modal is open)
  const {
    data: terminatedData,
    isLoading: terminatedLoading,
    refetch: refetchTerminated,
  } = useGetAllTerminatedEmployeesQuery(
    { page: terminatedPage, limit },
    { skip: !showTerminatedModal } // Skip fetch if modal is closed
  );
  const terminatedEmployees = terminatedData?.data || [];

  const [terminateEmployee] = useTerminateEmployeeMutation();
  const [deleteTerminatedEmployee] = useDeleteTerminatedEmployeeMutation();

  // Handle terminate action
  const handleTerminate = async (id) => {
    try {
      await terminateEmployee({ id }).unwrap();
      refetch(); // Refresh active employees table
      setConfirmId(null);
    } catch (err) {
      console.error("Failed to terminate:", err);
    }
  };

  // Handle delete terminated employee
  const handleDeleteTerminated = async (id) => {
    try {
      await deleteTerminatedEmployee({ id }).unwrap();
      refetchTerminated(); // Refresh terminated employees table
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading employees…</p>;

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-center text-xl font-semibold py-4 rounded-xl shadow-md shadow-gray-400 mb-10">
        Employee Management
      </div>

      {/* Button to view terminated employees */}
      <div className="mb-4">
        <button
          onClick={() => setShowTerminatedModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          View Terminated Employees
        </button>
      </div>

      {/* Table for active employees */}
      <div className="overflow-x-auto scrollbar-visible shadow-md rounded-sm md:rounded-xl">
        <table className="w-full md:min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Emp-Code</th>
              <th className="py-3 px-4 text-left">Salary</th>
              <th className="py-3 px-4 text-left">Assets</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Terminate</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {employees.map((emp, index) => (
              <tr
                key={emp._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-3 px-4">{emp.fname || "N/A"}</td>
                <td className="py-3 px-4">{emp.department || "N/A"}</td>
                <td className="py-3 px-4">{emp.designation || "N/A"}</td>
                <td className="py-3 px-4">{emp.empCode || "N/A"}</td>
                <td className="py-3 px-4">{emp.salary || "N/A"}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 flex-wrap">
                    {emp.assets?.length > 0 ? (
                      emp.assets.map((asset, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-2 rounded-full"
                        >
                          {asset}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {emp.Empstatus === "Terminated" ? (
                    <span className="text-red-500 bg-red-100 rounded-full py-1 px-2 font-semibold text-sm">
                      Terminated
                    </span>
                  ) : (
                    <span className="text-green-500 bg-green-100 rounded-full py-1 px-2 font-semibold text-sm">
                      Active
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {(emp.Empstatus ?? "active") === "active" ? (
                    <button
                      onClick={() => setConfirmId(emp._id)}
                      className="bg-gradient-to-br from-red-400 to-red-700 hover:scale-105 transition transform text-white px-2 py-1 rounded-sm shadow-md"
                    >
                      Terminate
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation modal for terminate */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirmId(null)}
          />
          <div className="relative bg-white rounded-md shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Termination
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to terminate this employee?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleTerminate(confirmId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for terminated employees */}
      {showTerminatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowTerminatedModal(false)} />
          <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Terminated Employees</h3>
            {terminatedLoading ? (
              <p className="text-center py-10">Loading terminated employees…</p>
            ) : terminatedEmployees.length === 0 ? (
              <p className="text-center py-10">No terminated employees found.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white">
                    <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
                      <tr>
                        <th className="py-3 px-4 text-left">Full Name</th>
                        <th className="py-3 px-4 text-left">Department</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Emp-Code</th>
                        <th className="py-3 px-4 text-left">Salary</th>
                        <th className="py-3 px-4 text-left">Termination Date</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {terminatedEmployees.map((emp, index) => (
                        <tr key={emp._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="py-3 px-4">{emp.fname || "N/A"}</td>
                          <td className="py-3 px-4">{emp.department || "N/A"}</td>
                          <td className="py-3 px-4">{emp.designation || "N/A"}</td>
                          <td className="py-3 px-4">{emp.empCode || "N/A"}</td>
                          <td className="py-3 px-4">{emp.salary || "N/A"}</td>
                          <td className="py-3 px-4">{new Date(emp.terminationDate).toLocaleDateString() || "N/A"}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => setDeleteConfirmId(emp._id)}
                              className="bg-red-500 text-white px-2 py-1 rounded shadow-md hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={terminatedPage}
                  setPage={setTerminatedPage}
                  hasNextPage={terminatedEmployees.length === limit}
                />
              </>
            )}
            <button
              onClick={() => setShowTerminatedModal(false)}
              className="mt-4 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation modal for delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative bg-white rounded-md shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this terminated employee? This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTerminated(deleteConfirmId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={employees.length === 10}
      />
    </div>
  );
};

export default TerminatedEmp;