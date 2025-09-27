import { Api } from "@/store/api/api";

export const departmentApi = Api.injectEndpoints({
    endpoints: (builder) => ({

        getAllDepartment: builder.query({
            query: () => ({
                url: `/departments`,
                method: "GET",
            }),
            providesTags: ["Departments"],
        }),

        addDepartmentData: builder.mutation({
            query: (body) => ({
                url: "/departments/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Departments"],
        }),

        updatedDepartmentData: builder.mutation({
            query: ({ _id, ...rest }) => ({
                url: `/departments/${_id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Departments"],
        }),

        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/departments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Departments"],
        }),

    }),
});

export const {
  useAddDepartmentDataMutation,useGetAllDepartmentQuery,useDeleteDepartmentMutation,useUpdatedDepartmentDataMutation
} = departmentApi;