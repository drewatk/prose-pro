import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { Input } from "app/components/Basic";

import { required } from "./validators";

const NewProjectForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit} id="new-project-form">
    <FormGroup>
      <Label for="newProjectFormLabel">New Project Form</Label>
    </FormGroup>
    <FormGroup>
      <Label for="projectNameLabel">Project Name</Label>
      <Field
        id="project-name-field"
        name="project"
        placeholder="Name your project"
        component={Input}
        validate={[required]}
        type="text"
      />
      <Button id="create-project-button" disabled={pristine || submitting}>
        Create Project
      </Button>
    </FormGroup>
  </Form>
);

export default reduxForm({
  form: "newProjectForm"
})(NewProjectForm);
