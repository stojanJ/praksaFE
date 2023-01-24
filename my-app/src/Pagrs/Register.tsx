import React from "react";
import { withFormik, FormikProps } from "formik";
import { registerSchemas } from "../Schemas/registerSchemas";
import useAuth from "../Hooks/useAuth";

interface FormValues {
  email: string | undefined;
  name: string | undefined;
  password: string | undefined;
}

interface OtherProps {
  message: string;
  register: () => void;
}
interface MyFormProps {
  initialEmail?: string;
  initialName?: string;
  initialPassword?: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    touched,
    message,
    errors,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? "input-error" : ""}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="name"
        placeholder="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.name && touched.name ? "input-error" : ""}
      />
      {errors.name && touched.name && <p className="error">{errors.name}</p>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password ? "input-error" : ""}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

const Register: React.FC<{}> = (props: any) => {
  const { user, register } = useAuth();

  const RegisterForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail,
      name: props.initialName,
      password: props.initialPassword,
    }),
    validationSchema: registerSchemas,

    handleSubmit({ email, name, password }: FormValues) {
      register({ email, name, password });
    },
  })(InnerForm);
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
