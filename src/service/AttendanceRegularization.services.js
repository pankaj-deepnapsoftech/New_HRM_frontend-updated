import { Api } from '@/store/api/api';

export const attendanceRegularizationApi = Api.injectEndpoints({
  tagTypes: ['AttendanceRegularization'],
  endpoints: (builder) => ({
    // Create attendance regularization request
    createRegularizationRequest: builder.mutation({
      query: (data) => ({
        url: '/attendance-regularization/request',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AttendanceRegularization'],
    }),

    // Get pending regularization requests (for admin)
    getPendingRequests: builder.query({
      query: () => '/attendance-regularization/pending',
      providesTags: ['AttendanceRegularization'],
    }),

    // Get regularization requests by employee
    getEmployeeRequests: builder.query({
      query: ({ employeeId, status, page = 1, limit = 10 }) => ({
        url: `/attendance-regularization/employee/${employeeId}`,
        params: { status, page, limit },
      }),
      providesTags: ['AttendanceRegularization'],
    }),

    // Update regularization request status (approve/reject)
    updateRequestStatus: builder.mutation({
      query: ({ requestId, status, managerRemark, approvedBy }) => ({
        url: `/attendance-regularization/request/${requestId}/status`,
        method: 'PATCH',
        body: { status, managerRemark, approvedBy },
      }),
      invalidatesTags: ['AttendanceRegularization'],
    }),

    // Get regularization request by ID
    getRequestById: builder.query({
      query: (requestId) => `/attendance-regularization/request/${requestId}`,
      providesTags: ['AttendanceRegularization'],
    }),

    // Delete regularization request
    deleteRequest: builder.mutation({
      query: (requestId) => ({
        url: `/attendance-regularization/request/${requestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AttendanceRegularization'],
    }),
  }),
});

export const {
  useCreateRegularizationRequestMutation,
  useGetPendingRequestsQuery,
  useGetEmployeeRequestsQuery,
  useUpdateRequestStatusMutation,
  useGetRequestByIdQuery,
  useDeleteRequestMutation,
} = attendanceRegularizationApi;

// Alias for backward compatibility with existing user files
export const useGetEmployeeRegularizationRequestsQuery = useGetEmployeeRequestsQuery;

// Service functions for manual API calls
export const AttendanceRegularizationService = {
  // Create request
  createRequest: async (data) => {
    const token = localStorage.getItem('token');
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create request');
    }
    
    return response.json();
  },

  // Get pending requests
  getPendingRequests: async () => {
    const token = localStorage.getItem('token');
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/pending`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch pending requests');
    }
    
    return response.json();
  },

  // Update request status
  updateRequestStatus: async (requestId, status, managerRemark, approvedBy) => {
    const token = localStorage.getItem('token');
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/request/${requestId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status, managerRemark, approvedBy }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to ${status} request`);
    }
    
    return response.json();
  },

  // Get employee requests
  getEmployeeRequests: async (employeeId, status, page = 1, limit = 10) => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams({ page, limit });
    if (status) params.append('status', status);
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/employee/${employeeId}?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch employee requests');
    }
    
    return response.json();
  },

  // Get request by ID
  getRequestById: async (requestId) => {
    const token = localStorage.getItem('token');
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/request/${requestId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch request details');
    }
    
    return response.json();
  },

  // Delete request
  deleteRequest: async (requestId) => {
    const token = localStorage.getItem('token');
    const origin = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '').replace(/\/+$/, '').replace(/\/api(?:\/v1)?$/i, '')
    const response = await fetch(`${origin}/api/v1/attendance-regularization/request/${requestId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete request');
    }
    
    return response.json();
  },
};