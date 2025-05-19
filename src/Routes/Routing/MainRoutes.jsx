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
    }
    
]