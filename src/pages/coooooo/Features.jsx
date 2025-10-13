import {
  FaUsers,
  FaRegIdBadge,
  FaMoneyCheckAlt,
  FaUserCheck,
  FaFileSignature,
  FaChartBar,
  FaUserCog,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto py-16">
        <h1 className="subscription-font text-[#2563eb] text-4xl text-center font-bold mb-6">
          HRM Feature's
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Our sofware has some feature's for HR managment. It help with basic
          employee stuff and payrol.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Employee Management */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUsers size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Employee Managment</h2>
            <p className="text-gray-600 text-center">
              Manage employee informations and keep track of you're staff.
            </p>
          </div>

          {/* Attendance & Leave */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaRegIdBadge size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Attendence & Leave</h2>
            <p className="text-gray-600 text-center">
              Track when employee's come to work and manage there leave
              request's.
            </p>
          </div>

          {/* Payroll Automation */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaMoneyCheckAlt size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Payrol</h2>
            <p className="text-gray-600 text-center">
              Calculate and proces employee salarys each month.
            </p>
          </div>

          {/* Performance Reviews */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUserCheck size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Performance Review's</h2>
            <p className="text-gray-600 text-center">
              Review how well employee's are doing there job's.
            </p>
          </div>

          {/* Document Generation */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaFileSignature size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Document's</h2>
            <p className="text-gray-600 text-center">
              Create document's for employee's like letter's and form's.
            </p>
          </div>

          {/* HR Analytics & Reporting */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaChartBar size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Report's</h2>
            <p className="text-gray-600 text-center">
              See chart's and data about you're employee's.
            </p>
          </div>

          {/* Employee Self Service */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center col-span-1 md:col-span-2 lg:col-span-3">
            <FaUserCog size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Employee Portal</h2>
            <p className="text-gray-600 text-center">
              Employee's can log in and see there informations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
