import React from 'react';
const ProjectListItem = ({ project }) => {
  const { name } = project;
  return <div>{name}</div>;
};

export default ProjectListItem;
