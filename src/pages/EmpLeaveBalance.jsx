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
     <div className="p-10 ">
     <div className=" text-black text-xl border-2 border-gray-400 font-semibold mx-10 px-6 py-4 rounded-t-lg shadow-md text-center">  
        Employee Leave Balance
      </div>
     <form onSubmit={handleSubmit} className="space-y-6 px-20 mx-10 border-1 border-gray-400 rounded-b-xl" >
        <div>
          <label htmlFor="employee" className="block font-medium mt-6 mb-1">
            Employee
          </label>
          <select
            id="employee"
            value={form.employee}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          >
            <option  value="">Select an Employee</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="alice">Alice Johnson</option>
          </select>
        </div>

        <div>
          <label htmlFor="leaveType" className="block font-medium mb-1">
            Leave Type
          </label>
          <select
            id="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2 bg-slate-50 focus:outline-none  focus:ring-1 focus:ring-purple-500"
            required
          >
            <option value="full hover:bg-purple-400">Full-Day</option>
            <option value="half hover:bg-purple-400">Half-Day</option>
          </select>
        </div>

        <div>
          <label htmlFor="action" className="block font-medium mb-1">
            Action
          </label>
          <select
            id="action"
            value={form.action}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          >
            <option value="increase">Increase</option>
            <option value="decrease">Decrease</option>
          </select>
        </div>

        <div>
          <label htmlFor="days" className="block font-medium mb-1">
            Days
          </label>
          <input
            type="number"
            id="days"
            min="0"
            step="0.5"
            value={form.days}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-md p-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 mx-64 my-3  text-white px-2 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Update Leave Balance
        </button>
      </form>
    </div>
  )
}

export default EmpLeaveBalance