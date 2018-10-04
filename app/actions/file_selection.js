export const SELECT_FILE = "SELECT_FILE";

const fileSelect = file => dispatch => {
  /* TODO: SWITCH TO BRANCH FILE */
  // then
  dispatch({ type: SELECT_FILE, payload: file });
};

export default fileSelect;
