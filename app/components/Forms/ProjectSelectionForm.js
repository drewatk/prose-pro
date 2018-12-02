import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Button } from "reactstrap";

import { required } from "./validators";

import styles from "./ProjectSelectionForm.scss";

const ProjectList = ({ projects, handleSubmit, submitting, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        data-test-id="project-select-field"
        name="project"
        component="select"
        validate={[required]}
      >
        <option />
        {projects.map((project, index) => {
          return (
            <option key={index} value={project.name}>
              {project}
            </option>
          );
        })}
      </Field>
    </FormGroup>
    <Button
      type="submit"
      size="sm"
      color="secondary"
      disabled={submitting || pristine}
      data-test-id="project-select-button"
      className={styles.button}
    >
      Select
    </Button>
  </Form>
);

export default reduxForm({
  form: "projectSelection"
})(ProjectList);
