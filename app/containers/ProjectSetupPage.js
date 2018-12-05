import React from "react";
import { connect } from "react-redux";
import { createProject } from "app/git-abs";

import TitleBar from "app/components/TitleBar";
import ProjectSelectionForm from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";
import ErrorModal from "app/components/ErrorModal";

import projectSelect from "app/actions/project_selection";
import { showError } from "app/actions/error";

import styles from "./ProjectSetupPage.scss";

const ProjectSetupPage = ({ projects, dispatch }) => (
  <ErrorModal>
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.formContainer}>
        <div className={styles.cont}>
          <h4>Create new project</h4>
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
        </div>
        <div className={styles.cont}>
          <h4>Select previous project</h4>
          <ProjectSelectionForm
            projects={projects}
            onSubmit={({ project }) => dispatch(projectSelect(project))}
          />
        </div>
      </div>
    </div>
  </ErrorModal>
);

const mapStateToProps = ({ projects }) => ({ projects });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSetupPage);
