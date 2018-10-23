import { EditorState, convertFromRaw } from "draft-js";
import { UPDATE_EDITOR_STATE } from "./editor";
import { UPDATE_HISTORY_STATE } from "./history";

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
    .then(({ versions }) =>
      dispatch({
        type: UPDATE_HISTORY_STATE,
        payload: versions.map(v => ({
          message: v.getVersionName(),
          commitHash: v.getCommitId(),
          date: v.getTimestamp()
        }))
      })
    )
    .catch(err => console.error("Error in file select action creator: ", err));
};

export default selectFile;
