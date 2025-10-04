import { useGetDailyAttendanceQuery } from '@/service/EmpData.services';
import React, { useState } from 'react';
import { toast } from 'react-toastify';



const DailyAttendance = () => {
  const { data: userData } = useGetAllEmpDataQuery();
  // console.log(userData?.data);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { data: attendanceData, isLoading, error } = useGetDailyAttendanceQuery(selectedDate);
  
  // Handle errors gracefully [[memory:8945155]]
  if (error) {
    console.log('Attendance data error:', error);
    // If 404 error, treat as empty attendance data [[memory:8945143]]
    if (error.status === 404) {
      toast.info('No attendance data found for selected date');
    } else {
      toast.error('Failed to load attendance data');
    }
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return time;
  };

  return (
    <section className="p-5 bg-gray-50 rounded  max-w-4xl mx-auto mt-10">
     <div className="bg-gray-300 text text-center  py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Daily Attendance report</h2>
      </div>
      
      {/* Date selector */}
      <div className="mb-6">
        <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          id="date-select"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto rounded-t-sm md:rounded-t-xl shadow">
        <table className=" w-3xl md:min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm leading-normal">
              <th className="py-4  font-[500] px-4">Name</th>
              <th className="py-4 font-[500]  px-4">Email</th>
              <th className="py-4 font-[500]  px-4">Status</th>
              <th className="py-4  font-[500] px-4">Login Time</th>
              <th className="py-4  font-[500] px-4">Logout Time</th>
              <th className="py-4  font-[500] px-4">Working Hours</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-8 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading attendance data...</span>
                  </div>
                </td>
              </tr>
            ) : attendanceData?.data?.length > 0 ? (
              attendanceData.data.map((employee, index) => (
                <tr key={employee._id || index} className=" border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    {employee.fname || 'N/A'}
                  </td> 
                  <td className="py-3 px-4">{employee.email || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={` py-4 px-6 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit  ${employee.status === "Absent" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
                      {employee.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-6">{formatTime(employee.loginTime)}</td>
                  <td className="py-3 px-6">{formatTime(employee.logoutTime)}</td>
                  <td className="py-3 px-6">{employee.totalWorkingHours || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  No attendance data available for the selected date
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </section>

  );
};

export default DailyAttendance;
