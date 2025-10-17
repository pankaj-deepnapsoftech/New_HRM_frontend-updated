import { Api } from "../store/api/api";

export const resignationApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        // Employee services
        createResignationRequest: builder.mutation({
            query: (data) => ({
                url: "/resignation/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ResignationRequest"],
        }),

        getEmployeeResignationRequests: builder.query({
            query: () => ({
                url: "/resignation/employee",
                method: "GET",
            }),
            providesTags: ["ResignationRequest"],
        }),

        cancelResignationRequest: builder.mutation({
            query: (id) => ({
                url: `/resignation/cancel/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ResignationRequest"],
        }),

        // Admin services
        getResignationRequests: builder.query({
            query: (params = {}) => ({
                url: "/resignation/admin",
                method: "GET",
                params,
            }),
            providesTags: ["ResignationRequest"],
        }),

        getResignationRequestById: builder.query({
            query: (id) => ({
                url: `/resignation/admin/${id}`,
                method: "GET",
            }),
            providesTags: ["ResignationRequest"],
        }),

        updateResignationRequestStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/resignation/admin/${id}/status`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["ResignationRequest"],
        }),
    }),
});

export const {
    useCreateResignationRequestMutation,
    useGetEmployeeResignationRequestsQuery,
    useCancelResignationRequestMutation,
    useGetResignationRequestsQuery,
    useGetResignationRequestByIdQuery,
    useUpdateResignationRequestStatusMutation,
} = resignationApi;

export default resignationApi;
