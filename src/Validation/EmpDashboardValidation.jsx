import * as Yup from "yup";

export const validationSchema = Yup.object({
  fname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  department: Yup.string().required("Department is required"),
  designation: Yup.string().required("Designation is required"),
  // empCode: Yup.string().required("Employee code is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be positive")
    .required("Salary is required"),
  location: Yup.string().required("Location is required"),
  date: Yup.date().required("Date is required"),
});
