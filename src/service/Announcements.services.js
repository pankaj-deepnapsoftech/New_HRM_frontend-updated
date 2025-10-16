import { Api } from '@/store/api/api';

export const announcementsApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: () => ({ url: '/announcements', method: 'GET' }),
      providesTags: ['Announcements'],
    }),
    getActiveAnnouncements: builder.query({
      query: () => ({ url: '/announcements/active', method: 'GET' }),
      providesTags: ['Announcements'],
    }),
    createAnnouncement: builder.mutation({
      query: (body) => ({ url: '/announcements', method: 'POST', body }),
      invalidatesTags: ['Announcements'],
    }),
    updateAnnouncement: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/announcements/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Announcements'],
    }),
    deleteAnnouncement: builder.mutation({
      query: (id) => ({ url: `/announcements/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Announcements'],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetActiveAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementsApi;


