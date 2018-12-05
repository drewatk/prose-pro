import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "app/containers/Root";
import { configureStore, history } from "app/store/configureStore";
import "app/app.global.css";
import configureMenuActions from "app/store/configureMenuActions";

import styles from "./index.scss";

const store = configureStore();

configureMenuActions(store);

render(
  <AppContainer>
    <div className={styles.lightTheme}>
      <Root store={store} history={history} />
    </div>
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    render(
      <AppContainer className={styles.lightTheme}>
        <div className={styles.lightTheme}>
          <NextRoot store={store} history={history} />
        </div>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
