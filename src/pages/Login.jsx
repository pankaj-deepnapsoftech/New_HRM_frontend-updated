import React, { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (


           
            <div className="w-1/2  bg-white flex items-center justify-center p-10">
                <div className="w-full max-w-md ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="text-gray-700 block mb-1" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 block mb-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
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
                            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition"
                        >
                            Sign in
                        </button>

                        <div className="flex items-center justify-center my-6">
                            <div className="h-px bg-gray-300 w-full"></div>
                            <span className="px-3 text-sm text-gray-500">Or</span>
                            <div className="h-px bg-gray-300 w-full"></div>
                        </div>

                        <button
                            type="button"
                            className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2"
                        >
                            <img className="w-5 h-5" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google logo" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 text-center mt-6">
                        Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
       
    );
};

export default Login;
