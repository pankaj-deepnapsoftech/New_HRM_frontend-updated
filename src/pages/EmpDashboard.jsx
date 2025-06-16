import React, { useState } from "react";
import {
  useGetAllEmpDataQuery,
  useAddEmpDataMutation,
  useUpdateEmpDataMutation,
  useDeleteEmpDataMutation,
} from "@/service/EmpData.services";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const EmpDashboard = () => {
  const { data, refetch, isLoading } = useGetAllEmpDataQuery();
  const [addEmpData] = useAddEmpDataMutation();
  const [updateEmpData] = useUpdateEmpDataMutation();
  const [deleteEmpData] = useDeleteEmpDataMutation();

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    department: "",
    designation: "",
    empCode: "",
    salary: "",
    date: "",
    location: "",
    email: "", // ✅ Only in form
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedEmployee) {
        await updateEmpData({ id: selectedEmployee._id, ...formData }).unwrap();
      } else {
        await addEmpData(formData).unwrap();
      }
      setFormData({
        fname: "",
        department: "",
        designation: "",
        empCode: "",
        salary: "",
        date: "",
        location: "",
        email: "", // ✅ Clear too
      });
      setShowModal(false);
      setEditMode(false);
      setSelectedEmployee(null);
      refetch();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmpData(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const employees = data?.data || [];

  if (isLoading) return <p className="text-center py-10">Loading employees…</p>;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employee Dashboard</h2>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
            setFormData({
              fname: "",
              department: "",
              designation: "",
              empCode: "",
              salary: "",
              date: "",
              location: "",
              email: "", // ✅ Reset
            });
          }}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
        >
          ADD EMPLOYEE DETAILS
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded">
        <table className="w-full min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Emp Code</th>
              <th className="p-3 text-left">Salary</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={emp._id}
                className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="p-3 px-2">{emp.fname}</td>
                <td className="p-3 px-2">{emp.department}</td>
                <td className="p-3 px-2">{emp.designation}</td>
                <td className="p-3 px-2">{emp.empCode}</td>
                <td className="p-3 px-2">{emp.salary}</td>
                <td className="p-3 px-2">{emp.location || "NA"}</td>
                <td className="p-3 px-2">
                  {new Date(emp.date).toLocaleDateString()}
                </td>
                <td className="p-3 px-2 flex gap-3 text-lg">
                  <FaEye
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setShowViewModal(true);
                    }}
                    className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                    title="View"
                  />
                  <FaEdit
                    onClick={() => {
                      setEditMode(true);
                      setFormData({
                        fname: emp.fname,
                        department: emp.department,
                        designation: emp.designation,
                        empCode: emp.empCode,
                        salary: emp.salary,
                        date: emp.date.split("T")[0],
                        location: emp.location || "",
                        email: emp.email || "", // ✅ Include for edit
                      });
                      setSelectedEmployee(emp);
                      setShowModal(true);
                    }}
                    className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                    title="Edit"
                  />
                  <FaTrash
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md w-[80%] max-w-xl shadow-md relative">
            <button
              onClick={() => {
                setShowModal(false);
                setEditMode(false);
              }}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
            >
              <IoIosClose size={32} />
            </button>

            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Employee" : "Add New Employee"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="fname"
                placeholder="Full Name"
                value={formData.fname}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="text"
                name="empCode"
                placeholder="Employee Code"
                value={formData.empCode}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <input
                type="date"
                name="date"
                placeholder="Date of Joining"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300"
                required
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  {editMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-xl shadow-md relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
            >
              <IoIosClose size={32} />
            </button>

            <h3 className="text-lg font-bold mb-4">Employee Details</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Name", value: selectedEmployee.fname },
                { label: "Department", value: selectedEmployee.department },
                { label: "Designation", value: selectedEmployee.designation },
                { label: "Emp Code", value: selectedEmployee.empCode },
                { label: "Salary", value: selectedEmployee.salary },
                { label: "Location", value: selectedEmployee.location || "NA" },
                {
                  label: "Date",
                  value: new Date(selectedEmployee.date).toLocaleDateString(),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between border-b py-2"
                >
                  <span className="font-medium">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpDashboard;
