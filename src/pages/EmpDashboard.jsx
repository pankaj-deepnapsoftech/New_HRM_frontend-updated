import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

// import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("Full name is required"),
  department: Yup.string().required("Department is required"),
  designation: Yup.string().required("Designation is required"),
  empCode: Yup.string().required("Employee code is required"),
  salary: Yup.number().typeError("Salary must be a number").required("Salary is required"),
  date: Yup.date().required("Joining date is required"),
});

const employees = [
  {
    fname: "Nitish Prajapati",
    deperatment: "nitishprajapati987@gmail.com",
    department: "IT",
    designation: "Developer",
    empCode: "NIT51130226",
    salary: "10,000",
    date: "24-12-2024",
  },
  {
    fname: "abhi pjpt",
    deperatment: "abhi123@gmail.com",
    department: "IT",
    designation: "Manager",
    empCode: "ABH74130227",
    salary: "10,000",
    date: "24-12-2024",
  },
  {
    fname: "komal singh",
    deperatment: "komal@gmail.com",
    department: "sale",
    designation: "manager",
    empCode: "KOM98740307",
    salary: "10,000",
    date: "24-12-2024",
  },
  {
    fname: "Deepak Sharma",
    deperatment: "dsharma1010@gmail.com",
    department: "Sales",
    designation: "Boss",
    empCode: "DEE23890101",
    salary: "10,000",
    date: "24-12-2024",
  },
];

const EmpDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="p-5 bg-gray-50 rounded  max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 px-6 py-4 mb-6 rounded-lg font-semibold  shadow-md shadow-gray-400 text-lg text-center">
      Employee Dashboard
      </div>
      <div className="flex  justify-end my-4 mx-5 md:mx-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md w-fit"
        >
          Add Employees
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-full max-w-xl shadow-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-red-500 transition"
              onClick={() => setShowModal(false)}
               aria-label="Close"
            >
              <IoIosClose size={32} />
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Employees</h3>
            <formik 
            initialvalues={{
              fname:"",
              department:"",
              designation:"",
              empCode:"",
              salary:"",
              date:"",
            }}
            validationSchema={validationSchema}
            onSubmit={(values,{resetForm})=>{
               console.log("Submitted:", values);
          resetForm();
          setShowModal(false);
            }}
            >
          
            <form className="space-y-3">
              <label className="block font-medium text-sm mb-1">
              Full Name
              </label>
               <input
               type="text"
               name="name"
               placeholder="Employee Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>

               <label className="block font-medium text-sm mb-1">
              Department
              </label>
               <input
               type="text"
               name="name"
               placeholder="Department"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>

               <label className="block font-medium text-sm mb-1">
              Designation
              </label>
               <input
               type="text"
               name="name"
               placeholder="Designation"
               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>

               <label className="block font-medium text-sm mb-1">
              Employee Code
              </label>
               <input
               type="text"
               name="name"
               placeholder="Emp-code"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>

               <label className="block font-medium text-sm mb-1">
              Salary
              </label>
               <input
               type="text"
               name="name"
               placeholder="salary"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>

               <label className="block font-medium text-sm mb-1">
              Joining Date
              </label>
               <input
               type="date"
               name="startDate"
              
               className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                required
               >
               </input>
                 <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
            </formik>
          </div>
        </div>
      )}
      <div className="  rounded-t-sm md:rounded-t-xl shadow-md overflow-x-auto w-full scrollbar-visible">
        <table className=" w-3xl md:min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className=" px-4 md:px-6 py-4 text-left">Full Name</th>
              <th className="px-4 md:px-6 py-4 text-left">Department</th>
              <th className="px-4 md:px-6 py-4 text-left">Designation</th>
              <th className="px-4 md:px-6 py-4 text-left">Emp-Code</th>
              <th className="px-4 md:px-6 py-4 text-left">Salary</th>
              <th className="px-4 md:px-6 py-4 text-left">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
              return (
                <tr
                  key={idx}
                  className={`border-t border-gray-200  ${
                    idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-4 px-4 md:px-6 text-[14px]">{emp.fname}</td>
                  <td className="py-4 px-4 md:px-6 text-[14px]">
                    {emp.department}
                  </td>
                  <td className="py-4 px-4 md:px-6 text-[14px]">
                    {emp.designation}
                  </td>
                  <td className="py-4 px-4 md:px-6 text-[14px]">
                    {emp.empCode}
                  </td>
                  <td className="py-4 px-4 md:px-6 text-[14px]">
                    {emp.salary}
                  </td>
                  <td className="py-4 px-4 md:px-6 text-[14px]">{emp.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpDashboard;
