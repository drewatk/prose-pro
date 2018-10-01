import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxMulti from "redux-multi";
import { createHashHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import rootReducer from "../reducers";

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = compose(applyMiddleware(router, thunk, reduxMulti));

function configureStore(initialState) {
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer
  );
}

export default { configureStore, history };
