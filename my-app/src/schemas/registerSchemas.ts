import * as yup from "yup";

export const registerSchemas = yup.object().shape({
  email: yup.string().email("Please enter valide email").required("Required"),
  name: yup.string().min(2).required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Required"),
});
