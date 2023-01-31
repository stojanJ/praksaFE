import * as yup from "yup";

export const movieCreateSchemas = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  genre: yup.array().required("Please enter website"),
});
