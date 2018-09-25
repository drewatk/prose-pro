import React from 'react';
import ProjectListItem from './ProjectListItem';
import { Form, FormGroup, Label } from 'reactstrap';
const ProjectList = props => {
  const { projects } = props;
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="projectListLabel">Project List</Label>
        </FormGroup>
      </Form>
      <div>
        {projects.map((project, index) => {
          return <ProjectListItem project={project} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProjectList;
