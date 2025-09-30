import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  FaUpload,
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaTrash,
  FaSync,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useSubmitLeaveRequestMutation,
  useGetEmployeeLeaveRequestsQuery,
} from "../../service/LeaveRequest.services";
import { useSelector } from "react-redux";

const UserLeaveRequest = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const { Auth } = useSelector((state) => state);

  const [submitLeaveRequest, { isLoading, error }] =
    useSubmitLeaveRequestMutation();

  const currentYear = new Date().getFullYear();

  const {
    data: employeeLeaveRequests,
    isLoading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
  } = useGetEmployeeLeaveRequestsQuery(
    { employeeId: Auth?._id, year: currentYear },
    {
      skip: !Auth?._id,
    }
  );

  useEffect(() => {
    if (employeeLeaveRequests) {
      setLastFetchTime(new Date());
    }
  }, [employeeLeaveRequests]);

  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/zip",
      "application/x-zip-compressed",
    ];

    const maxSize = 10000 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, Images (JPG, PNG, GIF) and ZIP files are allowed");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (validateFile(file)) {
        const newFile = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
        };

        setUploadedFiles((prev) => [...prev, newFile]);
        toast.success(`${file.name} uploaded successfully`);
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
    toast.success("File removed");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type === "application/pdf")
      return <FaFilePdf className="text-red-500" />;
    if (type.startsWith("image/"))
      return <FaFileImage className="text-green-500" />;
    if (type.includes("zip"))
      return <FaFileArchive className="text-blue-500" />;
    return <FaFilePdf className="text-gray-500" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-gray-400 rounded-xl shadow-md text-white py-4 px-6 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">
          Employee Leave Request
        </h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            My Leave Requests ({currentYear})
          </h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#6d5281] text-white px-4 py-2 rounded transition hover:bg-[#5a4470]"
        >
          Add Leave Request
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded">
        <table className="w-full min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 whitespace-nowrap text-gray-700 uppercase font-semibold">
            <tr>
              <th className="p-3 text-left">Leave Type</th>
              <th className="p-3 text-left">Request Type</th>
              <th className="p-3 text-left">From Date</th>
              <th className="p-3 text-left">To Date</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Supporting Documents</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requestsLoading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  Loading leave requests...
                </td>
              </tr>
            ) : requestsError ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-red-500">
                  Error loading requests:{" "}
                  {requestsError?.data?.message || "Unknown error"}
                </td>
              </tr>
            ) : employeeLeaveRequests?.data &&
              employeeLeaveRequests.data.length > 0 ? (
              employeeLeaveRequests.data.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="p-3 capitalize">
                    {request.type?.replace(/([A-Z])/g, " $1").trim() || "N/A"}
                  </td>
                  <td className="p-3 capitalize">
                    {request.mode || "Full Day"}
                  </td>
                  <td className="p-3">{formatDate(request.from)}</td>
                  <td className="p-3">{formatDate(request.to)}</td>
                  <td
                    className="p-3 max-w-xs truncate"
                    title={request.description}
                  >
                    {request.description || request.reason || "N/A"}
                  </td>
                  <td className="p-3">
                    {request.file ? (
                      <a
                        href={request.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FaFilePdf className="text-red-500" />
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No document</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status
                        ? request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)
                        : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No leave requests found for {currentYear}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Submit Leave Request
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <Formik
                initialValues={{
                  from: "",
                  to: "",
                  request: "",
                  type: "",
                  reason: "",
                  files: [],
                }}
                validationSchema={Yup.object().shape({
                  from: Yup.date().required("Date is required"),
                  to: Yup.date().required("Date is required"),
                  type: Yup.string().required("Must select a leave type"),
                  reason: Yup.string().required("Reason is required"),
                })}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    if (!Auth._id) {
                      toast.error("User not logged in. Please log in again.");
                      return;
                    }

                    const leaveRequestData = {
                      employeeId: Auth._id,
                      from: new Date(values.from).toISOString(),
                      to: new Date(values.to).toISOString(),
                      type: values.type,
                      mode: values.request || "full",
                      description: values.reason,
                    };
                    console.log("Submitting leave request:", leaveRequestData);

                    const result = await submitLeaveRequest(
                      leaveRequestData
                    ).unwrap();

                    console.log(
                      "Leave request submitted successfully:",
                      result
                    );

                    toast.success(
                      result.message || "Leave request submitted successfully!"
                    );

                    resetForm();
                    setUploadedFiles([]);
                    setShowForm(false);

                    refetchRequests();
                  } catch (error) {
                    console.error("Error submitting leave request:", error);

                    const errorMessage =
                      error?.data?.message ||
                      error?.message ||
                      "Failed to submit leave request";
                    toast.error(errorMessage);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <option value="sickLeave">Sick Leave</option>
                          <option value="casualLeave">Casual Leave</option>
                          <option value="paidLeave">Paid Leave</option>
                          <option value="emergencyLeave">
                            Emergency Leave
                          </option>
                        </select>
                        {touched.type && errors.type && (
                          <p className="text-sm text-red-500">{errors.type}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700 mb-1">
                          Request Leave
                        </label>
                        <select
                          name="request"
                          value={values.request}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="">Select Request Type</option>
                          <option value="half">Half Day</option>
                          <option value="full">Full Day</option>
                        </select>
                      </div>
                    </div>

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

                    <div>
                      <label className="block font-medium text-gray-700 mb-3">
                        Supporting Documents (Optional)
                      </label>
                      <p className="text-sm text-gray-500 mb-3">
                        Upload PDF files, images, or ZIP files (Max 10MB each)
                      </p>

                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          isDragOver
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag & drop files here, or{" "}
                          <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            browse files
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png,.gif,.zip"
                              onChange={(e) => handleFileUpload(e.target.files)}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-sm text-gray-400">
                          Supported: PDF, Images (JPG, PNG, GIF), ZIP files
                        </p>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Uploaded Files ({uploadedFiles.length})
                          </h4>
                          <div className="space-y-2">
                            {uploadedFiles.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                              >
                                <div className="flex items-center space-x-3">
                                  {file.preview ? (
                                    <img
                                      src={file.preview}
                                      alt={file.name}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded">
                                      {getFileIcon(file.type)}
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(file.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="Remove file"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-gradient-to-br from-gray-400 to-gray-600 hover:scale-105 text-white font-semibold px-6 py-2 rounded-md transition ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLeaveRequest;
