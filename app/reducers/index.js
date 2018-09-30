import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import editor from "app/reducers/editor";
import view from "app/reducers/view";
import currentProject from "app/reducers/current_project";
import projects from "app/reducers/projects";

import { clearFormOnSuccess } from "./helpers";

const rootReducer = combineReducers({
  editor,
  view,
  currentProject,
  projects,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
