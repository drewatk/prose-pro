import React from "react";
import { connect } from "react-redux";
import { createProject } from "app/git-abs";

import TitleBar from "app/components/TitleBar";
import ProjectSelectionForm from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";
import ErrorModal from "app/components/ErrorModal";

import projectSelect from "app/actions/project_selection";
import { showError } from "app/actions/error";

const ProjectSetupPage = ({ projects, dispatch }) => (
  <ErrorModal>
    <div>
      <TitleBar />
      <NewProjectForm
        onSubmit={({ project }) => {
          createProject(project)
            .then(() => dispatch(projectSelect(project)))
            .catch(err => {
              console.error(err);
              dispatch(showError(err.message));
            });
        }}
      />
      <ProjectSelectionForm
        projects={projects}
        onSubmit={({ project }) => dispatch(projectSelect(project))}
      />
    </div>
  </ErrorModal>
);

const mapStateToProps = ({ projects }) => ({ projects });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSetupPage);
