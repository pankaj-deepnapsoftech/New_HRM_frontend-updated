import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/SignIn";
import Signup from "@/pages/SignUp";

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
