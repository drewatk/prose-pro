import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import editor from "app/reducers/editor";
import view from "app/reducers/view";
import currentProject from "app/reducers/current_project";
import currentFile from "app/reducers/current_file";
import projects from "app/reducers/projects";
import files from "app/reducers/files";
import checkpointHistory from "app/reducers/checkpoint_history";
import gitAbstractions from "app/reducers/git_abs";

import { clearFormOnSuccess } from "./helpers";

const rootReducer = combineReducers({
  editor,
  view,
  currentProject,
  currentFile,
  projects,
  files,
  checkpointHistory,
  gitAbstractions,
  form: formReducer.plugin({
    checkpoint: clearFormOnSuccess
  })
});

export default rootReducer;
