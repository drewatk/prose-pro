import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Label, Button } from "reactstrap";

import { required } from "./validators";

const ProjectList = ({ projects, handleSubmit, submitting, pristine }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="projectListLabel">Project List</Label>
    </FormGroup>
    <FormGroup>
      <Field
        name="project"
        component="select"
        validate={[required]}
        data-test-id="project-select-field"
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
    >
      Select
    </Button>
  </Form>
);

export default reduxForm({
  form: "projectSelection"
})(ProjectList);
