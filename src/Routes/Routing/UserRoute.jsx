import AdvanceMoneyRequest from "@/pages/UserPanel/AdvanceMoneyRequest";
import UserAttendance from "@/pages/UserPanel/UserAttendence";
import UserDashboard from "@/pages/UserPanel/UserDashboard";
import UserDocument from "@/pages/UserPanel/UserDocument";
import UserLeaveRequest from "@/pages/UserPanel/UserLeaveRequest";
import UserLeaveStatus from "@/pages/UserPanel/UserLeaveStatus";
import UserPaySlip from "@/pages/UserPanel/UserPaySlip";
import UserAssets from "@/pages/UserPanel/UserAssets";

export const UserRoute = [
  {
    path: "/user",
    element: <UserDashboard />,
  },
  {
    path:"/user/attendance",
    element:<UserAttendance/>
  },
{
     path: "/user/request-leave",
    element:<UserLeaveRequest/>
},
{
    path:"/user/leave-status",
    element:<UserLeaveStatus/>
},
{
    path:"/user/document",
    element:<UserDocument/>
},
{
    path:"/user/advance-money",
    element:<AdvanceMoneyRequest/>
},
{
    path:"/user/payslip",
    element:<UserPaySlip/>
},
{
    path:"/user/assets",
    element:<UserAssets/>
}
];
