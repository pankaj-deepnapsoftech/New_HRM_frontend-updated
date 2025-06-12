<<<<<<< HEAD
  import { Api } from "@/store/api/api";
  
  
  const Projects = Api.injectEndpoints({
      endpoints: (build) => ({

          ProjectsAll: build.mutation({
              query(body) {
                  return {
                      url: "/projects",
                      method: "POST",
                      body
                  }
              },
              providesTags: ["Projects"]
          }),
      })
  })
  

  export const {
     useProjectsAllMutation
  } = Projects;
=======

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
>>>>>>> 51c2af1f9991da0cf5edadbaab084a09ce302c7b
