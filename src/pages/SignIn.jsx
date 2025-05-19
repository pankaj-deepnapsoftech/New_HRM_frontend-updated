/* eslint-disable no-unused-vars */
import { useSignInMutation } from "@/service/SignIn.services";
import { SignInSchema } from "@/Validation/SignInValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { browserName, deviceType } from "react-device-detect";
import { toast } from "react-toastify";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [SignIn, { isLoading }] = useSignInMutation()
    const navigate = useNavigate()
    const {
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        touched,
        errors,
        values
    } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: SignInSchema,
        onSubmit: async (values) => {
            const totalData = { ...values, device: deviceType, browser: browserName }
            try {
                const res = await SignIn(totalData).unwrap()
              toast.success("Login Successfully")
              navigate('/dashboard')
                resetForm();
            } catch (error) {
                console.log(error)
               toast.error("Login Faild ")
            }
        }
    });

    return (
        <div className="w-1/2 bg-white flex items-center justify-center p-10">
            <div className="w-full max-w-md ">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 block mb-1" htmlFor="username">Username & Email</label>
                        <input
                            id="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {touched.username && errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-gray-700 block mb-1" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.password && errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-700">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <NavLink to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</NavLink>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
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

                <p className="text-sm text-gray-600 text-center mt-6">
                    Don’t have an account? <NavLink to="/sign-up" className="text-blue-600 hover:underline ">Sign Up</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
