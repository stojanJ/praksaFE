import React from "react";
import { withFormik, FormikProps } from "formik";
import { loginSchemas } from "../Schemas/loginSchemas";
import useAuth from "../Hooks/useAuth";

interface FormValues {
  email: string | undefined;
  password: string | undefined;
}

interface OtherProps {
  message: string;
}
interface MyFormProps {
  initialEmail?: string;
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
        Login
      </button>
    </form>
  );
};

const Login: React.FC<{}> = (props: any) => {
  const { user, login } = useAuth();

  const LoginForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail,
      password: props.initialPassword,
    }),
    validationSchema: loginSchemas,

    handleSubmit({ email, password }: FormValues) {
      login({ email, password });
    },
  })(InnerForm);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
