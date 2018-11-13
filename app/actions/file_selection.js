import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE } from "./editor";
import updateHistory, { UPDATE_LAST_SAVED } from "./history";

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
    .then(() => gitAbs.getLatestTime(file))
    .then(time => dispatch({ type: UPDATE_LAST_SAVED, payload: time }))
    .catch(err => console.error("Error in file select action creator: ", err));
};

export const deSelectFile = () => {
  return [
    {
      type: SELECT_FILE,
      payload: null
    },
    {
      type: UPDATE_EDITOR_STATE,
      payload: EditorState.createEmpty()
    },
    updateHistory([]),
    { type: UPDATE_LAST_SAVED, payload: null }
  ];
};

export default selectFile;
