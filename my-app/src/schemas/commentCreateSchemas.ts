import * as yup from "yup";

export const commentCreateSchemas = yup.object().shape({
  text: yup.string().required("Required"),
});
