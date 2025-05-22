import * as Yup from "yup";

const EmpDetailsSchema = Yup.object({
   

    Designation: Yup.string()
        .required("Designation is required")
        .min(2, "Too short")
        .max(50, "Too long"),

    Department: Yup.string()
        .required("Department is required")
        .min(2, "Too short")
        .max(50, "Too long"),

    Address: Yup.string()
        .required("Address is required")
        .min(5, "Address is too short"),

    salary: Yup.number()
        .required("Salary is required")
        .typeError("Salary must be a number")
        .positive("Salary must be positive"),

    photo: Yup.mixed()
        .required("Photo is required"),
       

    pancard: Yup.mixed()
        .required("PAN card is required"),

    aadhaar: Yup.mixed()
        .required("Aadhaar number is required"),

    Back_Name: Yup.string()
        .required("Bank name is required"),

    Bank_Account: Yup.string()
        .required("Bank account number is required"),

    IFSC_Code: Yup.string()
        .required("IFSC Code is required"),

    Bank_Proof: Yup.mixed()
        .required("Bank proof is required")
   
});

export default EmpDetailsSchema;
