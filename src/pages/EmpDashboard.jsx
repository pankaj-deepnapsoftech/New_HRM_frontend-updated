import React from "react";
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
  return (
    <div className="p-5">
      <div className="bg-gray-500 text-white text-xl font-semibold px-6 py-3 rounded-t-lg shadow-md text-center">
        Employee Dashboard
      </div>

      <div className="overflow-x-auto shadow-lg rounded-b-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Emp-Code</th>
              <th className="px-6 py-3 text-left">Salary</th>
              <th className="px-6 py-3 text-left">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
                return( <tr
                key={idx}
                className={`border-t border-gray-200 ${
                  idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 px-6">{emp.fname}</td>
                <td className="p-3 px-6">{emp.department}</td>
                <td className="p-3 px-6">{emp.designation}</td>
                <td className="p-3 px-6">{emp.empCode}</td>
                <td className="p-3 px-6">{emp.salary}</td>
                <td className="p-3 px-6">{emp.date}</td>
              </tr>)
             
            })}
          </tbody>
       
        </table>
      </div>
    </div>
  );
};

export default EmpDashboard;
