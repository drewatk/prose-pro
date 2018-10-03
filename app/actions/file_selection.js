export const SELECT_FILE = "SELECT_FILE";

const fileSelect = file => ({
  type: SELECT_FILE,
  payload: file
});

export default fileSelect;
