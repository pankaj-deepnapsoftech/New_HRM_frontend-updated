import { Button } from "antd";
import React from "react";


const AllAttendance = () => {
    const currentMonth = new Date().toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    return (
        <section className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-[600]" text-gray-600>All Employee Attendance</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Filter by Month</label>
                        <input
                            type="text"
                            defaultValue={currentMonth}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Filter by Department</label>
                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <option value="all">All</option>
                            <option value="hr">HR</option>
                            <option value="engineering">Engineering</option>
                            <option value="sales">Sales</option>
                            {/* Add more departments as needed */}
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
                        <tr className="bg-gradient-to-r from-gray-400 to-gray-400 text-white ">
                            <th className="px-4 py-2 font-[500]">Name</th>
                            <th className="px-4 py-2 font-[500]">Location</th>
                            <th className="px-4 py-2 font-[500]">Department</th>
                            <th className="px-4 py-2 font-[500]">Role</th>
                            <th className="px-4 py-2 font-[500]">Salary</th>
                            <th className="px-4 py-2 font-[500]">Present Days</th>
                            <th className="px-4 py-2 font-[500]">Absent Days</th>
                            <th className="px-4 py-2 font-[500] text-right">
                                <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                                    Export
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8} className="text-center py-6 text-gray-500">
                                No attendance data found for the selected filters
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllAttendance;
