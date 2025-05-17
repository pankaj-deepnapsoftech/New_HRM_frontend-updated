import React from 'react'

const ForgotPassword = () => {
    return (
        <div className="w-1/2 bg-white flex items-center justify-center p-10">
            <div className="w-full max-w-md ">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
                <form>
                    <div>
                        <label className="text-gray-700 block mb-1" htmlFor="username">Email</label>
                        <input
                            id="username"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                       
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword