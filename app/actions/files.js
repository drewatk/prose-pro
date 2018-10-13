export const UPDATE_FILES = "UPDATE_FILES";

const updateFiles = files => ({
  type: UPDATE_FILES,
  payload: files
});

export default updateFiles;
