import React from 'react';
import { 
  useGetLeaveRequestsQuery, 
  useGetLeaveRequestByIdQuery,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation 
} from '../store/api/api';

const LeaveRequestDemo = () => {
  // Get all leave requests
  const { data: leaveRequests, error: requestsError, isLoading: requestsLoading } = useGetLeaveRequestsQuery();
  
  // Get specific leave request by ID (example)
  const { data: specificRequest, error: specificError, isLoading: specificLoading } = useGetLeaveRequestByIdQuery('68d7a5caae327711cf2141b5');
  
  // Update leave request mutation
  const [updateLeaveRequest, { isLoading: updateLoading }] = useUpdateLeaveRequestMutation();
  
  // Delete leave request mutation
  const [deleteLeaveRequest, { isLoading: deleteLoading }] = useDeleteLeaveRequestMutation();

  const handleUpdateRequest = async (id, updateData) => {
    try {
      const result = await updateLeaveRequest({ id, ...updateData }).unwrap();
      console.log('Updated successfully:', result);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const result = await deleteLeaveRequest(id).unwrap();
      console.log('Deleted successfully:', result);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (requestsLoading) return <div>Loading leave requests...</div>;
  if (requestsError) return <div>Error loading leave requests: {requestsError.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leave Requests Demo</h2>
      
      {/* Display all leave requests */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">All Leave Requests</h3>
        {leaveRequests?.data?.map((request) => (
          <div key={request._id} className="border p-4 mb-2 rounded">
            <p><strong>Type:</strong> {request.type}</p>
            <p><strong>From:</strong> {new Date(request.from).toLocaleDateString()}</p>
            <p><strong>To:</strong> {new Date(request.to).toLocaleDateString()}</p>
            <p><strong>Mode:</strong> {request.mode}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Created:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
            
            <div className="mt-2 space-x-2">
              <button 
                onClick={() => handleUpdateRequest(request._id, { status: 'approved' })}
                disabled={updateLoading}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button 
                onClick={() => handleDeleteRequest(request._id)}
                disabled={deleteLoading}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display specific request */}
      {specificLoading && <div>Loading specific request...</div>}
      {specificError && <div>Error loading specific request: {specificError.message}</div>}
      {specificRequest && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Specific Request (ID: 68d7a5caae327711cf2141b5)</h3>
          <div className="border p-4 rounded">
            <p><strong>Type:</strong> {specificRequest.data?.type}</p>
            <p><strong>From:</strong> {new Date(specificRequest.data?.from).toLocaleDateString()}</p>
            <p><strong>To:</strong> {new Date(specificRequest.data?.to).toLocaleDateString()}</p>
            <p><strong>Mode:</strong> {specificRequest.data?.mode}</p>
            <p><strong>Status:</strong> {specificRequest.data?.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestDemo;
