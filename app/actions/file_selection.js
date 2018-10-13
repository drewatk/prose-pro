export const SELECT_FILE = "SELECT_FILE";

const selectFile = file => ({
  type: SELECT_FILE,
  payload: file
});

export default selectFile;
