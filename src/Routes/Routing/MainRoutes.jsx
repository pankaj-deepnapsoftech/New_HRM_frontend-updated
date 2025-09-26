import AllAttendence from "@/pages/AllAttendence";
import DailyAttendance from "@/pages/DailyAttendance";
import EmployeeTable from "@/pages/Employees";
import EmployeesReports from "@/pages/EmployeesReports";
import AssignAssets from "@/pages/Assets";
import EmpDashboard from "@/pages/EmpDashboard";
import EmpLeaveBalance from "@/pages/EmpLeaveBalance";
import EmpLocation from "@/pages/EmpLocation";
import GatepassApprovals from "@/pages/GatepassAproval";
import MainDashboardPage from "@/pages/MainDashboardPage";
import Projects from "@/pages/Projects";
import SalaryManagement from "@/pages/SalaryManagement";
import ShowCauseNotices from "@/pages/ShowCauseNotices";
import TerminatedEmp from "@/pages/TerminatedEmp";
import PayrollSummary from "@/pages/PayrollSummary";
import EmpMoneyRequest from "@/pages/EmpMoneyRequest";
import Incentives from "@/pages/Incentives";
import Reimbursements from "@/pages/Reimbursements";
import EmpPayslip from "@/pages/EmpPayslip";
import AllLeaves from "@/pages/AllLeaves";
import Departments from "@/pages/Departments";

export const MainRoutes = [
  {
    path: "/",
    element: <MainDashboardPage />,
  },
  {
    path: "/employees",
    element: <EmployeeTable />,
  },
  {
    path: "/employees-reports",
    element: <EmployeesReports />,
  },

  {
    path: "/empyloyees-attendence",
    element: <DailyAttendance />,
  },
  {
    path: "/all-attendence",
    element: <AllAttendence/>,
  },
  {
    path: "/all-leaves",
    element: <AllLeaves/>,
  },
  {
    path: "/empdashboard",
    element: <EmpDashboard />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/empleaves",
    element: <EmpLeaveBalance />,
  },
  {
    path: "/salarymanagement",
    element: <SalaryManagement />,
  },
  {
    path: "/employee/location",
    element: <EmpLocation/>,
  },
  {
    path: "/company/assets",
    element: <AssignAssets />,
  },
  {
    path: "/employee/terminated",
    element: <TerminatedEmp />,
  },
  {
    path: "/gatepass/approval",
    element: <GatepassApprovals />,
  },
  {
    path: "/view/employee/show-cause/notice",
    element: <ShowCauseNotices />,
  },
  {
    path: "/employee/payrollSummary",
    element: <PayrollSummary />,
  },
  {
    path: "/employee/advance/money/request",
    element: <EmpMoneyRequest />,
  },
  {
    path: "/employee/incentives",
    element: <Incentives />,
  },
  {
    path: "/employee/reimbursements",
    element: <Reimbursements />,
  },
  {
    path: "/generate/employee/payslip",
    element: <EmpPayslip/>,
  },
  
];
