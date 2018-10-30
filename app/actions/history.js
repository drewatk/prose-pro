export const UPDATE_HISTORY_STATE = "UPDATE_HISTORY_STATE";

/**
  @param {Version[]} versions Version object defined in app/git-abs/metadata/file-object
**/
const updateHistory = versions => dispatch => {
  dispatch({
    type: UPDATE_HISTORY_STATE,
    payload: versions.map(v => ({
      version: v.getVersionName(),
      commit: v.getCommitId(),
      timestamp: v.getTimestamp()
    }))
  });
};

export default updateHistory;
