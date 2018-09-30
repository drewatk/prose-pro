import { SELECT_PROJECT } from "./action_types";

const projectSelect = project => ({
  type: SELECT_PROJECT,
  payload: project
});

export default projectSelect;
