// ProjectSchema.js
import * as Yup from "yup";

const Projectschema = Yup.object({
  name: Yup.string()
    .required("Project name is required")
    .min(2, "Too short")
    .max(50, "Too long"),

  manager: Yup.array()
    .min(1, "Please select at least one manager")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),

  members: Yup.array()
    .min(1, "Please select at least one member")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),

  startDate: Yup.date()
    .required("Start Date is required")
    .typeError("Start Date must be a valid date"),

  endDate: Yup.date()
    .required("End Date is required")
    .typeError("End Date must be a valid date"),

  description: Yup.string()
    .required("Description is required")
    .min(5, "Too short"),
});

export default Projectschema;
