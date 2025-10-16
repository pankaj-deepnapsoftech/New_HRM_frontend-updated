import { Api } from '../store/api/api';

export const designationApi = Api.injectEndpoints({
  tagTypes: ['Designation'],
  endpoints: (builder) => ({
    // Get all designations with pagination
    getAllDesignations: builder.query({
      query: ({ page = 1, limit = 10, search = '', isActive } = {}) => {
        const params = { page, limit, search };
        if (isActive !== undefined && isActive !== null && isActive !== '') {
          params.isActive = isActive;
        }
        return {
          url: '/designations',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Designation'],
    }),

    // Get active designations for dropdowns
    getActiveDesignations: builder.query({
      query: () => '/designations/active',
      providesTags: ['Designation'],
    }),

    // Get designation by ID
    getDesignationById: builder.query({
      query: (id) => `/designations/${id}`,
      providesTags: ['Designation'],
    }),

    // Create designation
    createDesignation: builder.mutation({
      query: (data) => ({
        url: '/designations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Designation'],
    }),

    // Update designation
    updateDesignation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/designations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Designation'],
    }),

    // Delete designation
    deleteDesignation: builder.mutation({
      query: (id) => ({
        url: `/designations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Designation'],
    }),

    // Toggle designation status
    toggleDesignationStatus: builder.mutation({
      query: (id) => ({
        url: `/designations/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Designation'],
    }),
  }),
});

export const {
  useGetAllDesignationsQuery,
  useGetActiveDesignationsQuery,
  useGetDesignationByIdQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
  useToggleDesignationStatusMutation,
} = designationApi;
