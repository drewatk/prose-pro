import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import editor from "./editor";
import view from "app/reducers/view";
import { clearFormOnSuccess } from "./helpers";

const rootReducer = combineReducers({
  editor,
  view,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
