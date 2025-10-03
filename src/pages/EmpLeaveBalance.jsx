import React from "react";
import Select from "react-select";
import { useFormik } from "formik";
import EmpLeaveSchema from "@/Validation/EmpLeaveBalance/EmpLeaveSchema";
import {
  useGetAllEmpDataQuery,
  useUpdateEmpDataMutation,
} from "@/service/EmpData.services";

const EmpLeaveBalance = () => {
  const { data: empResponse = {}, isLoading } = useGetAllEmpDataQuery();
  const employees = empResponse.data || [];

  const [updateEmpData] = useUpdateEmpDataMutation();

  const leaveTypes = [
    { value: "full", label: "Full-Day" },
    { value: "half", label: "Half-Day" },
  ];

  const actions = [
    { value: "increase", label: "Increase" },
    { value: "decrease", label: "Decrease" },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#8B5CF6" : "#E9D5FF",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(139, 92, 246, 0.4)" : "none",
      padding: "2px 4px",
      fontSize: "0.95rem",
      transition: "all 0.2s ease-in-out",
      "&:hover": { borderColor: "#8B5CF6" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#C084FC"
        : state.isFocused
        ? "#E9D5FF"
        : "white",
      color: "black",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      marginTop: "4px",
    }),
    singleValue: (base) => ({ ...base, color: "#111827" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const formik = useFormik({
    initialValues: {
      employee: null,
      leaveType: null,
      action: null,
      days: "",
    },
    validationSchema: EmpLeaveSchema,
    onSubmit: async (values) => {
      try {
        const empId = values.employee.value;
        const leaveField =
          values.leaveType.value === "full"
            ? "fullDayLeavesThisMonth"
            : "halfDayLeavesThisMonth";
        const change = parseFloat(values.days);
        const isIncrement = values.action.value === "increase" ? 1 : -1;

        const selectedEmp = employees.find((e) => e._id === empId);
        const current = selectedEmp?.[leaveField] || 0;
        const newCount = Math.max(current + isIncrement * change, 0);

        // ✅ Use RTK Query to update
        await updateEmpData({
          id: empId,
          [leaveField]: newCount,
        }).unwrap();

        alert("Leave balance updated successfully!");
        formik.resetForm();
      } catch (err) {
        console.error("Update failed:", err);
        alert("Something went wrong, check console.");
      }
    },
  });

  if (isLoading) return <p>Loading employees...</p>;

  const employeeOptions = employees.map((emp) => ({
    value: emp._id,
    label: emp.fname || "Unnamed",
  }));

  return (
    <div className="bg-gray-100 flex items-center justify-center pt-20 md:pt-10 p-5">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Employee Leave Balance
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Employee
            </label>
            <Select
              name="employee"
              options={employeeOptions}
              value={formik.values.employee}
              onChange={(value) => formik.setFieldValue("employee", value)}
              onBlur={() => formik.setFieldTouched("employee", true)}
              styles={customSelectStyles}
              placeholder="Select an Employee"
            />
            {formik.touched.employee && formik.errors.employee && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.employee}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <Select
              name="leaveType"
              options={leaveTypes}
              value={formik.values.leaveType}
              onChange={(value) => formik.setFieldValue("leaveType", value)}
              onBlur={() => formik.setFieldTouched("leaveType", true)}
              styles={customSelectStyles}
              placeholder="Select Leave Type"
            />
            {formik.touched.leaveType && formik.errors.leaveType && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.leaveType}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Action
            </label>
            <Select
              name="action"
              options={actions}
              value={formik.values.action}
              onChange={(value) => formik.setFieldValue("action", value)}
              onBlur={() => formik.setFieldTouched("action", true)}
              styles={customSelectStyles}
              placeholder="Select Action"
            />
            {formik.touched.action && formik.errors.action && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.action}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="days"
              className="block font-medium text-gray-700 mb-2"
            >
              Days
            </label>
            <input
              type="number"
              id="days"
              name="days"
              min="0"
              step="0.5"
              value={formik.values.days}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-400 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            {formik.touched.days && formik.errors.days && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.days}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Update Leave Balance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpLeaveBalance;
