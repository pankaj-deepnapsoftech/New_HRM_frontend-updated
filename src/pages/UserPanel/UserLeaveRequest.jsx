import React from "react";
import {Formik} from "formik";
import * as Yup from "yup"

const UserLeaveRequest = () => {
  return (
    <div className="min-h-screen  bg-gray-50 px-4 py-2 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className=" text-gray-800 text-center py-4 rounded-t-xl  mb-6">
          <h1 className="text-2xl font-bold">Employee Leave Request</h1>
        </div>
<Formik
  initialValues={{
    from: "",
    to: "",
    request: "",
    type: "",
    reason: "",
  }}
  validationSchema={Yup.object().shape({
    from: Yup.date().required("Date is required"),
    to: Yup.date().required("Date is required"),
    type: Yup.string().required("Must select a leave type"),
    reason: Yup.string().required("Reason is required"),
  })}
  onSubmit={(values, { resetForm }) => {
    console.log("Submitted:", values);
    resetForm();
  }}
>
  {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            From Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="from"
            value={values.from}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {touched.from && errors.from && (
            <p className="text-sm text-red-500">{errors.from}</p>
          )}
        </div>

        {/* To Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            To Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="to"
            value={values.to}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {touched.to && errors.to && (
            <p className="text-sm text-red-500">{errors.to}</p>
          )}
        </div>

        {/* Leave Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Leave Type<span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select Leave Type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
          </select>
          {touched.type && errors.type && (
            <p className="text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        {/* Request Leave (checkbox) */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Request Leave
          </label>
          <p className="text-sm text-gray-400">Available: 0 half-day leaves</p>
          <p className="text-sm text-gray-400 mb-2">Available: 0 full-day leaves</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="request"
                value="half"
                checked={values.request === "half"}
                onChange={(e) =>
                  e.target.checked
                    ? (values.request = "half")
                    : (values.request = "")
                }
              />
              Half Day
            </label>
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="request"
                value="full"
                checked={values.request === "full"}
                onChange={(e) =>
                  e.target.checked
                    ? (values.request = "full")
                    : (values.request = "")
                }
              />
              Full Day
            </label>
          </div>
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Reason for Leave<span className="text-red-500">*</span>
        </label>
        <textarea
          name="reason"
          rows={4}
          value={values.reason}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Write reason here..."
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {touched.reason && errors.reason && (
          <p className="text-sm text-red-500">{errors.reason}</p>
        )}
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-br from-gray-400 to-gray-600 hover:scale-105 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Submit
        </button>
      </div>
    </form>
  )}
</Formik>

      </div>
    </div>
  );
};

export default UserLeaveRequest;
