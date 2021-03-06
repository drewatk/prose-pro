import React from "react";
import { Switch, Route, Redirect } from "react-router";
import routes from "./constants/routes.json";
import App from "./containers/App";
import EditorPage from "./containers/EditorPage";
import ProjectSetupPage from "./containers/ProjectSetupPage";

export default () => (
  <App>
    <Switch>
      <Route path={routes.PROJECT_SETUP} component={ProjectSetupPage} />
      <Route path={routes.EDITOR} component={EditorPage} />
      <Redirect from="/" to={routes.PROJECT_SETUP} />
    </Switch>
  </App>
);
