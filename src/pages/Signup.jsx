/* eslint-disable no-unused-vars */
import { SignUpSchema } from "@/Validation/SignUpValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { handleBlur, handleSubmit, handleChange, resetForm, touched, errors, values } = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            password: "",
            phone_no: "",
            user_name: "",
            employee_id: ""
        },
        validationSchema: SignUpSchema ,
        onSubmit: (values) => {
            console.log(values)
            resetForm()
        }

    })

    return (
        <div className="min-h-screen w-1/2 flex bg-gray-100">
            <div className="w-full bg-white flex items-center justify-center p-10">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                id="full_name"
                                value={values.full_name}
                                name="full_name"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.full_name && errors.full_name && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.full_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">Email </label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type={`${showPassword ? "text" : "password"}`}
                                id="password"
                                placeholder="* * * * * * *"
                                name="password"
                                value={values.password}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.password && errors.password && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9  text-sm text-blue-600 cursor-pointer"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="phone_no">Phone No. </label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="phone_no"
                                id="phone_no"
                                value={values.phone_no}
                                name="phone_no"
                                placeholder="Enter your number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.phone_no && errors.phone_no && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone_no}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="user_name">User Name </label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                id="user_name"
                                value={values.user_name}
                                name="user_name"
                                placeholder="Enter your user name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.user_name && errors.user_name && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.user_name}</p>
                            )}
                        </div>  
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="employee_id">Employee Id </label>
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                id="employee_id"
                                value={values.employee_id}
                                placeholder="Enter your employee id"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {touched.employee_id && errors.employee_id && (
                                <p className="text-red-500 text-sm mt-1 ml-2">{errors.employee_id}</p>
                            )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur} type="checkbox" id="terms" className="mr-2" />
                            <label htmlFor="terms">
                                I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
                        >
                            Sign Up
                        </button>

                        <div className="flex items-center justify-center my-6">
                            <div className="h-px bg-gray-300 w-full"></div>
                            <span className="px-3 text-sm text-gray-500">Or</span>
                            <div className="h-px bg-gray-300 w-full"></div>
                        </div>

                        {/* <button
                            type="button"
                            className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2"
                        >
                            <img className="w-5 h-5" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google logo" />
                            Sign up with Google
                        </button> */}
                    </form>

                    <p className="text-sm text-gray-600 text-center mt-6">
                        Already have an account? <NavLink to="/" className="text-blue-600 hover:underline">Sign In</NavLink >
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
