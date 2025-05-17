import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

export const AuthRoute = [
    {
        path:"/",
        element:<Login/>
    },
    {
        path: "/sign-up",
        element: <Signup />
    },

]
