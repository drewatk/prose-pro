import { SELECT_FILE } from "app/actions/file_selection";

/* Handles the currently selected file */
const currentFile = (state = null, { type, payload }) => {
  if (type === SELECT_FILE) {
    return payload;
  }
  return state;
};

export default currentFile;
