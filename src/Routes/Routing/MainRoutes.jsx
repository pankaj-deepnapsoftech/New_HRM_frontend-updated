import EmpDashboard from "@/pages/EmpDashboard";
import EmployeeTable from "@/pages/Employees";
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
        path:"/empdashboard",
        element:<EmpDashboard/>
    }
    
]