import AllAttendence from "@/pages/AllAttendence";
import DailyAttendance from "@/pages/DailyAttendance";
import EmployeeTable from "@/pages/Employees";
import EmployeesReports from "@/pages/EmployeesReports";
import MainDashboardPage from "@/pages/MainDashboardPage";

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
    
]