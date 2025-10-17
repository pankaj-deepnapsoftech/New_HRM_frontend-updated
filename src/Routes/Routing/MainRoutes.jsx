import AllAttendence from "@/pages/AllAttendence";
import DailyAttendance from "@/pages/DailyAttendance";
import EmployeeTable from "@/pages/Employees";
import AssignAssets from "@/pages/Assets";
import EmpDashboard from "@/pages/EmpDashboard";
import EmpLeaveBalance from "@/pages/EmpLeaveBalance";
import EmpLocation from "@/pages/EmpLocation";
import GatepassApprovals from "@/pages/GatepassAproval";

import Projects from "@/pages/Projects";
import SalaryManagement from "@/pages/SalaryManagement";
import ShowCauseNotices from "@/pages/ShowCauseNotices";
import HRAnnouncements from "@/pages/HRAnnouncements";
import TerminatedEmp from "@/pages/TerminatedEmp";
import PayrollSummary from "@/pages/PayrollSummary";
import EmpMoneyRequest from "@/pages/EmpMoneyRequest";
import Incentives from "@/pages/Incentives";
import Reimbursements from "@/pages/Reimbursements";
import EmpPayslip from "@/pages/EmpPayslip";
import BenefitsManagement from "@/pages/BenefitsManagement";
import AllLeaves from "@/pages/AllLeaves";
import AdminRouteGuard from "@/Components/AdminRouteGuard";
import SuperAdminRouteGuard from "@/Components/SuperAdminRouteGuard";
import Departments from "@/pages/Departments";
import MainDashboardPage from "@/pages/MainDashboardPage";
import EmployeesReports from "@/pages/EmployeesReports";
import HRDashboard from "@/pages/HRDashboard";
import AdminAttendanceRegularization from "@/pages/AdminAttendanceRegularization";
import DesignationManagement from "@/pages/DesignationManagement";
import AdminESeparation from "@/pages/AdminESeparation";

export const MainRoutes = [
  {
    path: "/benefits",
    element: (
      <AdminRouteGuard>
        <BenefitsManagement />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminRouteGuard>
        <MainDashboardPage />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employees",
    element: (
      <AdminRouteGuard>
        <EmployeeTable />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employees-reports",
    element: (
      <AdminRouteGuard>
        <EmployeesReports />
      </AdminRouteGuard>
    ),
  },

  {
    path: "/empyloyees-attendence",
    element: (
      <AdminRouteGuard>
        <DailyAttendance />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/all-attendence",
    element: (
      <AdminRouteGuard>
        <AllAttendence />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/all-leaves",
    element: (
      <AdminRouteGuard>
        <AllLeaves />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/empdashboard",
    element: (
      <AdminRouteGuard>
        <EmpDashboard />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/departments",
    element: <Departments />,
  },
  {
    path: "/designations",
    element: (
      <AdminRouteGuard>
        <DesignationManagement />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/projects",
    element: (
      <AdminRouteGuard>
        <Projects />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/empleaves",
    element: (
      <AdminRouteGuard>
        <EmpLeaveBalance />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/salarymanagement",
    element: (
      <AdminRouteGuard>
        <SalaryManagement />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/location",
    element: (
      <AdminRouteGuard>
        <EmpLocation />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/company/assets",
    element: (
      <AdminRouteGuard>
        <AssignAssets />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/terminated",
    element: (
      <AdminRouteGuard>
        <TerminatedEmp />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/gatepass/approval",
    element: (
      <AdminRouteGuard>
        <GatepassApprovals />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/view/employee/show-cause/notice",
    element: (
      <AdminRouteGuard>
        <ShowCauseNotices />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/hr/announcements",
    element: (
      <AdminRouteGuard>
        <HRAnnouncements />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/payrollSummary",
    element: (
      <AdminRouteGuard>
        <PayrollSummary />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/advance/money/request",
    element: (
      <AdminRouteGuard>
        <EmpMoneyRequest />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/incentives",
    element: (
      <AdminRouteGuard>
        <Incentives />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/employee/reimbursements",
    element: (
      <AdminRouteGuard>
        <Reimbursements />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/generate/employee/payslip",
    element: (
      <AdminRouteGuard>
        <EmpPayslip />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/hrdashboard",
    element: (
      <AdminRouteGuard>
        <HRDashboard />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/attendance-regularization",
    element: (
      <AdminRouteGuard>
        <AdminAttendanceRegularization />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/designations",
    element: (
      <AdminRouteGuard>
        <DesignationManagement />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/e-separation",
    element: (
      <AdminRouteGuard>
        <AdminESeparation />
      </AdminRouteGuard>
    ),
  },
];
