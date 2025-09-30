//api.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL,credentials:"include" }),
    endpoints: (builder) => ({
        // Leave Request Endpoints
        submitLeaveRequest: builder.mutation({
            query: (leaveData) => ({
                url: '/leaves/requests',
                method: 'POST',
                body: leaveData,
            }),
            invalidatesTags: ['LeaveRequest'],
        }),
        getLeaveRequests: builder.query({
            query: () => '/leaves/requests',
            providesTags: ['LeaveRequest'],
        }),
        getLeaveRequestById: builder.query({
            query: (id) => `/leaves/requests/${id}`,
            providesTags: ['LeaveRequest'],
        }),
        updateLeaveRequest: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/leaves/requests/${id}/status`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['LeaveRequest'],
        }),
        deleteLeaveRequest: builder.mutation({
            query: (id) => ({
                url: `/leaves/requests/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['LeaveRequest'],
        }),
        getPendingLeaveRequests: builder.query({
            query: () => '/leaves/requests/pending',
            providesTags: ['LeaveRequest'],
        }),
    }),
    tagTypes: ["Auth","Employee", "Project" , "User","Department", "LeaveRequest"],

})

// Export the generated hooks
export const {
    useSubmitLeaveRequestMutation,
    useGetLeaveRequestsQuery,
    useGetLeaveRequestByIdQuery,
    useUpdateLeaveRequestMutation,
    useDeleteLeaveRequestMutation,
    useGetPendingLeaveRequestsQuery
} = Api


