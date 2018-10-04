export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

export const loadFile = repo => dispatch => {
  /* TODO: grab file data formatted for Editors */
  // then ...
  console.log(repo);
  dispatch({ type: UPDATE_EDITOR_STATE, payload: "TEMP" /* fileData */ });
};
