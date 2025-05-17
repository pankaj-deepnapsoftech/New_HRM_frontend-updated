import { Api } from "@/store/api/api";


const AuthApi = Api.injectEndpoints({
    endpoints:(build)=>({
        SignUp:build.mutation({
            query(body){
                return {
                    url:"/user/register",
                    method:"POST",
                    body
                }
            },
            providesTags:["Auth"]
        })
    })
})


export const {
    useSignUpMutation
} = AuthApi;