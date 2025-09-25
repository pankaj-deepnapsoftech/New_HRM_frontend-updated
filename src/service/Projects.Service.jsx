import { Api } from "@/store/api/api";

const ProjectApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: ({ page = 1 }) => ({
        url: `/projects?page=${page}&limit=10`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    addProject: build.mutation({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: build.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = ProjectApi;
