export const UPDATE_HISTORY_STATE = "UPDATE_HISTORY_STATE";
export const UPDATE_LAST_SAVED = "UPDATE_LAST_SAVED";

/**
  @param {Version[]} versions Version object defined in app/git-abs/metadata/file-object
**/
const updateHistory = versions => dispatch => {
  dispatch({
    type: UPDATE_HISTORY_STATE,
    payload: versions.map(v => ({
      message: v.getVersionName(),
      commitHash: v.getCommitId(),
      date: v.getTimestamp()
    }))
  });
};

export default updateHistory;
