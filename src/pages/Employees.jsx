import LocationModal from "@/Drawer/Employees/LocationModal";
import BackroundVerification from "@/Drawer/EmployeeDetails/BackroundVerification";
import EmployeeForm from "@/Drawer/EmployeeDetails/EmployeeRegistration";
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ViewModal from "@/Drawer/Employees/ViewModal";
import EditModal from "@/Drawer/Employees/EditModal";
import BankDetails from "@/Drawer/EmployeeDetails/BankDetails";

const employees = [
  {
    name: "Nitish Prajapati",
    email: "nitishprajapati987@gmail.com",
    location: "Location",
    department: "IT",
    designation: "Developer",
    empCode: "NIT51130226",
  },
  {
    name: "abhi pjpt",
    email: "abhi123@gmail.com",
    location: "Location",
    department: "IT",
    designation: "Manager",
    empCode: "ABH74130227",
  },
  {
    name: "komal singh",
    email: "komal@gmail.com",
    location: "Location",
    department: "sale",
    designation: "manager",
    empCode: "KOM98740307",
  },
  {
    name: "Deepak Sharma",
    email: "dsharma1010@gmail.com",
    location: "Location",
    department: "Sales",
    designation: "Boss",
    empCode: "DEE23890101",
  },
];

const EmployeeTable = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

 
  const handleEdit = (emp) => {
    setEmployeeToEdit(emp);
    setEditModalOpen(true);
  };

  const handleUpdate = (updatedEmp) => {
    // Update your employee list logic here
    console.log("Updated employee:", updatedEmp);
  };
  const handleFormSubmit = (data) => {
  console.log("Bank Details Submitted:", data);
};


  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  const location =
    "Mathura Road Flyover, Sant Nagar, 121002, Sector 20A, Faridabad, Haryana, India";
  const [showForm, setShowFrom] = useState(false);
  const [VerificationForm, setVerificationForm] = useState(false);

  return (
    <div className="p-1 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gradient-to-b from-gray-300 to bg-gray-300 text text-center  mx-5 md:mx-10 py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employee Details</h2>
      </div>
      <div className="flex gap-4  mb-10  mx-5 md:mx-10">
        <button
          onClick={() => setShowFrom(!showForm)}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Register Employee
        </button>
        <button
          onClick={() => setVerificationForm(!VerificationForm)}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Background Verification
        </button>
        <button onClick={() => setIsBankModalOpen(true)} className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md">
          Bank Account
        </button>
      </div>

      <div className="overflow-x-scroll rounded-t-sm md:rounded-t-xl shadow-md  mx-5 md:mx-10 mb-8 scrollbar-visible">
        <table className=" w-5xl md:min-w-full shadow-lg border border-gray-200 ">
          <thead className=" text-gray-700 bg-gray-200  ">
            <tr>
              <th className="p-4 text-left font-[700] ">Full Name</th>
              <th className="p-4 text-left font-[700] ">Email</th>
              <th className="p-4 text-left font-[700] ">Location</th>
              <th className="p-4 text-left font-[700] ">Department</th>
              <th className="p-4 text-left font-[700] ">Designation</th>
              <th className="p-4 text-left font-[700] ">Emp-Code</th>
              <th className="p-4 text-left font-[700] ">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={idx}
                className={`  border-t border-gray-200 ${
                  idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 text-left font-[400]">{emp.name}</td>
                <td className="p-3 text-left font-[400]">{emp.email}</td>
                <td
                  className="p-3 font-[400] text-blue-600 cursor-pointer"
                  onClick={() =>  setIsLocationModalOpen(true)}
                >
                  View
                  <br />
                  Location
                </td>{" "}
                <LocationModal
                  isOpen={isLocationModalOpen}
                  onClose={() => setIsLocationModalOpen(false)}
                  location={location}
                />
                <td className="p-3 text-left font-[400]">{emp.department}</td>
                <td className="p-3 text-left font-[400]">{emp.designation}</td>
                <td className="p-3 text-left font-[400]">{emp.empCode}</td>
                <td className="p-3 text-left my-4 flex gap-5">
                  <FaEye
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setShowDetailModal(true);
                    }}
                  />
                  <FaEdit
                    className="text-green-400 cursor-pointer"
                    onClick={() => handleEdit(emp)}
                  />
                  <FaTrash className="text-red-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        employee={selectedEmployee}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        employee={employeeToEdit}
        onUpdate={handleUpdate}
      />
<BankDetails
  isOpen={isBankModalOpen}
  onClose={() => setIsBankModalOpen(false)}
  onSubmit={handleFormSubmit}
/>
      <EmployeeForm setShowFrom={setShowFrom} showForm={showForm} />
      <BackroundVerification
        VerificationForm={VerificationForm}
        setVerificationForm={setVerificationForm}
      />
    </div>
  );
};

export default EmployeeTable;
