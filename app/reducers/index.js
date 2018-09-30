import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import editor from "app/reducers/editor";
import view from "app/reducers/view";
import checkpointHistory from "app/reducers/checkpoint_history";

import { clearFormOnSuccess } from "./helpers";

const rootReducer = combineReducers({
  editor,
  view,
  checkpointHistory,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
