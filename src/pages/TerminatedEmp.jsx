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
  const [page, setPage] = useState(1);
  const [terminatedPage, setTerminatedPage] = useState(1);
  const limit = 10;
  const [confirmId, setConfirmId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showTerminatedModal, setShowTerminatedModal] = useState(false);
  const [checkedAssets, setCheckedAssets] = useState({});

  const { data, isLoading, refetch } = useGetAllEmpDataQuery({ page, limit });
  const employees = data?.data || [];

  const {
    data: terminatedData,
    isLoading: terminatedLoading,
    refetch: refetchTerminated,
  } = useGetAllTerminatedEmployeesQuery(
    { page: terminatedPage, limit },
    { skip: !showTerminatedModal }
  );
  const terminatedEmployees = terminatedData?.data || [];

  const [terminateEmployee] = useTerminateEmployeeMutation();
  const [deleteTerminatedEmployee] = useDeleteTerminatedEmployeeMutation();

  const handleTerminate = async (id) => {
    try {
      await terminateEmployee({ id }).unwrap();
      refetch();
      setConfirmId(null);
      setCheckedAssets({});
    } catch (err) {
      console.error("Failed to terminate:", err);
    }
  };

  const handleDeleteTerminated = async (id) => {
    try {
      await deleteTerminatedEmployee({ id }).unwrap();
      refetchTerminated();
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

      <div className="mb-4">
        <button
          onClick={() => setShowTerminatedModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          View Terminated Employees
        </button>
      </div>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setConfirmId(null)}
          />
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
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      Assets to Return
                      {/* {hasAssets && (
                        <span className="text-sm font-normal text-gray-500">
                          ({currentCheckedAssets.filter(Boolean).length}/
                          {emp.assets.length} returned)
                        </span>
                      )} */}
                    </h4>

                    {hasAssets ? (
                      <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50">
                        {emp.assets.map((asset, i) => (
                          <label
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              currentCheckedAssets[i]
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={currentCheckedAssets[i] || false}
                              onChange={(e) =>
                                updateAssetCheck(i, e.target.checked)
                              }
                              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                            />
                            <div className="flex-1">
                              <span className="font-medium text-gray-800">
                                {asset}
                              </span>
                              {currentCheckedAssets[i] && (
                                <span className="ml-2 text-green-600 text-sm">
                                  ✓ Returned
                                </span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        {/* <div className="text-2xl mb-2">📝</div> */}
                        <p className="text-sm">
                          No assets assigned to this employee
                        </p>
                      </div>
                    )}
                  </div>

                  {/* {hasAssets && !allChecked && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <div className="text-yellow-600 text-lg">⚠️</div>
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            Action Required
                          </p>
                          <p className="text-sm text-yellow-700">
                            Please confirm that all assets have been returned
                            before proceeding with termination.
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {/* {(!hasAssets || allChecked) && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <div className="text-green-600 text-lg">✅</div>
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Ready for Termination
                          </p>
                          <p className="text-sm text-green-700">
                            {hasAssets
                              ? "All assets have been returned."
                              : "No assets to return."}
                            You can now proceed with the termination.
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setConfirmId(null);
                        setCheckedAssets((prev) => {
                          const { [confirmId]: removed, ...rest } = prev;
                          return rest;
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={hasAssets && !allChecked}
                      onClick={() => handleTerminate(confirmId)}
                      className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-all ${
                        !hasAssets || allChecked
                          ? "bg-red-600 hover:bg-red-700 hover:scale-105"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {hasAssets && !allChecked
                        ? "Return Assets First"
                        : "Terminate Employee"}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Modal for terminated employees */}
      {showTerminatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowTerminatedModal(false)}
          />
          <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Terminated Employees
            </h3>
            {terminatedLoading ? (
              <p className="text-center py-10">Loading terminated employees…</p>
            ) : terminatedEmployees.length === 0 ? (
              <p className="text-center py-10">
                No terminated employees found.
              </p>
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
                        <th className="py-3 px-4 text-left">
                          Termination Date
                        </th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {terminatedEmployees.map((emp, index) => (
                        <tr
                          key={emp._id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="py-3 px-4">{emp.fname || "N/A"}</td>
                          <td className="py-3 px-4">
                            {emp.department || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {emp.designation || "N/A"}
                          </td>
                          <td className="py-3 px-4">{emp.empCode || "N/A"}</td>
                          <td className="py-3 px-4">{emp.salary || "N/A"}</td>
                          <td className="py-3 px-4">
                            {new Date(
                              emp.terminationDate
                            ).toLocaleDateString() || "N/A"}
                          </td>
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
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-md shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this terminated employee? This
              action cannot be undone.
            </p>
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
