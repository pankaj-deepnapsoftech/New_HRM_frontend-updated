import React, { useState } from 'react'

const EmpLeaveBalance = () => {
  const [form, setForm] = useState({
    employee: "",
    leaveType: "full",
    action: "increase",
    days: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Leave balance ${form.action}d for ${form.employee} (${form.leaveType}) by ${form.days} days.`
    );
  };
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Employee Leave Balance
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="employee" className="block font-medium text-gray-700 mb-2">
              Employee
            </label>
            <select
              id="employee"
              value={form.employee}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            >
              <option value="">Select an Employee</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="alice">Alice Johnson</option>
            </select>
          </div>

          <div>
            <label htmlFor="leaveType" className="block font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              id="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="full">Full-Day</option>
              <option value="half">Half-Day</option>
            </select>
          </div>

          <div>
            <label htmlFor="action" className="block font-medium text-gray-700 mb-2">
              Action
            </label>
            <select
              id="action"
              value={form.action}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            >
              <option value="increase">Increase</option>
              <option value="decrease">Decrease</option>
            </select>
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
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Update Leave Balance
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default EmpLeaveBalance