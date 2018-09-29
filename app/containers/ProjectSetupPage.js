import React, { Component } from "react";
import ProjectSetup from "app/components/ProjectSetup";
import TitleBar from "app/components/TitleBar";

export default class ProjectSetupPage extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <ProjectSetup />
      </div>
    );
  }
}
