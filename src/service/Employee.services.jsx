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
    })
})


export const {
    useEmpAllMutation,
} = EmpApi;