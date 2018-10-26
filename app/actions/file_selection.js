import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE } from "./editor";
import updateHistory from "./history";

export const SELECT_FILE = "SELECT_FILE";

const selectFile = (gitAbs, file) => dispatch => {
  gitAbs
    .openFile(file)
    .then(fileData => {
      dispatch([
        {
          type: SELECT_FILE,
          payload: file
        },
        {
          type: UPDATE_EDITOR_STATE,
          payload: EditorState.createWithContent(convertFromRaw(fileData))
        }
      ]);
      return gitAbs.getVersions(file);
    })
    .then(({ versions }) => dispatch(updateHistory(versions)))
    .catch(err => console.error("Error in file select action creator: ", err));
};

export const deSelectFile = () => {
  [
    {
      type: SELECT_FILE,
      payload: null
    },
    {
      type: UPDATE_EDITOR_STATE,
      payload: EditorState.createEmpty()
    },
    updateHistory([])
  ];
};

export default selectFile;
