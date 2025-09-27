import { SignInSchema } from "@/Validation/AuthValidation/SignInValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { browserName, isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useSignInMutation } from "@/service/Auth.services";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/store/slice/AuthSlice";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
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
      const totalData = { ...values, isMobile, browser: browserName, loginType: "admin" };

      try {
        const res = await SignIn(totalData).unwrap();
        toast.success(res.message);
        
        resetForm();
        dispatch(setLoginState());
        
        // Navigate based on role after state update
        setTimeout(() => {
          if (res.data.role === 'Admin') {
            navigate("/");
          } else {
            navigate("/user");
          }
        }, 100);

      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    },
  });

  return (
    <div className="w-1/2 bg-white flex items-center justify-center p-10">
      <div className="w-full max-w-md ">
        <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center">
          Welcome Back Admin!
        </h2>
        <p className="text-center mb-8">Please Login to access your account</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 block mb-1" htmlFor="username">
              Username & Email
            </label>
            <input
              id="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
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
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-md text-sky-600 hover:underline cursor-pointer"
              >
                {showPassword ? <IoEyeOutline/> :  <FaRegEyeSlash/>}
              </button>
            </div>
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
            className="cursor-pointer w-full py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:opacity-90 transition"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center my-6">
            <div className="h-px bg-gray-300 w-full"></div>
            <span className="px-3 text-sm text-gray-500">Or</span>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          {/* Google Sign-in (commented) */}
        </form>
        {/* <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <NavLink to="/sign-up" className="text-sky-600 hover:underline ">
            Sign Up
          </NavLink>
        </p> */}
        <NavLink
          to="/login"
          className="block w-full text-center mt-6 border border-gray-500 text-gray-600 py-2 rounded-lg hover:bg-sky-50 transition"
        >
          Login As an employee
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
