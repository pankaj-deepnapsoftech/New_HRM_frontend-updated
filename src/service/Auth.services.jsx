import { Api } from "@/store/api/api";


const AuthApi = Api.injectEndpoints({
    endpoints: (build) => ({
        SignUp: build.mutation({
            query(body) {
                return {
                    url: "/user/register",
                    method: "POST",
                    body
                }
            },
            providesTags: ["Auth"]
        }),

        SignIn: build.mutation({
            query(body) {
                return {
                    url: "/user/login",
                    method: "POST",
                    body
                }
            },
            providesTags: ["Auth"]
        }),

        LogedInuser:build.query({
           query:()=>"/user/loged-in-user",
           invalidatesTags:["Auth"]
        })
    })
})


export const {
    useSignUpMutation,
    useSignInMutation,
    useLogedInuserQuery
} = AuthApi;