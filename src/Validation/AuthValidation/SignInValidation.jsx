import * as Yup from "yup";

export const SignInSchema = Yup.object({
  username: Yup.string().required("please enter your username & email address"),
  password: Yup.string().required("please enter your password"),
});
