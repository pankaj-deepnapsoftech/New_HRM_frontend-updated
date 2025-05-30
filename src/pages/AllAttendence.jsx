import React, { useState } from "react";
import Select from "react-select";

const monthOptions = [];
const startDate = new Date("2025-01-01");
const currentDate = new Date();
const endDate = new Date(currentDate.getFullYear() + 2, 11); // up to Dec 2 years from now

while (startDate <= endDate) {
  const value = startDate.toISOString().slice(0, 7); // "YYYY-MM"
  const label = startDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  monthOptions.push({ value, label });
  startDate.setMonth(startDate.getMonth() + 1);
}

const AllAttendance = () => {
  const departmentOptions = [
    { value: "all", label: "All" },
    { value: "hr", label: "HR" },
    { value: "engineering", label: "Engineering" },
    { value: "sales", label: "Sales" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#8B5CF6" : "#D1D5DB",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(139, 92, 246, 0.5)"
        : "none",
      padding: "2px",
      fontSize: "0.875rem",
      "&:hover": {
        borderColor: "#8B5CF6",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#E9D5FF"
        : state.isFocused
        ? "#F3E8FD"
        : "white",
      color: "black",
      cursor: "pointer",
    }),
  };

  const FilterByMonth = ({ selectedMonth, onChange }) => {
    return (
      <div className="flex flex-col w-36 md:w-60 shrink-0 ml-2 md:ml-10">
        <label className="text-sm font-medium mb-1 ">Filter by Month</label>
        <Select
          options={monthOptions}
          styles={customStyles}
          value={monthOptions.find((opt) => opt.value === selectedMonth)}
          onChange={(selected) => onChange(selected.value)}
          placeholder="Select month"
        />
      </div>
    );
  };

  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  return (
    <section className="p-4 bg-gray-100 rounded shadow-md max-w-5xl mx-auto mt-10 ">
      <div>
        <div className="bg-gray-300 text-center mx-2 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
          <h2 className="text-xl font-[500]">All Employees Attendance</h2>
        </div>

        {/* Filters Row - scrollable on mobile */}
        <div className="w-full ">  
          <div className="flex gap-4 min-w-[300px] sm:min-w-0 justify-start items-end">
            <FilterByMonth
              selectedMonth={selectedMonth}
              onChange={setSelectedMonth}
            />

            <div className="flex flex-col w-52 md:w-60 shrink-0">
              <label className="text-sm font-medium mb-1">
                Filter by Department
              </label>
              <Select
                name="departments"
                options={departmentOptions}
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#8B5CF6",
                    primary25: "#F3E8FF",
                    primary50: "#E9D5FF",
                  },
                })}
                classNamePrefix="select"
                placeholder="Select Department(s)"
                value={selectedDepartments}
                onChange={setSelectedDepartments}
              />
            </div>

            
          </div>
        </div>
      </div>
    
      {/* Attendance Table */}
      <div className="bg-white shadow-md rounded-lg  mx-2 md:mx-10 mt-8">
<div className="overflow-x-scroll scrollbar-visible">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase font-medium">
            <tr className="bg-gradient-to-br from-gray-200 to-gray-400 text-gray-600">
              <th className="px-4 py-4 font-[500]">Name</th>
              <th className="px-4 py-4 font-[500]">Location</th>
              <th className="px-4 py-4 font-[500]">Department</th>
              <th className="px-4 py-4 font-[500]">Role</th>
              <th className="px-4 py-4 font-[500]">Salary</th>
              <th className="px-4 py-4 font-[500]">Present Days</th>
              <th className="px-4 py-4 font-[500]">Absent Days</th>
              <th className="px-4 py-4 font-[500] text-right"></th>
              <th  className="px-4 py-4 font-[500] text-right">  <button className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200  ">
              EXPORT
            </button>
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
      </div>
    </section>
  );
};

export default AllAttendance;
