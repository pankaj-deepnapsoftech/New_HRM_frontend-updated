import React, { useState } from "react";
import {
  useGetAllEmpDataQuery,
  useAddEmpDataMutation,
  useUpdateEmpDataMutation,
  useDeleteEmpDataMutation,
} from "@/service/EmpData.services";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useFormik } from "formik";
import { validationSchema } from "@/Validation/EmpDashboardValidation";
import Pagination from "./Pagination/Pagination";

const EmpDashboard = () => {
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useGetAllEmpDataQuery({page});
  const [addEmpData] = useAddEmpDataMutation();
  const [updateEmpData] = useUpdateEmpDataMutation();
  const [deleteEmpData] = useDeleteEmpDataMutation();

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  
  const employees = data?.data || [];

  const formik = useFormik({
    initialValues: {
      fname: selectedEmployee?.fname || "",
      department: selectedEmployee?.department || "",
      designation: selectedEmployee?.designation || "",
      empCode: selectedEmployee?.empCode || "",
      salary: selectedEmployee?.salary || "",
      date: selectedEmployee?.date?.split("T")[0] || "",
      location: selectedEmployee?.location || "",
      email: selectedEmployee?.email || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (editMode && selectedEmployee) {
          await updateEmpData({ id: selectedEmployee._id, ...values }).unwrap();
        } else {
          await addEmpData(values).unwrap();
        }
        setShowModal(false);
        setEditMode(false);
        setSelectedEmployee(null);
        formik.resetForm();
        refetch(page);
      } catch (error) {
        console.error("Error saving employee:", error);
      }
    },
  });

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
            setSelectedEmployee(null);
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
                className={`border-b  border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.fname}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.department}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.designation}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.empCode}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.salary}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{emp.location || "NA"}</td>
                <td className="pl-4 py-2 px-2 text-[16px]">{new Date(emp.date).toLocaleDateString()}</td>
                <td className="pl-4 py-2 px-2 text-[16px] flex gap-3 ">
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
                      setSelectedEmployee(emp);
                      setEditMode(true);
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

   
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md w-[80%] max-w-xl shadow-md relative">
            <button
              onClick={() => {
                setShowModal(false);
                setEditMode(false);
                formik.resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
            >
              <IoIosClose size={32} />
            </button>

            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Employee" : "Add New Employee"}
            </h3>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
            
              <div>
                <input
                  type="text"
                  name="fname"
                  placeholder="Full Name"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.fname && formik.errors.fname && (
                  <div className="text-red-500 text-sm">{formik.errors.fname}</div>
                )}
              </div>

            
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </div>

              {/* Department */}
              <div>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.department && formik.errors.department && (
                  <div className="text-red-500 text-sm">{formik.errors.department}</div>
                )}
              </div>

              {/* Designation */}
              <div>
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.designation && formik.errors.designation && (
                  <div className="text-red-500 text-sm">{formik.errors.designation}</div>
                )}
              </div>

  
              <div>
                <input
                  type="text"
                  name="empCode"
                  placeholder="Employee Code"
                  value={formik.values.empCode}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.empCode && formik.errors.empCode && (
                  <div className="text-red-500 text-sm">{formik.errors.empCode}</div>
                )}
              </div>

    
              <div>
                <input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.salary && formik.errors.salary && (
                  <div className="text-red-500 text-sm">{formik.errors.salary}</div>
                )}
              </div>


              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="text-red-500 text-sm">{formik.errors.location}</div>
                )}
              </div>

    
              <div>
                <input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="text-red-500 text-sm">{formik.errors.date}</div>
                )}
              </div>

           
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
                <div key={label} className="flex justify-between border-b py-2">
                  <span className="font-medium">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Pagination page={page} setPage={setPage} hasNextPage={employees?.length === 10}/>
    </div>
  );
};

export default EmpDashboard;
