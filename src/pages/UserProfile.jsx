import { useChangePasswordMutation } from "@/service/Auth.services";
import { ChangePassSchema } from "@/Validation/ChangePassValidation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { MdRemoveRedEye } from "react-icons/md";

const UserProfile = ({ showUserMenu, setShowMenu }) => {
  const [showChangePassPage, setshowChangePassPage] = useState(false)
  const [ChangePassword, { isLoading }] = useChangePasswordMutation()
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleBlur,
    handleSubmit,
    resetForm,
    handleChange,
    touched,
    errors,
    values
  } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: ChangePassSchema,
    onSubmit: async (values) => {
      try {
        const res = await ChangePassword(values).unwrap()
        console.log(res)
        resetForm()
      } catch (error) {
        console.log(error)
      }
    }
  });

  return (
    <div
      className={`${showUserMenu ? "flex" : "hidden"
        } fixed inset-0 z-50 bg-black/50 p-4 items-center justify-center`}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative">

        <div className="h-24 bg-gradient-to-r from-sky-600 to-sky-400 p-5 text-white flex items-start justify-between">
          <h1 className="text-xl font-semibold">User Profile</h1>
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setShowMenu(false)}
            aria-label="Close"
          >
            <IoIosClose size={28} />
          </button>
        </div>


        <div className="flex justify-center -mt-12">
          <img
            src="/image.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>


        <div className="px-6 py-4 text-gray-900 text-sm sm:text-base">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Dinki Kaur</h2>
            <p className="text-sm text-gray-600">Admin</p>
          </div>


          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Age</span>
              <span className="bg-sky-100 text-gray-700 px-3 py-1 rounded-full font-semibold">21</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Education</span>
              <span className="bg-sky-100 text-gray-700 px-3 py-1 rounded-full font-semibold">Graduated</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Location</span>
              <span className="bg-sky-100 text-gray-700 px-3 py-1 rounded-full font-semibold">Faridabad</span>
            </div>
          </div>


          <div className="mt-6 text-center">
            <button
              onClick={() => setshowChangePassPage(!showChangePassPage)}
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {showChangePassPage && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              onClick={() => setshowChangePassPage(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
              <IoIosClose size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
         
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="oldPassword"
                    type={showOldPassword ? 'text' : 'password'}
                    value={values.oldPassword}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600"
                  >
                    {showOldPassword ? <MdRemoveRedEye /> : <LuEyeClosed />}
                  </button>
                </div>
                {touched.oldPassword && errors.oldPassword && (
                  <p className="text-sm text-red-500">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={values.newPassword}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600"
                  >
                    {showNewPassword ? <MdRemoveRedEye /> : <LuEyeClosed />}
                  </button>
                </div>
                {touched.newPassword && errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-sky-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600"
                  >
                    {showConfirmPassword ? <MdRemoveRedEye /> : <LuEyeClosed />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md transition duration-200"
              >
                Update Password
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;
