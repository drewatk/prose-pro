import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
const ProjectList = props => {
  const { projects } = props;
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="projectListLabel">Project List</Label>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="selectMulti" id="projectSelect" multiple>
            {projects.map((project, index) => {
              return <option key={index}>{project.name}</option>;
            })}
          </Input>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ProjectList;
