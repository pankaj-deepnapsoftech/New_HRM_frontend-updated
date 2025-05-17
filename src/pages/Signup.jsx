import React from "react";

const Signup = () => {
    return (
        <div className="min-h-screen w-1/2 flex bg-gray-100">      
            <div className="w-full bg-white flex items-center justify-center p-10">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" id="terms" className="mr-2" />
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

                        <button
                            type="button"
                            className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2"
                        >
                            <img className="w-5 h-5" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google logo" />
                            Sign up with Google
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 text-center mt-6">
                        Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
