import React from "react";
import ProjectList from "./ProjectList";
import NewProjectForm from "./NewProjectForm";

const ProjectSetup = () => {
  const projects = [
    { name: "project 1" },
    { name: "project 2" },
    { name: "project 3" }
  ];
  return (
    <div>
      <NewProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
};
export default ProjectSetup;
