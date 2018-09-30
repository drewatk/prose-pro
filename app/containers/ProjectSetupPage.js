import React from "react";
import { connect } from "react-redux";

import TitleBar from "app/components/TitleBar";
import ProjectSelectionForm from "app/components/Forms/ProjectSelectionForm";
import NewProjectForm from "app/components/Forms/NewProjectForm";

import projectSelect from "app/actions/project_selection";

const ProjectSetupPage = ({ projects, dispatch }) => (
  <div>
    <TitleBar />
    <NewProjectForm />
    <ProjectSelectionForm
      projects={projects}
      onSubmit={values => dispatch(projectSelect(values.project))}
    />
  </div>
);

const mapStateToProps = state => ({ projects: state.projects });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSetupPage);
