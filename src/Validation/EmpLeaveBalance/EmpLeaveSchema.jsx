// @/Validation/EmpLeaveBalance/EmpLeaveSchema.js
import * as Yup from "yup";

const EmpLeaveSchema = Yup.object({
  employee: Yup.object()
    .required("Please select an employee")
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),

  leaveType: Yup.object()
    .required("Please select leave type")
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),

  action: Yup.object()
    .required("Please select an action")
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),

  days: Yup.number()
    .required("Please enter number of days")
    .min(0.5, "Minimum 0.5 day"),
});

export default EmpLeaveSchema;
