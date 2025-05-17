
import * as Yup from "yup"

 export const SignInSchema = Yup.object({
    userName_address:Yup.string().required("please write your username & email address"),
    password:Yup.string().required("please write your password")
 })