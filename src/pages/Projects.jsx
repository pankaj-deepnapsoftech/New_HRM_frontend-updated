import React, { useState } from "react";
import Select from "react-select";
import {
  useGetAllProjectsQuery,
  useAddProjectMutation,
} from "@/service/Projects.Service";
import { useGetAllUsersQuery } from "@/service/User.services";
import { IoIosClose } from "react-icons/io";

const Projects = () => {
  const { data, refetch, isLoading } = useGetAllProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const { data: userData } = useGetAllUsersQuery();
  const users = userData || [];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    members: [],
    startDate: "",
    endDate: "",
    description: "",
  });

  // Convert users to react-select format
  const userOptions = users.map((user) => ({
    label: user.fullName,
    value: user._id,
  }));

  const getSelectedOptions = (options, selectedIds) =>
    options.filter((option) => selectedIds.includes(option.value));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      manager: formData.manager,
      members: formData.members,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
    };

    try {
      await addProject(payload).unwrap();
      setFormData({
        name: "",
        manager: "",
        members: [],
        startDate: "",
        endDate: "",
        description: "",
      });
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const projects = data?.data?.projectDetails || [];
 const filteredProjects = projects.filter((project) => {
  if (!startDate && !endDate) return true;

  const projectStart = new Date(project.startDate);
  const projectEnd = new Date(project.endDate);
  const filterStart = startDate ? new Date(startDate) : null;
  const filterEnd = endDate ? new Date(endDate) : null;

  if (filterStart && projectEnd < filterStart) return false;
  if (filterEnd && projectStart > filterEnd) return false;

  return true;
});

  if (isLoading) return <p className="text-center py-10">Loading projects…</p>;

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Projects</h2>
      </div>

      {/* Date Range + Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <label className="font-semibold text-md">Select date range:</label>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label className="font-semibold text-sm text-gray-600">From-</label>
            <input
              type="date"
              className="border border-gray-400 px-3 py-2 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label className="font-semibold text-sm text-gray-600">To-</label>
            <input
              type="date"
              className="border border-gray-400 px-3 py-2 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md w-fit"
        >
          ADD PROJECT DETAILS
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-xl shadow-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <IoIosClose size={32} />
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Project Name */}
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              {/* Select Manager (React-Select) */}
              <div>
                <label className="block font-medium text-sm mb-1">
                  Select Manager <span className="text-red-500">*</span>
                </label>
                <Select
                  name="manager"
                  options={userOptions}
                  value={
                    userOptions.find((opt) => opt.value === formData.manager) ||
                    null
                  }
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      manager: selected ? selected.value : "",
                    }))
                  }
                  classNamePrefix="react-select"
                />
              </div>

              {/* Select Members (React-Select Multi) */}
              <div>
                <label className="block font-medium text-sm mb-1">
                  Select Members <span className="text-red-500">*</span>
                </label>
                <Select
                  isMulti
                  name="members"
                  options={userOptions}
                  value={getSelectedOptions(userOptions, formData.members)}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      members: selected ? selected.map((opt) => opt.value) : [],
                    }))
                  }
                  classNamePrefix="react-select"
                />
              </div>

              {/* Dates */}
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-1/2 border px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Description */}
              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Action Buttons */}

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Table */}
      <div className="overflow-x-auto scrollbar-visible shadow-lg rounded-t-sm md:rounded-t-lg">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700 text-sm font-[600] uppercase">
            <tr>
              <th className="px-2 py-3 text-left">Project Name</th>
              <th className="px-2 py-3 text-left">Member</th>
              <th className="px-2 py-3 text-left">Manager</th>
              <th className="px-2 py-3 text-left">Start-Date</th>
              <th className="px-2 py-3 text-left">End-Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, idx) => (
              <tr
                key={project._id}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-3 px-2">{project.name}</td>
                <td className="p-3 px-2">
                  {project.members?.length > 0
                    ? project.members
                        .map((m) => m.fullName || "Unknown")
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="p-3 px-2">
                  {project.manager?.fullName || "N/A"}
                </td>
                <td className="p-3 px-2">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="p-3 px-2">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
