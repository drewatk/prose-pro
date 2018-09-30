import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Label, Button } from "reactstrap";

const ProjectList = ({ projects, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="projectListLabel">Project List</Label>
    </FormGroup>
    <FormGroup>
      <Field name="project" component="select">
        <option />
        {projects.map((project, index) => {
          return (
            <option key={index} value={project.name}>
              {project.name}
            </option>
          );
        })}
      </Field>
    </FormGroup>
    <Button type="submit" size="sm" color="secondary">
      Select
    </Button>
  </Form>
);

export default reduxForm({
  form: "projectSelection"
})(ProjectList);
