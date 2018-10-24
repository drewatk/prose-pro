import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "app/containers/Root";
import { configureStore, history } from "app/store/configureStore";
import "app/app.global.css";
// import { openProject } from "./git-abs";

// const run = async () => {
//   const gitAbs = await openProject("p");

//   // await gitAbs.switchVersion("");
// };

// run()
//   .then(() => console.log("success"))
//   .catch(e => console.log(e));

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
