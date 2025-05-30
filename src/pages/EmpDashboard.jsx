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
    <div className="p-5 bg-gray-50 rounded  max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 px-6 py-4 mb-10 rounded-lg font-semibold  shadow-md shadow-gray-400 text-lg text-center">
        Employee Dashboard
      </div>

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
                return( <tr
                key={idx}
                className={`border-t border-gray-200  ${
                  idx % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.fname}</td>
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.department}</td>
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.designation}</td>
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.empCode}</td>
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.salary}</td>
                <td className="py-4 px-4 md:px-6 text-[14px]">{emp.date}</td>
              </tr>)
             
            })}
          </tbody>
       
        </table>
      </div>
    </div>
  );
};

export default EmpDashboard;
