import { INIT_GIT_ABS } from "app/actions/git_abs";

/* Handles the updates of our gitAbstractions for the current project. */
const gitAbs = (state = {}, { type, payload }) => {
  if (type === INIT_GIT_ABS) {
    return payload;
  }
  return state;
};

export default gitAbs;
