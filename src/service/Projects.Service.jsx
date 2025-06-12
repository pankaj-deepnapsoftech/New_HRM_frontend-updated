
import { Api } from "@/store/api/api";

const ProjectApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: () => ({
        url: "/projects", // make sure this is your backend route
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
