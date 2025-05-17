import * as Yup from "yup"

export const SignUpSchema = Yup.object({
    fullName:Yup.string().required("please write your full name"),
    email: Yup.string().email("email must be unique").required("please write your full name"),
     password: Yup.string().required("please write you password"),
    phone: Yup.number().required("please write you phone"),
    username: Yup.string().required("please write you user name"),
    employeeId: Yup.string().required("please write your employee id")
})