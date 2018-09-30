import { SELECT_PROJECT } from "app/actions/action_types";

/* Handles the currently selected project */
const currentProject = (state = null, { type, payload }) => {
  if (type === SELECT_PROJECT) {
    return payload;
  }
  return state;
};

export default currentProject;
