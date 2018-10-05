export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

export const loadFile = gitAbs => dispatch => {
  gitAbs
    .getFileObj()
    .then(obj => {
      dispatch({ type: UPDATE_EDITOR_STATE, payload: obj /* fileData */ });
    })
    .catch(err => console.log(err));
};
