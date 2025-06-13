import LocationModal from "@/Drawer/Employees/LocationModal";
import EmployeeForm from "@/Drawer/EmployeeDetails/EmployeeRegistration";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaImage } from "react-icons/fa";
import ViewModal from "@/Drawer/Employees/ViewModal";
import {
  useEpmDeleteDataMutation,
  useEpmGetDataQuery,
} from "@/service/Employee.services";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const { data, refetch } = useEpmGetDataQuery();
  const [EmpDeleteData] = useEpmDeleteDataMutation();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const[selectedEmployee, setSelectedEmployee]=useState(null)
  const [showForm, setShowFrom] = useState(false);
  const [editTable, setEdittable] = useState(null);
  const employee = data?.data;

  const hanldedelete = async (_id) => {
    try {
      if (window.confirm("are you sure you want to delete this element ?")) {
        const res = await EmpDeleteData(_id).unwrap();
        toast.success(res?.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error.message || "Failed to delete employee"
      );
    }
  };
  useEffect(() => {
    if (!showForm) {
      refetch();
    }
  }, [refetch, showForm]);

  return (
    <div className="p-1 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
     
      <div className="bg-gradient-to-b from-gray-300 to bg-gray-300 text text-center  mx-5 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employees All Details</h2>
      </div>
       <div className="flex justify-end mb-4 mx-5 md:mx-10">
        <button
          onClick={() => {
            setShowFrom(!showForm);
            setEdittable(null);
          }}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Add Employee Details
        </button>
      </div>
      <div className="overflow-x-auto rounded-t-sm md:rounded-t-xl shadow-md mx-5 md:mx-10 mb-8 scrollbar-visible">
        <table className="min-w-full shadow-lg border border-gray-200 text-sm">
          <thead className="bg-gray-200 text-[16px] text-gray-700 font-semibold">
            <tr>
              <th className="p-4 text-left whitespace-nowrap">Emp ID</th>
              <th className="p-4 text-left whitespace-nowrap">Address</th>
              <th className="p-4 text-left whitespace-nowrap">Department</th>
              <th className="p-4 text-left whitespace-nowrap">Designation</th>
              <th className="p-4 text-left whitespace-nowrap">Bank Name</th>
              <th className="p-4 text-left whitespace-nowrap">Bank Account</th>
              <th className="p-4 text-left whitespace-nowrap">IFSC Code</th>
              <th className="p-4 text-left whitespace-nowrap">UAN Number</th>
              <th className="p-4 text-left whitespace-nowrap">Aadhaar</th>
              <th className="p-4 text-left whitespace-nowrap">PAN Card</th>
              <th className="p-4 text-left whitespace-nowrap">Voter ID</th>
              <th className="p-4 text-left whitespace-nowrap">
                Driving License
              </th>
              <th className="p-4 text-left whitespace-nowrap">Bank Proof</th>
              <th className="p-4 text-left whitespace-nowrap">Salary</th>
              {/* <th className="p-4 text-left whitespace-nowrap">Photo</th> */}
              <th className="p-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employee?.map((emp) => (
              <tr
                key={emp._id}
                className={`border-t border-gray-200 ${
                  emp._id % 2 === 0 ? "bg-gray-200" : "bg-white"
                } text-[16px] `}
              >
                <td className="pl-4 py-3">{emp.Emp_id}</td>
                <td className="pl-4 py-3">{emp.Address}</td>
                <td className="pl-4 py-3">{emp.Department}</td>
                <td className="pl-4 py-3">{emp.Designation}</td>
                <td className="pl-4 py-3">{emp.Back_Name}</td>
                <td className="pl-4 py-3">{emp.Bank_Account}</td>
                <td className="pl-4 py-3">{emp.IFSC_Code}</td>
                <td className="pl-4 py-3">{emp.UAN_number}</td>
                <td className="pl-4 py-3">
                  <a
                    href={emp.aadhaar}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Aadhaar"
                  >
                    Aadhaar
                  </a>
                </td>
                <td className="pl-4 py-3">
                  <a
                    href={emp.pancard}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View PAN"
                  >
                    Pancard
                  </a>
                </td>
                <td className="pl-4 py-3">
                  <a
                    href={emp.Voter_Id}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Voter ID"
                  >
                    Voter Id
                  </a>
                </td>
                <td className="pl-4 py-3">
                  <a
                    href={emp.Driving_Licance}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Driving License"
                  >
                    Driving Licance
                  </a>
                </td>
                <td className="pl-4 py-3">
                  <a
                    href={emp.Bank_Proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Bank Proof"
                  >
                    Bank Proof
                  </a>
                </td>
                <td className="pl-4 py-3">{emp.salary}</td>

                {/* <td className="pl-4 py-3">
                  <a
                    href={emp.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Bank Proof"
                  >
                    Photo
                  </a>
                </td> */}

                <td className="pl-4 py-6 flex gap-2 text-lg">
                  <FaEye
                    onClick={() =>{setShowDetailModal(true); setSelectedEmployee(emp)}}

                    className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                    title="View"
                  />
                  <FaEdit
                    onClick={() => {
                      setShowFrom(true);
                      setEdittable(emp);
                    }}
                    className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                    title="Edit"
                  />
                  <FaTrash
                    onClick={() => hanldedelete(emp._id)}
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewModal
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
        employee={selectedEmployee}
      />
      <EmployeeForm
        setShowFrom={setShowFrom}
        showForm={showForm}
        editTable={editTable}
      />
    </div>
  );
};

export default EmployeeTable;
