import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
export default class NewProjectForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="newProjectFormLabel">New Project Form</Label>
        </FormGroup>
        <FormGroup>
          <Label for="projectNameLabel">Project Name</Label>
          <Input placeholder="Name your project here" />
          <Button>Create Project</Button>
        </FormGroup>
      </Form>
    );
  }
}
