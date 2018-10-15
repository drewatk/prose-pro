import React from "react";
import { connect } from "react-redux";
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
        createProject(project)
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
