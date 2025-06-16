
import { Api } from "@/store/api/api";

const ProjectApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: ({page = 1}) => ({
        url:`/projects?page=${page}&limit=10`, 
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
  }),
});

export const {
  useGetAllProjectsQuery,
  useAddProjectMutation,
} = ProjectApi;
