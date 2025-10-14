import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCrown, FaEye, FaEyeSlash, FaUser, FaLock, FaShieldAlt, FaKey, FaGlobe, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addData } from '@/store/slice/AuthSlice';

const SuperAdminLogin = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8075/api/v1';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/superadmin-auth/login`, {
                username: formData.username,
                password: formData.password,
                browser: navigator.userAgent,
                isMobile: window.innerWidth < 768,
                location: 'SuperAdmin Login'
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                const userData = response.data.data;
                // Ensure role is set for guard
                if (userData) {
                    dispatch(addData(userData));
                }
                
                toast.success('SuperAdmin login successful!');
                
                // Store user data in localStorage for immediate access
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Redirect to SuperAdmin dashboard
                navigate('/superadmin-dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat'
                    }}></div>
                </div>
            </div>

            <div className="relative w-full max-w-md z-10">
                {/* Professional Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-2xl">
                            <FaCrown className="text-4xl text-white drop-shadow-lg" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Super Admin
                        </h1>
                        <p className="text-blue-200/80 text-lg">Enterprise Management Portal</p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-blue-300/70">
                            <div className="flex items-center space-x-1">
                                <FaShieldAlt className="text-xs" />
                                <span>Secure Access</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaGlobe className="text-xs" />
                                <span>Global Control</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <FaKey className="text-2xl text-yellow-400 mr-3" />
                            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
                        </div>
                        <p className="text-blue-200/80 text-sm">Enter your SuperAdmin credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="flex text-white text-sm font-semibold mb-2 items-center">
                                <FaUser className="mr-2 text-yellow-400" />
                                Username or Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-blue-300 group-focus-within:text-yellow-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/15 border border-white/30 rounded-xl text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                                    placeholder="Enter your username or email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="flex text-white text-sm font-semibold mb-2 items-center">
                                <FaLock className="mr-2 text-yellow-400" />
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="text-blue-300 group-focus-within:text-yellow-400 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-14 py-4 bg-white/15 border border-white/30 rounded-xl text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-white/10 rounded-r-xl transition-colors"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-blue-300 hover:text-white transition-colors" />
                                    ) : (
                                        <FaEye className="text-blue-300 hover:text-white transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {loading ? (
                                <div className="flex items-center justify-center relative z-10">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                                    <span className="text-lg">Authenticating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center relative z-10">
                                    <FaShieldAlt className="mr-3 text-xl" />
                                    <span className="text-lg">Access Control Panel</span>
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-8 space-y-4">
                        <div className="text-center">
                            <p className="text-blue-200/80 text-sm mb-3">
                                Need SuperAdmin access?
                            </p>
                            <Link 
                                to="/superadmin-signup" 
                                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-white/20 hover:border-white/30"
                            >
                                <FaKey className="mr-2" />
                                Request Access
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-slate-900/50 text-blue-200/60">or</span>
                            </div>
                    </div>

                    {/* Back to Regular Login */}
                        <div className="text-center">
                        <Link 
                            to="/" 
                                className="inline-flex items-center text-blue-300 hover:text-white text-sm transition-colors duration-300 group"
                        >
                                <FaClock className="mr-2 group-hover:animate-spin" />
                                Back to Regular Login
                        </Link>
                        </div>
                    </div>
                </div>

                {/* Enhanced Security Notice */}
                <div className="mt-8 text-center space-y-3">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-center mb-2">
                            <FaShieldAlt className="text-yellow-400 mr-2" />
                            <span className="text-white font-semibold text-sm">Security Notice</span>
                        </div>
                        <p className="text-blue-200/70 text-xs leading-relaxed">
                            SuperAdmin access is restricted to authorized personnel only. All login attempts are monitored and logged for security purposes.
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-6 text-xs text-blue-300/60">
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>2FA Ready</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span>Audit Logged</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
