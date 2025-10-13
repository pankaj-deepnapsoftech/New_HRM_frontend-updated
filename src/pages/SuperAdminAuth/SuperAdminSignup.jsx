import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCrown, FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const SuperAdminSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8075/api/v1';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            toast.error('Full name is required');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!formData.phone.trim()) {
            toast.error('Phone number is required');
            return false;
        }
        if (!formData.username.trim()) {
            toast.error('Username is required');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/superadmin-auth/signup`, {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                username: formData.username,
                password: formData.password,
                browser: navigator.userAgent,
                isMobile: window.innerWidth < 768
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                toast.success('SuperAdmin account created successfully! Please login.');
                navigate('/superadmin-login');
            }
        } catch (error) {
            console.error('Signup error:', error);
            const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
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
                    <p className="text-blue-200">Create your SuperAdmin account</p>
                </div>

                {/* Signup Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaPhone className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        {/* Username Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Username
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
                                    placeholder="Choose a username"
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
                                    placeholder="Create a password"
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

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
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
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg mt-6"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <FaCrown className="mr-2" />
                                    Create SuperAdmin Account
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-300 text-sm">
                            Already have a SuperAdmin account?{' '}
                            <Link 
                                to="/superadmin-login" 
                                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                            >
                                Login here
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
                        SuperAdmin accounts have full system access
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSignup;
