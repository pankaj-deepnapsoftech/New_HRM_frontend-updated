import { Api } from "../store/api/api";

export const gatepassApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new gatepass request
    createGatepassRequest: builder.mutation({
      query: (gatepassData) => ({
        url: "/gatepass/",
        method: "POST",
        body: gatepassData,
      }),
      invalidatesTags: ["Gatepass"],
    }),

    // Get all gatepass requests (for admin)
    getAllGatepassRequests: builder.query({
      query: ({ status = "all", page = 1, limit = 10 } = {}) => ({
        url: `/gatepass/?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Gatepass"],
    }),

    // Get employee's gatepass requests
    getEmployeeGatepassRequests: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/gatepass/employee?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Gatepass"],
    }),

    // Get gatepass request by ID
    getGatepassRequestById: builder.query({
      query: (id) => ({
        url: `/gatepass/${id}`,
        method: "GET",
      }),
      providesTags: ["Gatepass"],
    }),

    // Update gatepass status (approve/reject)
    updateGatepassStatus: builder.mutation({
      query: ({ id, status, rejectionReason }) => ({
        url: `/gatepass/${id}/status`,
        method: "PUT",
        body: { status, rejectionReason },
      }),
      invalidatesTags: ["Gatepass"],
    }),

    // Delete gatepass request
    deleteGatepassRequest: builder.mutation({
      query: (id) => ({
        url: `/gatepass/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gatepass"],
    }),
  }),
});

export const {
  useCreateGatepassRequestMutation,
  useGetAllGatepassRequestsQuery,
  useGetEmployeeGatepassRequestsQuery,
  useGetGatepassRequestByIdQuery,
  useUpdateGatepassStatusMutation,
  useDeleteGatepassRequestMutation,
} = gatepassApi;
