import { Api } from "@/store/api/api";

const EmpApi = Api.injectEndpoints({
  endpoints: (build) => ({
    EmpAll: build.mutation({
      query(body) {
        return {
          url: "/employee/add-data",
          method: "POST",
          body,
        };
      },
      providesTags: ["Employee"],
    }),
    EpmGetData: build.query({
      query({page = 1}) {
        return {
          url: `/employee/employees?page=${page}&limit=10`,
          method: "GET",
        };
      },
      providesTags: ["Employee"],
    }),

    EpmDeleteData: build.mutation({
      query(_id) {
        return {
          url: `/employee/employee/${_id}`,
          method: "DELETE",
        };
      },
      providesTags: ["Employee"],
    }),
    EpmUpdateData: build.mutation({
      query(values) {
        return {
          url: `/employee/employee/${values._id}`,
          method: "PUT",
          body: values,
        };
      },
      providesTags: ["Employee"],
    }),

    EmpLocationList: build.query({
      query: () => ({
        url: "/employee/locations",
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
  }),
});

export const {
  useEmpAllMutation,
  useEpmGetDataQuery,
  useEpmDeleteDataMutation,
  useEpmUpdateDataMutation,
  useEmpLocationListQuery
} = EmpApi;
