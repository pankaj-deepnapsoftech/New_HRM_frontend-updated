import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";
import LandingPage from "@/pages/LandingPage";
import SuperAdminLogin from "@/pages/SuperAdminAuth/SuperAdminLogin";
import SuperAdminSignup from "@/pages/SuperAdminAuth/SuperAdminSignup";

export const AuthRoute = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-in",
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
