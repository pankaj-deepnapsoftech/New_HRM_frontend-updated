// src/service/LeaveRequest.services.js
import { Api } from "../store/api/api";

export const leaveRequestApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // Leave Request Endpoints
    submitLeaveRequest: builder.mutation({
      query: (leaveData) => ({
        url: "/leaves/requests",
        method: "POST",
        body: leaveData,
      }),
      invalidatesTags: ["LeaveRequest"],
    }),
    getLeaveRequests: builder.query({
      query: () => "/leaves/requests",
    }),
    getLeaveRequestById: builder.query({
      query: (id) => `/leaves/requests/${id}`,
    }),
    updateLeaveRequest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/leaves/requests/${id}/status`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `/leaves/requests/${id}`,
        method: "DELETE",
      }),
    }),
    getPendingLeaveRequests: builder.query({
      query: () => "/leaves/requests/pending",
    }),
    getEmployeeLeaves: builder.query({
      query: ({ employeeId, year }) => `/leaves/leaves/${employeeId}/${year}`,
    }),
    getEmployeeLeaveRequests: builder.query({
      query: ({ employeeId, year }) => `/leaves/requests/${employeeId}/${year}`,
      providesTags: ["LeaveRequest"],
    }),
  }),
});

export const {
  useSubmitLeaveRequestMutation,
  useGetLeaveRequestsQuery,
  useGetLeaveRequestByIdQuery,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useGetPendingLeaveRequestsQuery,
  useGetEmployeeLeavesQuery,
  useGetEmployeeLeaveRequestsQuery,
} = leaveRequestApi;
