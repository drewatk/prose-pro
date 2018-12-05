import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup } from "reactstrap";
import { Input } from "app/components/Basic";

import { required } from "./validators";

import styles from "./NewProjectForm.scss";

const NewProjectForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field
        data-test-id="project-name-field"
        name="project"
        placeholder="Project Name"
        component={Input}
        validate={[required]}
        type="text"
        className={styles.inputField}
      />
      <Button
        data-test-id="create-project-button"
        disabled={pristine || submitting}
        className={styles.button}
      >
        Create Project
      </Button>
    </FormGroup>
  </Form>
);

export default reduxForm({
  form: "newProjectForm"
})(NewProjectForm);
