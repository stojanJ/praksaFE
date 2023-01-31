import React from "react";
import { withFormik, FormikProps } from "formik";
import { registerSchemas } from "../Schemas/registerSchemas";
import useAuth from "../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

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
    errors,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  return (
    <Form onSubmit={handleSubmit} autoComplete="off" style={{ width: "80%" }}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          id="email"
          type="email"
          placeholder="email"
          style={{ width: "40%" }}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
      </Form.Group>
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          id="name"
          type="name"
          placeholder="name"
          style={{ width: "40%" }}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""}
        />
      </Form.Group>
      {errors.name && touched.name && <p className="error">{errors.name}</p>}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          placeholder="password"
          style={{ width: "40%" }}
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
        Register
      </Button>
    </Form>
  );
};

const Register: React.FC<{}> = (props: any) => {
  const { register } = useAuth();

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
