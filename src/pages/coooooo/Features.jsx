import { FaUsers, FaRegIdBadge, FaMoneyCheckAlt, FaUserCheck, FaFileSignature, FaChartBar, FaUserCog } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto py-16">
        <h1 className="subscription-font text-[#2563eb] text-4xl text-center font-bold mb-6">Modern HRM Features For Every Team</h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Deepnap HRM covers all your core HR needs. From onboarding and employee management to payroll processing, leave, attendance, analytics—even document generation and employee self service. Easy for HR. Empowering for employees.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Employee Management */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUsers size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Employee Management</h2>
            <p className="text-gray-600 text-center">
              Central repository for employee profiles, lifecycle, organization chart, HR docs, onboarding & exit checklists.
            </p>
          </div>

          {/* Attendance & Leave */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaRegIdBadge size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Attendance & Leave</h2>
            <p className="text-gray-600 text-center">
              Automated attendance capture (web/app/biometric), leave management, approvals, holidays & timesheets—zero paperwork!
            </p>
          </div>

          {/* Payroll Automation */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaMoneyCheckAlt size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Payroll Automation</h2>
            <p className="text-gray-600 text-center">
              One-click salary processing with automated compliance (PF, ESI, TDS, etc.), bonuses, reimbursements and payslips.
            </p>
          </div>

          {/* Performance Reviews */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUserCheck size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Performance Reviews</h2>
            <p className="text-gray-600 text-center">
              Run appraisals, track goals, get feedback, and recognize top performers—all integrated with HR records.
            </p>
          </div>

          {/* Document Generation */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaFileSignature size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Document Generation</h2>
            <p className="text-gray-600 text-center">
              Instantly generate offer/relieving letters, contracts, HR policies and forms—personalized & legally compliant.
            </p>
          </div>

          {/* HR Analytics & Reporting */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaChartBar size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">HR Analytics & Reporting</h2>
            <p className="text-gray-600 text-center">
              Dashboards to track workforce costs, trends, attendance, attrition, and every HR metric—make smarter decisions.
            </p>
          </div>

          {/* Employee Self Service */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center col-span-1 md:col-span-2 lg:col-span-3">
            <FaUserCog size={40} className="text-sky-600 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Employee Self Service (ESS)</h2>
            <p className="text-gray-600 text-center">
              Give employees and managers a unified portal for leave/applications, payslips, profile updates and HR help—any device.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Features;
