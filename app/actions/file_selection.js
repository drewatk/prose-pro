import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE } from "./editor";
export const SELECT_FILE = "SELECT_FILE";

const selectFile = (gitAbs, file) => dispatch => {
  gitAbs
    .openFile(file)
    .then(fileData =>
      dispatch([
        {
          type: SELECT_FILE,
          payload: file
        },
        {
          type: UPDATE_EDITOR_STATE,
          payload: EditorState.createWithContent(convertFromRaw(fileData))
        }
      ])
    )
    .catch(err => console.error("Error in file select action creator: ", err));
};

export default selectFile;
