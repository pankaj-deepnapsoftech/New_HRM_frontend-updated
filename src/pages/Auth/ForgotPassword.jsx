import { useForgotPasswordMutation } from "@/service/Auth.services";
import { ForgotPasswordSchema } from "@/Validation/AuthValidation/ForgotPasswordValidation";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        const res = await ForgotPassword(values).unwrap();
        resetForm();
        // console.log(res);
        toast.success(res.message);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Something went wrong");
      }
    },
  });
  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <div className="w-1/2 bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center relative">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/30 rounded-full blur-3xl opacity-30 z-0"></div>
        <img
          src="/Mobile login-rafiki.png"
          alt="login illustration"
          className="relative z-10 w-full max-w-md"
        />
      </div>
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-center">
            Forgot password ?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
