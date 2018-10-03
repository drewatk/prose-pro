export const SELECT_PROJECT = "SELECT_PROJECT";

const projectSelect = project => ({
  type: SELECT_PROJECT,
  payload: project
});

export default projectSelect;
