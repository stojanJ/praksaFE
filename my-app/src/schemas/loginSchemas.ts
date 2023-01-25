import * as yup from "yup";

export const loginSchemas = yup.object().shape({
  email: yup.string().email("Please enter valide email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
});
