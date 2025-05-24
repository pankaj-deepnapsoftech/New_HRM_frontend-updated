import { FaDownload } from "react-icons/fa";

export default function SalaryManagement() {
  const employees = [
    { name: "Nitish", code: "NIT51130226", salary: 5000, days: 3, leaves: 0 },
    { name: "abhi", code: "ABH74130227", salary: 12000, days: 1, leaves: 0 },
    { name: "komal", code: "KOM98740307", salary: 10000, days: 1, leaves: 0 },
    { name: "Deepak", code: "DEE23890101", salary: 10, days: 0, leaves: 0 },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center  py-4 my-6 mx-10  rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Salary Management</h2>
      </div>
      <div className="overflow-hidden rounded-t-xl shadow-md mx-10 m-8">
        <table className="min-w-full table-auto bg-white ">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm ">
            <tr>
              <th className=" py-4 font-[600] px-2">Full Name</th>
              <th className="  py-4 font-[600] px-2">Emp-Code</th>
              <th className="  py-4 font-[600] px-2">New Monthly Salary</th>
              <th className="  py-4 font-[600] px-2">Present Days</th>
              <th className="  py-4 font-[600] px-2">Leaves</th>
              <th className="  py-4 font-[600] px-2">Calculated Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr
                key={i}
                className={`border-b border-gray-200  ${
                  i % 2 == 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="py-4 px-3">{emp.name}</td>
                <td className="p-4">{emp.code}</td>
                <td className="p-4">
                  <input
                    type="number"
                    defaultValue={emp.salary}
                    className="w-40 px-3 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="p-4 ">
                  <input
                    type="number"
                    defaultValue={emp.days}
                    className="w-30 px-3 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    defaultValue={emp.leaves}
                    className="w-30 px-3 py-2 border border-gray-400 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </td>
                <td className="p-4">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 text-center">
        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 mx-auto">
          <FaDownload />
          Download Salary Report
        </button>
      </div>
    </div>
  );
}
