import React, { useState } from 'react';
import { useGetAllEmpDataQuery, useAddEmpDataMutation } from '@/service/EmpData.services';
import { IoIosClose } from 'react-icons/io';

const EmpDashboard = () => {
  const { data, refetch, isLoading } = useGetAllEmpDataQuery();
  const [addEmpData] = useAddEmpDataMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    department: '',
    designation: '',
    empCode: '',
    salary: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmpData(formData).unwrap();
      setFormData({ fname: '', department: '', designation: '', empCode: '', salary: '', date: '' });
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const employees = data?.data || [];

  if (isLoading) return <p className="text-center py-10">Loading employees…</p>;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employees</h2>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md w-fit"
        >
          ADD EMPLOYEE
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-xl shadow-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <IoIosClose size={32} />
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Employee</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="fname" placeholder="Full Name" value={formData.fname} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="empCode" placeholder="Employee Code" value={formData.empCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              <div className="flex justify-end space-x-2">

                <button type="submit" className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md w-fit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto scrollbar-visible shadow-lg rounded-t-sm md:rounded-t-lg">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-[600] uppercase">
            <tr>
              <th className="px-2 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-left">Department</th>
              <th className="px-2 py-3 text-left">Designation</th>
              <th className="px-2 py-3 text-left">Emp Code</th>
              <th className="px-2 py-3 text-left">Salary</th>
              <th className="px-2 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp._id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className="p-3 px-2">{emp.fname}</td>
                <td className="p-3 px-2">{emp.department}</td>
                <td className="p-3 px-2">{emp.designation}</td>
                <td className="p-3 px-2">{emp.empCode}</td>
                <td className="p-3 px-2">{emp.salary}</td>
                <td className="p-3 px-2">{new Date(emp.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpDashboard;
