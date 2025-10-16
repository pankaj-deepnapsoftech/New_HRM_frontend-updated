import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import {
  useGetAllDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
  useToggleDesignationStatusMutation,
} from '../service/Designation.services';

const DesignationManagement = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [formData, setFormData] = useState({
    designationName: '',
    description: '',
  });

  const { data, isLoading, refetch } = useGetAllDesignationsQuery({
    page,
    limit: 10,
    search,
  });

  const [createDesignation] = useCreateDesignationMutation();
  const [updateDesignation] = useUpdateDesignationMutation();
  const [deleteDesignation] = useDeleteDesignationMutation();
  const [toggleStatus] = useToggleDesignationStatusMutation();

  const designations = data?.data || [];
  const pagination = data?.pagination || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.designationName.trim()) {
      toast.error('Designation name is required');
      return;
    }

    try {
      if (editMode && selectedDesignation) {
        await updateDesignation({
          id: selectedDesignation._id,
          ...formData,
        }).unwrap();
        toast.success('Designation updated successfully');
      } else {
        await createDesignation(formData).unwrap();
        toast.success('Designation created successfully');
      }
      
      setShowModal(false);
      setEditMode(false);
      setSelectedDesignation(null);
      setFormData({ designationName: '', description: '' });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save designation');
    }
  };

  const handleEdit = (designation) => {
    setSelectedDesignation(designation);
    setEditMode(true);
    setFormData({
      designationName: designation.designationName,
      description: designation.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this designation?')) {
      try {
        await deleteDesignation(id).unwrap();
        toast.success('Designation deleted successfully');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete designation');
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success('Designation status updated');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({ designationName: '', description: '' });
    setEditMode(false);
    setSelectedDesignation(null);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading designations...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-6xl mx-auto mt-10">
      <div className="bg-gray-300 text-center py-4 my-8 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Designation Management</h2>
      </div>

      {/* Header with search and add button */}
      <div className="flex justify-between mb-4 gap-4 flex-wrap">
        <div className="flex gap-4 flex-wrap flex-1">
          <input
            type="text"
            placeholder="Search designations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg flex-1 min-w-[250px] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white px-5 py-3 rounded-lg shadow-lg hover:scale-105 transition transform font-semibold flex items-center gap-2"
        >
          <FaPlus />
          ADD DESIGNATION
        </button>
      </div>

      {/* Designations Table */}
      <div className="overflow-x-auto shadow-lg rounded">
        <table className="w-full min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-200 whitespace-nowrap text-gray-700 uppercase font-semibold">
            <tr>
              <th className="p-3 text-left">Designation Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {designations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No designations found
                </td>
              </tr>
            ) : (
              designations.map((designation, idx) => (
                <tr
                  key={designation._id}
                  className={`border-b whitespace-nowrap border-gray-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <td className="pl-4 py-2 px-2 text-[16px] font-medium">
                    {designation.designationName}
                  </td>
                  <td className="pl-4 py-2 px-2 text-[16px]">
                    {designation.description || 'N/A'}
                  </td>
                  <td className="pl-4 py-2 px-2 text-[16px]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        designation.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {designation.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="pl-4 py-2 px-2 text-[16px]">
                    {new Date(designation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="pl-4 py-2 px-2 text-[16px] flex gap-3">
                    <FaEdit
                      onClick={() => handleEdit(designation)}
                      className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                      title="Edit"
                    />
                    <button
                      onClick={() => handleToggleStatus(designation._id)}
                      className="text-gray-600 hover:scale-110 transition-transform"
                      title={designation.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {designation.isActive ? (
                        <FaToggleOn className="text-green-500" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                    <FaTrash
                      onClick={() => handleDelete(designation._id)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                      title="Delete"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-md relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
            >
              <IoIosClose size={32} />
            </button>

            <h3 className="text-lg font-[600] mb-4">
              {editMode ? 'Edit Designation' : 'Add New Designation'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Designation Name"
                  value={formData.designationName}
                  onChange={(e) =>
                    setFormData({ ...formData, designationName: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-gray-300"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-gray-300 h-20 resize-none"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-slate-400 to-slate-600 hover:scale-105 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  {editMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationManagement;
