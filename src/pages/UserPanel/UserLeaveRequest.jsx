import React, { useState } from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import { FaUpload, FaFilePdf, FaFileImage, FaFileArchive, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSubmitLeaveRequestMutation } from "../../service/LeaveRequest.services";
import { useSelector } from "react-redux";

const UserLeaveRequest = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Get user data from Redux store
  const { Auth } = useSelector((state) => state);
  
  // RTK Query mutation hook
  const [submitLeaveRequest, { isLoading, error }] = useSubmitLeaveRequestMutation();

  // File validation
  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-zip-compressed'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, Images (JPG, PNG, GIF) and ZIP files are allowed');
      return false;
    }
    
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return false;
    }
    
    return true;
  };

  // Handle file upload
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (validateFile(file)) {
        const newFile = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        toast.success(`${file.name} uploaded successfully`);
      }
    });
  };

  // Handle drag and drop
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

  // Remove file
  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
    toast.success('File removed');
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon
  const getFileIcon = (type) => {
    if (type === 'application/pdf') return <FaFilePdf className="text-red-500" />;
    if (type.startsWith('image/')) return <FaFileImage className="text-green-500" />;
    if (type.includes('zip')) return <FaFileArchive className="text-blue-500" />;
    return <FaFilePdf className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-2 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
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
      // Check if user is logged in and has an ID
      if (!Auth._id) {
        toast.error("User not logged in. Please log in again.");
        return;
      }

      // Prepare the leave request data according to API structure
      const leaveRequestData = {
        employeeId: Auth._id, // Add the employee ID from Redux store
        from: new Date(values.from).toISOString(),
        to: new Date(values.to).toISOString(),
        type: values.type, // Now using the correct values directly
        mode: values.request || "full", // Use the request value (half/full) or default to "full"
        reason: values.reason,
        // Note: For file uploads, you might need to use FormData instead of JSON
        // file: uploadedFiles.length > 0 ? uploadedFiles[0].file : null,
      };

      // If you need to upload files, you would need to modify the API endpoint to handle FormData
      // For now, we'll send the basic leave request data

      console.log("Submitting leave request:", leaveRequestData);
      
      // Submit the leave request using RTK Query
      const result = await submitLeaveRequest(leaveRequestData).unwrap();
      
      console.log("Leave request submitted successfully:", result);
      
      // Show success message
      toast.success(result.message || "Leave request submitted successfully!");
      
      // Reset form and clear files
    resetForm();
    setUploadedFiles([]);
      
    } catch (error) {
      console.error("Error submitting leave request:", error);
      
      // Show error message
      const errorMessage = error?.data?.message || error?.message || "Failed to submit leave request";
      toast.error(errorMessage);
      
    } finally {
      setSubmitting(false);
    }
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
            <option value="sickLeave">Sick Leave</option>
            <option value="casualLeave">Casual Leave</option>
            <option value="earnedLeave">Earned Leave</option>
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

      {/* File Upload Section */}
      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Supporting Documents (Optional)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Upload PDF files, images, or ZIP files (Max 10MB each)
        </p>
        
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Drag & drop files here, or{' '}
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

        {/* Uploaded Files List */}
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

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-gradient-to-br from-gray-400 to-gray-600 hover:scale-105 text-white font-semibold px-6 py-2 rounded-md transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
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
