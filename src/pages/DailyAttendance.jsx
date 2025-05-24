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
    status: "Present",
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
    status: "present",
    loginTime: "N/A"
  }
];

const DailyAttendance = () => {
  return (
    <section className="p-5 bg-gray-50 rounded  max-w-4xl mx-auto mt-10">
     <div className="bg-gray-300 text text-center  py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Daily Attendance report</h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm leading-normal">
              <th className="py-4  font-[500] px-6">Name</th>
              <th className="py-4 font-[500]  px-6">Email</th>
              <th className="py-4 font-[500]  px-6">Status</th>
              <th className="py-4  font-[500] px-6">Login Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {attendanceData.map((user, index) => (
              <tr key={index} className=" border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="py-3 px-6">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  <span className={` py-4 px-6 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit  ${user.status === "Absent" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
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
