import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/SignIn";
import Signup from "@/pages/Auth/Signup";
import EmpLogin from "@/pages/UserAuth/Login";
import Register from "@/pages/UserAuth/Register";
import LandingPage from "@/pages/LandingPage";

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
];
