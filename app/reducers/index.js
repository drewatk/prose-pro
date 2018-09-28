import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import editor from "./editor";
import { FORM_SUBMIT_SUCCEEDED } from "app/actions/action_types";

/* Useful for clearing form data upon successful submitted. */
const clearFormOnSuccess = (state, action) => {
  switch (action.type) {
    case FORM_SUBMIT_SUCCEEDED:
      return undefined; // remove existing form state
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  editor,
  router,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
