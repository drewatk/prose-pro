import React from "react";
import { connect } from "react-redux";
import path from "path";
import { createProject } from "app/git-abs";

import TitleBar from "app/components/TitleBar";
import ProjectSelectionForm from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";

import projectSelect from "app/actions/project_selection";

const ProjectSetupPage = ({ projects, dispatch }) => (
  <div>
    <TitleBar />
    <NewProjectForm
      onSubmit={({ project }) => {
        // TODO: ensure the project name doesn't already exist.
        const projectPath = path.resolve("app/TestProjects/", project);
        createProject(projectPath)
          .then(() => dispatch(projectSelect(project)))
          .catch(err => console.error(err));
      }}
    />
    <ProjectSelectionForm
      projects={projects}
      onSubmit={({ project }) => dispatch(projectSelect(project))}
    />
  </div>
);

const mapStateToProps = ({ projects }) => ({ projects });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSetupPage);
