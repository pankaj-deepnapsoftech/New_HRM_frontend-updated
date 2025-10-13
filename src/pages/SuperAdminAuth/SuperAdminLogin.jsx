import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCrown, FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
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
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* SuperAdmin Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                        <FaCrown className="text-3xl text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Super Admin</h1>
                    <p className="text-blue-200">Access the ultimate control panel</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Username or Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Enter username or email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-400 hover:text-white transition-colors" />
                                    ) : (
                                        <FaEye className="text-gray-400 hover:text-white transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Logging in...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <FaCrown className="mr-2" />
                                    Access Super Admin Panel
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-300 text-sm">
                            Don't have SuperAdmin access?{' '}
                            <Link 
                                to="/superadmin-signup" 
                                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                            >
                                Request Access
                            </Link>
                        </p>
                    </div>

                    {/* Back to Regular Login */}
                    <div className="mt-4 text-center">
                        <Link 
                            to="/" 
                            className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
                        >
                            ← Back to Regular Login
                        </Link>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-gray-300 text-xs">
                        <FaCrown className="inline mr-1" />
                        SuperAdmin access is restricted to authorized personnel only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
