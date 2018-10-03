import { SELECT_PROJECT } from "app/actions/project_selection";

/* Handles the currently selected project */
const currentProject = (state = null, { type, payload }) => {
  if (type === SELECT_PROJECT) {
    return payload;
  }
  return state;
};

export default currentProject;
