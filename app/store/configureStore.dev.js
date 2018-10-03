import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxMulti from "redux-multi";
import { createHashHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import * as editorActions from "../actions/editor";

const history = createHashHistory();

const configureStore = initialState => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Redux Multi Middleware
  middleware.push(reduxMulti);

  // Logging Middleware
  const logger = createLogger({
    level: "info",
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== "test") {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...editorActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept(
      "../reducers",
      () => store.replaceReducer(connectRouter(history, require("../reducers"))) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore, history };
