import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Label } from "reactstrap";
import { Button } from "app/components/Basic";

const ProjectList = ({ projects, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="projectListLabel">Project List</Label>
    </FormGroup>
    <FormGroup>
      <Field name="woof" component="input" />
      <Field name="project" component="select">
        {projects.map((project, index) => {
          return (
            <option key={index} value={project.name}>
              {project.name}
            </option>
          );
        })}
      </Field>
    </FormGroup>

    <Button type="submit" text="Select" />
  </Form>
);

export default reduxForm({
  form: "projectSelection"
})(ProjectList);
