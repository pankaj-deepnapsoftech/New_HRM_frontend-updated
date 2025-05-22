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

        LogedInuser: build.query({
            query: () => "/user/loged-in-user",
            invalidatesTags: ["Auth"]
        }),
        
        LogoutUser: build.mutation({
            query() {
                return {
                    url: "/user/logout",
                    method: "GET"
                }
            },
            providesTags: ["Auth"]
        }),

        ForgotPassword: build.mutation({
            query(body) {
                return {
                    url: "/user/forget-password",
                    method: "POST",
                    body,
                };
            },
            providesTags: ["Auth"],
        }),
        
        ChangePassword: build.mutation({
            query(body) {
                return {
                    url: "/user/change-password",
                    method: "PUT",
                    body
                };
            },
            providesTags: ["Auth"]
        }),
          
        
        

    })
})


export const {
    useSignUpMutation,
    useSignInMutation,
    useLogedInuserQuery,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
} = AuthApi;