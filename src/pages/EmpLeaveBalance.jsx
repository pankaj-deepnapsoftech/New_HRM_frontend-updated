import React, { useState } from 'react';
import Select from 'react-select';

const EmpLeaveBalance = () => {
  const [form, setForm] = useState({
    employee: "",
    leaveType: { value: "full", label: "Full-Day" },
    action: { value: "increase", label: "Increase" },
    days: "",
  });

  const employees = [
    { value: "john", label: "John Doe" },
    { value: "jane", label: "Jane Smith" },
    { value: "alice", label: "Alice Johnson" },
  ];

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
    transition: "all 0.2s ease-in-out", // smoother interaction
    '&:hover': {
      borderColor: "#8B5CF6", // purple border on hover
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#C084FC" // selected
      : state.isFocused
      ? "#E9D5FF" // hovered
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
  singleValue: (base) => ({
    ...base,
    color: "#111827", // gray-900
  }),
  indicatorSeparator: () => ({
    display: "none", // removes the vertical divider between input and dropdown icon
  }),
};


  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm({ ...form, [actionMeta.name]: selectedOption });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Leave balance ${form.action.value}d for ${form.employee.label} (${form.leaveType.label}) by ${form.days} days.`
    );
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center pt-20 md:pt-10 p-5">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Employee Leave Balance
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Employee
            </label>
            <Select
              name="employee"
              options={employees}
              value={form.employee}
              onChange={handleSelectChange}
              styles={customSelectStyles}
              placeholder="Select an Employee"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <Select
              name="leaveType"
              options={leaveTypes}
              value={form.leaveType}
              onChange={handleSelectChange}
              styles={customSelectStyles}
              placeholder="Select Leave Type"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Action
            </label>
            <Select
              name="action"
              options={actions}
              value={form.action}
              onChange={handleSelectChange}
              styles={customSelectStyles}
              placeholder="Select Action"
            />
          </div>

          <div>
            <label htmlFor="days" className="block font-medium text-gray-700 mb-2">
              Days
            </label>
            <input
              type="number"
              id="days"
              min="0"
              step="0.5"
              value={form.days}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-tl from-gray-600 to-gray-700 hover:bg-gradient-to-br text-white font-semibold px-6 py-3 rounded-lg transition"
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
