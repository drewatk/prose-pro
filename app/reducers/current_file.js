import { SELECT_FILE } from "app/actions/file_selection";

/* Handles the currently selected project */
const currentProject = (state = null, { type, payload }) => {
  if (type === SELECT_FILE) {
    return payload;
  }
  return state;
};

export default currentProject;
