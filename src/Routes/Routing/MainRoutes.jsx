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

export const MainRoutes = [
    {
        path:"/",
        element:<MainDashboardPage/>
    },
    {
        path:"/employees",
        element:<EmployeeTable/>
    },
    {
        path:"/employees-reports",
        element:<EmployeesReports/>
    },

    {
        path:"/empyloyees-attendence",
        element:<DailyAttendance/>
    },
    {
        path:"/all-attendence",
        element:<AllAttendence/>
    },
    {
        path:"/empdashboard",
        element:<EmpDashboard/>
    },
    {
        path:"/projects",
        element:<Projects/>
    },
    {
        path:"/empleaves",
        element:<EmpLeaveBalance/>
    },
    {
        path:"/salarymanagement",
        element:<SalaryManagement/>
    },
    {
        path:"/employee/location",
        element:<EmpLocation/>
    },
    {
        path:'/company/assets',
        element:<AssignAssets/>
    },
     {
        path:'/employee/terminated',
        element:<TerminatedEmp/>
    },
    {
         path: "/gatepass/approval",
      element:<GatepassApprovals/>
    },
    {
       path: "/view/employee/show-cause/notice",
      element:<ShowCauseNotices/>
    }
]