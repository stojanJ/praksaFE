import React from "react";
import { withFormik, FormikProps } from "formik";
import { movieCreateSchemas } from "../Schemas/movieCreateSchemas";
import { movieService } from "../Services/MovieService";
import useAuth from "../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

interface FormValues {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  genre: Array<string> | undefined;
}

interface OtherProps {
  message: string;
}
interface MyFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialImage?: string;
  initialGenre?: Array<string>;
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
    <Form onSubmit={handleSubmit} autoComplete="off">
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            id="title"
            type="title"
            placeholder="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title && touched.title ? "input-error" : ""}
          />
        </Form.Group>
        {errors.title && touched.title && (
          <p className="error">{errors.title}</p>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="description"
            type="description"
            placeholder="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.description && touched.description ? "input-error" : ""
            }
          />
        </Form.Group>
        {errors.description && touched.description && (
          <p className="error">{errors.description}</p>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="url">Image</Form.Label>
          <Form.Control
            id="url"
            type="url"
            placeholder="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.url && touched.url ? "input-error" : ""}
          />
        </Form.Group>
        {errors.url && touched.url && <p className="error">{errors.url}</p>}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="genre">Genre</Form.Label>
          <Form.Select
            name="genre"
            value={values.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ display: "block" }}
            id="genre"
          >
            <option value="" label="Select a genre">
              Select a genre{" "}
            </option>
            <option value="action" label="action">
              {" "}
              Action
            </option>
            <option value="drama" label="drama">
              Drama
            </option>
            <option value="documentary" label="documentary">
              Documentary
            </option>
            <option value="horror" label="horror">
              Horror
            </option>
            <option value="comedy" label="comedy">
              Comedy
            </option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};

const CreateMovie: React.FC<{}> = (props: any) => {
  const { user } = useAuth();
  let user_id = user.id;
  const CreateMoviForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => ({
      title: props.initialTitle,
      description: props.initialDescription,
      url: props.initialImage,
      genre: props.initialGenre,
    }),
    validationSchema: movieCreateSchemas,

    handleSubmit({ title, description, url, genre }: FormValues) {
      movieService.postMovies({ title, description, url, genre, user_id });
    },
  })(InnerForm);
  return (
    <div>
      <CreateMoviForm />
    </div>
  );
};

export default CreateMovie;
