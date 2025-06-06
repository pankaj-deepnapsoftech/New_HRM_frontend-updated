import { Api } from "@/store/api/api";


const EmpApi = Api.injectEndpoints({
    endpoints: (build) => ({
        EmpAll: build.mutation({
            query(body) {
                return {
                    url: "/employee/add-data",
                    method: "POST",
                    body
                }
            },
            providesTags: ["Employee"]
        }),
        EpmGetData: build.query({
            query() {
                return {
                    url: "/employee/employees",
                    method: "GET"
                };
            },
            providesTags: ["Employee"]
        }),

        EpmDeleteData: build.mutation({
            query(_id) {
                return {
                    url: `/employee/employee/${_id}`,
                    method: "DELETE"
                };
            },
            providesTags: ["Employee"]
        }),
        EpmUpdateData: build.mutation({
            query(values) {
                return {
                    url: `/employee/employee/${values._id}`,
                    method: "PUT",
                    body:values,
                };
            },
            providesTags: ["Employee"]
        }),
        
    })
})


export const {
    useEmpAllMutation,
    useEpmGetDataQuery,
    useEpmDeleteDataMutation,
    useEpmUpdateDataMutation
} = EmpApi;