import React from "react";
import { Link } from "react-router-dom";
import routes from "app/constants/routes.json";
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
      <Link to={routes.EDITOR}>Go To Editor</Link>
      <NewProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
};

ProjectSetup.displayName = "ProjectSetup";

export default ProjectSetup;
