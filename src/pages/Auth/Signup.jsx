/* eslint-disable no-unused-vars */

import { useSignUpMutation } from "@/service/Auth.services";
import { SignUpSchema } from "@/Validation/AuthValidation/SignUpValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isMobile, browserName } from "react-device-detect";
import { toast } from "react-toastify";
import { setLoginState } from "@/store/slice/AuthSlice";
import { useDispatch } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [SignUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      username: "",
      employeeId: "",
      role: "User",
    },
    validationSchema: SignUpSchema,

    onSubmit: async (values) => {
      const totalData = { ...values, isMobile, browser: browserName };
      try {
        const res = await SignUp(totalData).unwrap();
        toast.success(res.message);
        resetForm();
        dispatch(setLoginState());
        navigate("/");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.data.message || "Try again ");
      }
    },
  });

  return (
    <div className="min-h-screen w-1/2 flex bg-gray-100">
      <div className="w-full bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.fullName && errors.fullName && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="* * * * * * *"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.password}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-md text-sky-600 cursor-pointer"
              >
                {showPassword ? <IoEyeOutline/>:  <FaRegEyeSlash/>}
              </button>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Phone No.
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your user name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.username && errors.username && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.username}
                </p>
              )}
            </div>

            {/* <div>
              <label
                htmlFor="employeeId"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={values.employeeId}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your employee ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {touched.employeeId && errors.employeeId && (
                <p className="text-red-500 text-sm mt-1 ml-2">
                  {errors.employeeId}
                </p>
              )}
            </div> */}

            <div className="flex items-center text-sm text-gray-600">
              <input type="checkbox" id="terms" name="terms" className="mr-2" />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-sky-600 underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:opacity-90 transition"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-gray-300 w-full"></div>
              <span className="px-3 text-sm text-gray-500">Or</span>
              <div className="h-px bg-gray-300 w-full"></div>
            </div>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <NavLink to="/" className="text-sky-600 hover:underline">
              Sign In
            </NavLink>
          </p>
          {/* <NavLink
            to="/register"
            className="block w-full text-center mt-6 border  border-gray-500 text-gray-600 py-2 rounded-lg hover:bg-sky-50 transition"
          >
            Sign up as an employee
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
