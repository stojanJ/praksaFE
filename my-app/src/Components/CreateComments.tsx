import { withFormik, FormikProps, Field } from "formik";
import useAuth from "../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { commentCreateSchemas } from "../Schemas/commentCreateSchemas";
import { commentService } from "../Services/CommentService";
interface FormValues {
  text: string | undefined;
}

interface OtherProps {
  message: string;
}
interface MyFormProps {
  initialText?: string;
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
          <Form.Label htmlFor="text">Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="text"
            type="text"
            placeholder="Comment"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.text && touched.text ? "input-error" : ""}
          />
        </Form.Group>
        {errors.text && touched.text && <p className="error">{errors.text}</p>}
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};

const CreateComment: React.FC = () => {
  const { user } = useAuth();
  const { movie_id } = useParams();

  const user_id = user.id;

  const CreateCommentForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => ({
      text: "",
    }),
    validationSchema: commentCreateSchemas,

    handleSubmit({ text }: FormValues) {
      commentService.postComment({
        user_id,
        movie_id,
        text,
      });
    },
  })(InnerForm);
  return (
    <div>
      <CreateCommentForm />
    </div>
  );
};

export default CreateComment;
