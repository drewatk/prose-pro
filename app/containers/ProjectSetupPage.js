import React from "react";
import TitleBar from "app/components/TitleBar";

import ProjectList from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";

const ProjectSetupPage = () => (
  <div>
    <TitleBar />
    <NewProjectForm />
    <ProjectList
      projects={[
        { name: "project 1" },
        { name: "project 2" },
        { name: "project 3" },
        { name: "project 4" }
      ]}
      onSubmit={values => console.log("ahhhhh", values)}
    />
  </div>
);

export default ProjectSetupPage;
