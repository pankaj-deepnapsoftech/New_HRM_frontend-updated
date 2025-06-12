import React, { useState } from 'react';
import AddProjectForm from '@/Drawer/ProjectForm/AddProjectForm';

const employees =[
  {
    projectName: "CRM",
    member: "Ashish",
    manager: "Abhi",
    startDate: "20-12-2024",
    endDate: "15-03-2025",
  },
  {
    projectName: "HRM",
    member: "Aman",
    manager: "Deepak",
    startDate: "10-01-2024",
    endDate: "09-03-2025",
  },
];

const Projects = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddProject = () => {
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Projects</h2>
      </div>
    
      {/* 🔽 Date Range + Add Button Section */}
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
    onClick={handleAddProject}
    className="bg-gradient-to-br from-slate-400 to bg-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md w-fit"
  >
    ADD PROJECT DETAILS
  </button>
</div>


      {/* 🔽 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
          <div >
            <AddProjectForm setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {/* 🔽 Table Section */}
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
            {employees.map((emp, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <td className="p-3 px-2">{emp.projectName}</td>
                <td className="p-3 px-2">{emp.member}</td>
                <td className="p-3 px-2">{emp.manager}</td>
                <td className="p-3 px-2">{emp.startDate}</td>
                <td className="p-3 px-2">{emp.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
