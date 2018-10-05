export const SELECT_FILE = "SELECT_FILE";

const fileSelect = (gitAbs, file) => dispatch => {
  /* TODO: SWITCH TO BRANCH FILE */
  // then
  gitAbs
    .openFile(file)
    .then(() => {
      dispatch({ type: SELECT_FILE, payload: file });
    })
    .catch(err => console.log(err));
};

export default fileSelect;
