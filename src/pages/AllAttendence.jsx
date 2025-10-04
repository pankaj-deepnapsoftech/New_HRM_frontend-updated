import React, { useState } from "react";
import Select from "react-select";
import { useGetMonthlyAttendanceQuery, useGetYearlyAttendanceQuery, useGetAllEmpDataWithoutPaginatioQuery } from "@/service/EmpData.services";
import { toast } from "react-toastify";

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
  // State for filters
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [filterType, setFilterType] = useState("monthly"); // "monthly" or "yearly"
  
  // Get employee data to extract unique departments
  const { data: employeeData } = useGetAllEmpDataWithoutPaginatioQuery();
  
  // Create department options from employee data with unique names
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    ...(employeeData?.data?.reduce((unique, emp) => {
      const deptName = emp.department;
      if (deptName && !unique.find(item => item.value === deptName)) {
        unique.push({
          value: deptName,
          label: deptName
        });
      }
      return unique;
    }, []) || [])
  ];

  // Create year options
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    yearOptions.push({ value: year.toString(), label: year.toString() });
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#8B5CF6" : "#D1D5DB",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(139, 92, 246, 0.5)" : "none",
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

  // API queries based on filter type
  const { data: monthlyAttendanceData, isLoading: monthlyLoading, error: monthlyError } = useGetMonthlyAttendanceQuery(
    {
      month: selectedMonth.split('-')[1], // Extract month from "2025-01" format
      year: selectedMonth.split('-')[0], // Extract year from "2025-01" format
      department: selectedDepartments.length > 0 ? selectedDepartments[0]?.value : 'all'
    },
    { skip: filterType !== "monthly" }
  );

  const { data: yearlyAttendanceData, isLoading: yearlyLoading, error: yearlyError } = useGetYearlyAttendanceQuery(
    {
      year: selectedYear,
      department: selectedDepartments.length > 0 ? selectedDepartments[0]?.value : 'all'
    },
    { skip: filterType !== "yearly" }
  );

  // Handle errors
  const currentError = filterType === "monthly" ? monthlyError : yearlyError;
  const currentLoading = filterType === "monthly" ? monthlyLoading : yearlyLoading;
  const currentData = filterType === "monthly" ? monthlyAttendanceData : yearlyAttendanceData;

  if (currentError) {
    console.log('Attendance data error:', currentError);
    if (currentError.status === 404) {
      toast.info('No attendance data found for selected filters');
    } else {
      toast.error('Failed to load attendance data');
    }
  }

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

  const FilterByYear = ({ selectedYear, onChange }) => {
    return (
      <div className="flex flex-col w-36 md:w-60 shrink-0 ml-2 md:ml-10">
        <label className="text-sm font-medium mb-1 ">Filter by Year</label>
        <Select
          options={yearOptions}
          styles={customStyles}
          value={yearOptions.find((opt) => opt.value === selectedYear)}
          onChange={(selected) => onChange(selected.value)}
          placeholder="Select year"
        />
      </div>
    );
  };

  return (
    <section className="p-4 bg-gray-100 rounded shadow-md max-w-5xl mx-auto mt-10 ">
      <div>
        <div className="bg-gray-300 text-center mx-2 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
          <h2 className="text-xl font-[500]">All Employees Attendance</h2>
        </div>

        {/* Filters Row - scrollable on mobile */}
        <div className="w-full ">
          <div className="flex gap-4 min-w-[300px] sm:min-w-0 justify-start items-end flex-wrap">
            {/* Filter Type Toggle */}
            <div className="flex flex-col w-36 md:w-48 shrink-0">
              <label className="text-sm font-medium mb-1">Filter Type</label>
              <Select
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "yearly", label: "Yearly" }
                ]}
                styles={customStyles}
                value={{ value: filterType, label: filterType === "monthly" ? "Monthly" : "Yearly" }}
                onChange={(selected) => setFilterType(selected.value)}
                placeholder="Select filter type"
              />
            </div>

            {/* Conditional Filter - Month or Year */}
            {filterType === "monthly" ? (
              <FilterByMonth
                selectedMonth={selectedMonth}
                onChange={setSelectedMonth}
              />
            ) : (
              <FilterByYear
                selectedYear={selectedYear}
                onChange={setSelectedYear}
              />
            )}

            {/* Department Filter */}
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
                placeholder="Select Department"
                value={selectedDepartments.length > 0 ? selectedDepartments[0] : null}
                onChange={(selected) => setSelectedDepartments(selected ? [selected] : [])}
              />
            </div>

            <div className="ml-10 font-[500]">
              <button className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200">
                EXPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow-md rounded-lg  mx-2 md:mx-10 mt-8">
        <div className="overflow-x-scroll scrollbar-visible rounded-xl">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase font-medium">
              <tr className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 ">
                <th className="px-4 py-4 font-[500]">Name</th>
                <th className="px-4 py-4 font-[500]">Location</th>
                <th className="px-4 py-4 font-[500]">Department</th>
                <th className="px-4 py-4 font-[500]">Role</th>
                <th className="px-4 py-4 font-[500]">Salary</th>
                <th className="px-4 py-4 font-[500]">Present Days</th>
                <th className="px-4 py-4 font-[500]">Absent Days</th>
                <th className="px-4 py-4 font-[500] text-right">Attendance %</th>
               
              </tr>
            </thead>
            <tbody>
              {currentLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading attendance data...</span>
                    </div>
                  </td>
                </tr>
              ) : currentData?.data?.length > 0 ? (
                currentData.data.map((employee, index) => (
                  <tr key={employee._id || index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      {employee.fname || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {employee.location || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {employee.department || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {employee.designation || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {employee.salary || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-semibold">
                        {employee.presentDays || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-red-600 font-semibold">
                        {employee.absentDays || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-blue-600 font-semibold">
                        {employee.attendancePercentage || 0}%
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No attendance data found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllAttendance;
