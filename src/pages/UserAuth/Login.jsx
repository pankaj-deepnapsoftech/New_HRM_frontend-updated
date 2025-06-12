import { SignInSchema } from "@/Validation/AuthValidation/SignInValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { browserName, isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useSignInMutation } from "@/service/Auth.services";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/store/slice/AuthSlice";
import { LuEyeClosed } from "react-icons/lu";
import { MdRemoveRedEye } from "react-icons/md";

const EmpLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [SignIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      const totalData = { ...values, isMobile, browser: browserName };

      try {
        const res = await SignIn(totalData).unwrap();

        if (res?.message) {
          toast.success(res.message);
          dispatch(setLoginState());
          resetForm();
          navigate("/user");
        } else {
          toast.error("Login successful, but unexpected response.");
        }
      } catch (error) {
        const errorMessage = error?.data?.message || "Login failed";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div className="w-1/2 bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center">
        <img
          src="/login.png"
          alt="Login Illustration"
          className="w-[70%] h-auto"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white px-8 py-6 ">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center">
            Welcome back Employee!
          </h2>
          <p className="text-center mb-8">
            Please login to access your Account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-700 block mb-1" htmlFor="username">
                Username & Email
              </label>
              <input
                id="username"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="Enter your username & email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.username && errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700 block mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-sky-600 text-xl"
                >
                  {showPassword ? <MdRemoveRedEye /> : <LuEyeClosed />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <NavLink
                to="/forgot-password"
                className="text-sky-600 hover:underline"
              >
                Forgot Password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-gray-300 w-full"></div>
              <span className="px-3 text-sm text-gray-500">Or</span>
              <div className="h-px bg-gray-300 w-full"></div>
            </div>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-sky-600 hover:underline">
              Sign Up
            </NavLink>
          </p>
          <NavLink
            to="/"
            className="block w-full text-center mt-6 border  border-gray-500 text-gray-600 py-2 rounded-lg hover:bg-sky-50 transition"
          >
            Login as an Admin
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
