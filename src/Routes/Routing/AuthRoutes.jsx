import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";
import EmpLogin from "@/pages/UserAuth/Login";
import Register from "@/pages/UserAuth/Register";
import SuperAdminLogin from "@/pages/SuperAdminAuth/SuperAdminLogin";
import SuperAdminSignup from "@/pages/SuperAdminAuth/SuperAdminSignup";

export const AuthRoute = [
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/superadmin-login",
    element: <SuperAdminLogin />,
  },
  {
    path: "/superadmin-signup",
    element: <SuperAdminSignup />,
  },
];
