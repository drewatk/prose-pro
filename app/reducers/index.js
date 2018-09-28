import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import editor from "./editor";
import { clearFormOnSuccess } from "./helpers";

const rootReducer = combineReducers({
  editor,
  router,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
