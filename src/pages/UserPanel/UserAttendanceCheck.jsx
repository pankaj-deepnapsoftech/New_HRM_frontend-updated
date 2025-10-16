import React, { useState, useEffect } from "react";
import { useLogedInuserQuery } from "@/service/Auth.services";
import { 
  useCheckInAttendanceMutation, 
  useCheckOutAttendanceMutation,
  useGetEmpAttendenceByIdQuery 
} from "@/service/EmpData.services";
import { toast } from "react-toastify";
import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";

const UserAttendanceCheck = () => {
  const { data: userData } = useLogedInuserQuery();
  const employeeId = userData?.data?._id;
  
  const [checkInAttendance, { isLoading: isCheckingIn }] = useCheckInAttendanceMutation();
  const [checkOutAttendance, { isLoading: isCheckingOut }] = useCheckOutAttendanceMutation();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState(null);
  
  // Get current month and year for attendance data
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());
  
  const { data: attendanceData, refetch: refetchAttendance } = useGetEmpAttendenceByIdQuery({
    employeeId,
    month: currentMonth,
    year: currentYear,
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get today's attendance record
  useEffect(() => {
    if (attendanceData?.data) {
      const today = new Date().toISOString().split('T')[0];
      const todayRecord = attendanceData.data.find(record => record.date === today);
      setTodayAttendance(todayRecord);
    }
  }, [attendanceData]);

  const handleCheckIn = async () => {
    try {
      const result = await checkInAttendance(employeeId).unwrap();
      toast.success(result.message);
      refetchAttendance();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to check-in");
    }
  };

  const handleCheckOut = async () => {
    try {
      const result = await checkOutAttendance(employeeId).unwrap();
      toast.success(result.message);
      refetchAttendance();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to check-out");
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not recorded";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'text-green-600 bg-green-100';
      case 'Absent': return 'text-red-600 bg-red-100';
      case 'Late': return 'text-yellow-600 bg-yellow-100';
      case 'Half Day': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isCheckedIn = todayAttendance?.loginTime && !todayAttendance?.logoutTime;
  const isCheckedOut = todayAttendance?.logoutTime;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Attendance Check</h1>
            <p className="text-gray-600 mt-1">Welcome, {userData?.data?.fname || 'Employee'}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <FaClock className="text-blue-500" />
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Today's Status
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Status</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(todayAttendance?.status || 'Absent')}`}>
              {todayAttendance?.status || 'Absent'}
            </div>
          </div>

          {/* Check-in Time */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Check-in Time</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatTime(todayAttendance?.loginTime)}
            </div>
          </div>

          {/* Check-out Time */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Check-out Time</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatTime(todayAttendance?.logoutTime)}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        {todayAttendance?.totalWorkingHours && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Total Working Hours</div>
            <div className="text-xl font-bold text-blue-800">
              {todayAttendance.totalWorkingHours}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Check-in Button */}
          <button
            onClick={handleCheckIn}
            disabled={isCheckingIn || isCheckedIn || isCheckedOut}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
              isCheckedIn || isCheckedOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            <FaSignInAlt className="text-xl" />
            {isCheckingIn ? 'Checking In...' : 'Check In'}
          </button>

          {/* Check-out Button */}
          <button
            onClick={handleCheckOut}
            disabled={isCheckingOut || !isCheckedIn || isCheckedOut}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
              !isCheckedIn || isCheckedOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            <FaSignOutAlt className="text-xl" />
            {isCheckingOut ? 'Checking Out...' : 'Check Out'}
          </button>
        </div>

        {/* Status Messages */}
        <div className="mt-4 text-center">
          {isCheckedIn && !isCheckedOut && (
            <p className="text-green-600 font-medium">
              ✅ You are currently checked in. You can check out anytime.
            </p>
          )}
          {isCheckedOut && (
            <p className="text-blue-600 font-medium">
              ✅ You have completed your work day. See you tomorrow!
            </p>
          )}
          {!isCheckedIn && !isCheckedOut && (
            <p className="text-gray-600 font-medium">
              Click "Check In" to start your work day.
            </p>
          )}
        </div>
      </div>

      {/* Recent Attendance History */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Attendance</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Check-in</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Check-out</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData?.data?.slice(0, 7).map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {formatTime(record.loginTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {formatTime(record.logoutTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {record.totalWorkingHours || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAttendanceCheck;
