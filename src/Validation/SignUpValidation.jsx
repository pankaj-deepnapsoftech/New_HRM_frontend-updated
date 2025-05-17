import * as Yup from "yup"

export const SignUpSchema = Yup.object({
    full_name:Yup.string().required("please write your full name"),
    email: Yup.string().email("email must be unique").required("please write your full name"),
     password: Yup.string().required("please write you password"),
    user_name: Yup.string().required("please write you user name"),
    employee_id: Yup.string().required("please write your employee id")
})