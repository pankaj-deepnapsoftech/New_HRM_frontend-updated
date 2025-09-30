import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FiUser, FiLock, FiSettings, FiLogOut } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { browserName, isMobile } from "react-device-detect";

import { removeData } from "@/store/slice/AuthSlice";
import {
  useChangePasswordMutation,
  useLogoutUserMutation,
} from "@/service/Auth.services";
import { ChangePassSchema } from "@/Validation/AuthValidation/ChangePassValidation";

import EmpProfile from "./EmpProfile";
import EmpAccountSettings from "./EmpAccountSetting";

const EmpMenuBar = ({ showEmpMenuBar, setShowEmpMenuBar }) => {
  const sidebarRef = useRef(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showChangePassPage, setShowChangePassPage] = useState(false);
  const [showEmpProfile, setShowEmpProfile] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowEmpMenuBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logoutUser({ isMobile, browser: browserName }).unwrap();
      dispatch(removeData());
      toast.success(res.message || "Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePassSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await changePassword(values).unwrap();
        toast.success(res?.message);
        resetForm();
        setShowChangePassPage(false);
      } catch (error) {
        toast.error(error?.data?.message || "Password update failed");
      }
    },
  });

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[60vw] md:w-[22vw] bg-white shadow-2xl rounded-l-2xl overflow-auto transform transition-transform duration-500 ease-in-out ${
          showEmpMenuBar ? "translate-x-0" : "translate-x-full"
        }`}
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-black hover:text-gray-700 transition-all cursor-pointer"
            onClick={() => setShowEmpMenuBar(false)}
            aria-label="Close menu"
          >
            <IoIosClose size={32} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 px-4 sm:px-6 text-black">
          <ul className="flex flex-col gap-4 text-base font-medium">
            <li>
              <button
                onClick={() => {
                  setShowEmpProfile(true);
                  setShowEmpMenuBar(false);
                }}
                className="flex items-center gap-4 p-3 rounded-xl shadow-md transition-all duration-200 hover:bg-indigo-500 hover:text-white"
              >
                <FiUser size={20} />
                <span>View Employee Profile</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setShowChangePassPage(true);
                  setShowEmpMenuBar(false);
                }}
                disabled={isLoading}
                className="flex items-center gap-4 p-3 rounded-xl shadow-md transition-all duration-200 hover:bg-indigo-500 hover:text-white"
              >
                <FiLock size={20} />
                <span>Change Password</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setSettingsOpen(true);
                  setShowEmpMenuBar(false);
                }}
                className="flex items-center gap-4 p-3 rounded-xl shadow-md transition-all duration-200 hover:bg-indigo-500 hover:text-white"
              >
                <FiSettings size={20} />
                <span>Account Settings</span>
              </button>
            </li>

            <li>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center gap-4 p-3 rounded-xl shadow-md transition-all duration-200 hover:bg-red-600/20 hover:text-red-800 text-red-600"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="w-full absolute bottom-0 text-center p-4 text-xs text-white/70">
          © 2025 Your Company
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassPage && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-start md:items-center justify-center p-4 overflow-auto transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowChangePassPage(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold transition"
            >
              <IoIosClose size={24} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
              Change Password
            </h2>

            {/* Form */}
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showOldPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                  </button>
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.oldPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showNewPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                  </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showConfirmPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-2 rounded-lg shadow-lg font-semibold transition transform ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Employee Profile Drawer */}
      <EmpProfile
        showUserMenu={showEmpProfile}
        setShowMenu={setShowEmpProfile}
      />

      {/* Account Settings Modal */}
      <EmpAccountSettings
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default EmpMenuBar;
