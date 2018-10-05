import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "app/containers/Root";
import { configureStore, history } from "app/store/configureStore";
import "app/app.global.css";
/*
import { createProject } from "app/git-abs"
createProject("app/TestProjects/Project1")
  .then(() => console.log("project created."))
  .catch(() => console.log('project not created')) */

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
