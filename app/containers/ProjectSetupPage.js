import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import routes from "app/constants/routes.json";
import { createProject } from "app/git-abs";

import TitleBar from "app/components/TitleBar";
import ProjectSelectionForm from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";

import projectSelect from "app/actions/project_selection";
import initGitAbs from "app/actions/git_abs";

const ProjectSetupPage = ({ projects, dispatch }) => (
  <div>
    <TitleBar />
    <NewProjectForm
      onSubmit={({ project }) => {
        // TODO: ensure the project name doesn't already exist.
        createProject(project)
          .then(() =>
            dispatch([
              projectSelect(project),
              initGitAbs(project),
              push(routes.EDITOR)
            ])
          )
          .catch(err => console.error(err));
      }}
    />
    <ProjectSelectionForm
      projects={projects}
      onSubmit={({ project }) => {
        // TODO: find the best way to run each action in sequence if possible.
        dispatch([
          projectSelect(project),
          initGitAbs(project),
          push(routes.EDITOR)
        ]);
      }}
    />
  </div>
);

const mapStateToProps = ({ projects }) => ({ projects });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSetupPage);
