import React from 'react';

const attendanceData = [
  {
    firstName: "Nitish",
    lastName: "Prajapati",
    email: "nitishprajapati987@gmail.com",
    status: "Absent",
    loginTime: "N/A"
  },
  {
    firstName: "Abhi",
    lastName: "Pjpt",
    email: "abhi123@gmail.com",
    status: "Absent",
    loginTime: "N/A"
  },
  {
    firstName: "Komal",
    lastName: "Singh",
    email: "komal@gmail.com",
    status: "Absent",
    loginTime: "N/A"
  },
  {
    firstName: "Deepak",
    lastName: "Sharma",
    email: "dsharma1010@gmail.com",
    status: "Absent",
    loginTime: "N/A"
  }
];

const DailyAttendance = () => {
  return (
    <section className="max-w-6xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Daily Attendance Report</h2>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-sky-400 to-sky-400 text-left text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Login Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {attendanceData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  <span className={`font-bold ${user.status === "Absent" ? "text-red-500" : "text-green-500"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6">{user.loginTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>

  );
};

export default DailyAttendance;
