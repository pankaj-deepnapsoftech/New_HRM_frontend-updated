import { Api } from "@/store/api/api";


const AuthApi = Api.injectEndpoints({
    endpoints: (build) => ({
        SignIn: build.mutation({
            query(body) {
                return {
                    url: "/user/login",
                    method: "POST",
                    body
                }
            },
            providesTags: ["Auth"]
        })
    })
})


export const {
    useSignInMutation
} = AuthApi;