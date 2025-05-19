import * as Yup from "yup"

export const SignUpSchema = Yup.object({
    fullName:Yup.string().required("please enter your full name"),
    email: Yup.string().email("email must be unique").required("please enter your full name"),
     password: Yup.string().min(6).required("please enter you password"),
    phone: Yup.number().required("please enter you phone"),
    username: Yup.string().required("please enter you user name"),
    employeeId: Yup.string().required("please enter your employee id")
})