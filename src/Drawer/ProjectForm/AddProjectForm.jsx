import { useProjectsAllMutation } from "@/service/Projects.Service";
import Projectschema from "@/Validation/ProjectValidation/ProjectSchema";
// import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { IoIosClose } from "react-icons/io";
import Select from "react-select";

const AddProjectForm = ({ setShowModal }) => {
  const [ProjectsData] = useProjectsAllMutation();

  const availableManager = [
    { label: "Pankaj", value: "Pankaj" },
    { label: "Deepak", value: "Deepak" },
    { label: "Arohi", value: "Arohi" },
    { label: "Manpreet", value: "Manpreet" },
  ];

  const availableMembers = [
    { label: "Ashish", value: "Ashish" },
    { label: "Aman", value: "Aman" },
    { label: "Sneha", value: "Sneha" },
    { label: "Rahul", value: "Rahul" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      manager: [],
      members: [],
      startDate: "",
      endDate: "",
      description: "",
    },
    validationSchema: Projectschema,
    onSubmit: async (values) => {
      try {
        // Convert manager and members from react-select object array to plain values
        const payload = {
          name: values.name,
          manager: values.manager.map((m) => m.value),
          members: values.members.map((m) => m.value),
          startDate: values.startDate,
          endDate: values.endDate,
          description: values.description,
        };

        const res = await ProjectsData(payload).unwrap();
        // console.log("Project created:", res);

        formik.resetForm();
        setShowModal(false);
      } catch (error) {
        console.log("Error submitting project:", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative w-full max-w-2xl mx-auto p-6 bg-white rounded shadow-md space-y-6"
    >
      {/* Close Button */}
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
        onClick={() => setShowModal(false)}
        aria-label="Close"
      >
        <IoIosClose size={32} />
      </button>

      {/* Project Name */}
      <div>
        <label className="block font-medium text-sm mb-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter Project Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2 focus:outline-blue-500"
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Manager */}
        <div className="flex-1">
          <label className="block font-medium text-sm mb-1">
            Select Manager <span className="text-red-500">*</span>
          </label>
          <Select
            isMulti
            name="manager"
            options={availableManager}
            value={formik.values.manager}
            onChange={(value) => formik.setFieldValue("manager", value)}
            onBlur={() => formik.setFieldTouched("manager", true)}
            classNamePrefix="react-select"
          />
          {formik.touched.manager && formik.errors.manager && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.manager}
            </div>
          )}
        </div>

        {/* Members */}
        <div className="flex-1">
          <label className="block font-medium text-sm mb-1">
            Select Member <span className="text-red-500">*</span>
          </label>
          <Select
            isMulti
            name="members"
            options={availableMembers}
            value={formik.values.members}
            onChange={(value) => formik.setFieldValue("members", value)}
            classNamePrefix="react-select"
          />
          <div className="text-xs text-gray-600 mt-1">
            Selected Members: {formik.values.members.length} member
            {formik.values.members.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-medium text-sm mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            name="endDate"
            type="date"
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium text-sm mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            name="endDate"
            type="date"
            className="w-full border border-gray-300 bg-gray-50 rounded px-4 py-2"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-sm mb-1">
          Project Description
        </label>
        <textarea
          name="description"
          placeholder="Project Description"
          className={`w-full border px-4 py-2 rounded bg-gray-50 ${
            formik.touched.description && formik.errors.description
              ? "border-red-500"
              : "border-gray-300"
          }`}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.description}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
