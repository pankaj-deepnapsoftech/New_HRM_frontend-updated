import React from "react";
import { IoMdClose } from "react-icons/io";

const ProjectViewModal = ({ showDetailModal, setShowDetailModal, project }) => {
  if (!project) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex justify-center items-center transition-all duration-500 ${
        showDetailModal ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowDetailModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoMdClose size={22} />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mt-3">
            {project.name || "No Name"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">Project Details</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-sm space-y-3">
          <div className="flex justify-between border-b py-2 text-gray-700">
            <span className="font-medium">Project Name:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {project.name || "-"}
            </span>
          </div>

          <div className="flex justify-between border-b py-2 text-gray-700">
            <span className="font-medium">Manager:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {project.manager?.fname || "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b py-2 text-gray-700">
            <span className="font-medium">Members:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {project.members?.length > 0
                ? project.members.map((m) => m.fname || "Unknown").join(", ")
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b py-2 text-gray-700">
            <span className="font-medium">Start Date:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {formatDate(project.startDate)}
            </span>
          </div>

          <div className="flex justify-between border-b py-2 text-gray-700">
            <span className="font-medium">End Date:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {formatDate(project.endDate)}
            </span>
          </div>

          <div className="flex justify-between py-2 text-gray-700">
            <span className="font-medium">Description:</span>
            <span className="text-right text-gray-800 break-words max-w-[60%]">
              {project.description || "No description"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewModal;
