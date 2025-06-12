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