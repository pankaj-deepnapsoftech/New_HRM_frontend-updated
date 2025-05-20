import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";

export const AuthRoute = [
    {
        path:"/",
        element:<Login/>
    },
    {
        path: "/sign-up",
        element: <Signup />
    },
    {
        path:"/forgot-password",
        element:<ForgotPassword/>
    },

]
