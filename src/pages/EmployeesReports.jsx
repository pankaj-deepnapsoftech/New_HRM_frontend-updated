import React from 'react';

const employees_report = [
    {
        name: "Nitish",
        location: "View Location",
        department: "IT",
        designation: "Developer",
        salary: 5000,
        assets: ["Bike", "keyboard"],
        presentDays: 3,
        gatePass: 1,
        status: "active"
    },
    {
        name: "abhi",
        location: "View Location",
        department: "IT",
        designation: "Manager",
        salary: 12000,
        assets: [],
        presentDays: 1,
        gatePass: 0,
        status: "active"
    },
    {
        name: "komal",
        location: "View Location",
        department: "sale",
        designation: "manager",
        salary: 10000,
        assets: ["Laptop"],
        presentDays: 1,
        gatePass: 1,
        status: "terminated"
    },
    {
        name: "Deepak",
        location: "View Location",
        department: "Sales",
        designation: "Boss",
        salary: 10,
        assets: [],
        presentDays: 0,
        gatePass: 0,
        status: "active"
    }
];

const EmployeesReports = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Employees Report</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-500 text-white">
                            <th className=" font-[600] py-4 ">Name</th>
                            <th className=" font-[600] py-4 ">Location</th>
                            <th className=" font-[600] py-4 ">Department</th>
                            <th className=" font-[600] py-4 ">Designation</th>
                            <th className=" font-[600] py-4 ">Salary</th>
                            <th className=" font-[600] py-4 ">Assets</th>
                            <th className=" font-[600] py-4 ">Present Days</th>
                            <th className=" font-[600] py-4 ">Gate Pass</th>
                            <th className=" font-[600] py-4 ">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees_report.map((emp, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                <td className="py-3 px-4">{emp.name}</td>
                                <td className="py-3 px-4 text-gray-500 hover:underline cursor-pointer">{emp.location}</td>
                                <td className="py-3 px-4 capitalize">{emp.department}</td>
                                <td className="py-3 px-4 capitalize">{emp.designation}</td>
                                <td className="py-3 px-4">${emp.salary.toLocaleString()}</td>
                                <td className="py-3 px-4">{emp.assets.length > 0 ? emp.assets.join(", ") : "None"}</td>
                                <td className="py-3 px-4">{emp.presentDays}</td>
                                <td className="py-3 px-4">{emp.gatePass}</td>
                                <td className={`py-3 px-4 font-semibold ${emp.status === "active" ? "text-green-600" : "text-red-500"}`}>
                                    {emp.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeesReports;
