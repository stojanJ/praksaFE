import * as yup from "yup";

const passwordRules = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;

export const loginSchemas = yup.object().shape({
  email: yup.string().email("Please enter valide email").required("Required"),
  password: yup.string().min(5).required("Required"),
});
