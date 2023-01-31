import React from "react";
import { withFormik, FormikProps } from "formik";
import { loginSchemas } from "../Schemas/loginSchemas";
import useAuth from "../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

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
    errors,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  return (
    <Form onSubmit={handleSubmit} autoComplete="off" style={{ width: "80%" }}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
        </Form.Group>
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Image</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
        </Form.Group>
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </fieldset>
    </Form>
  );
};

const Login: React.FC<{}> = (props: any) => {
  const { login } = useAuth();
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
