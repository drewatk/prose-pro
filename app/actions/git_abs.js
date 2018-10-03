export const INIT_GIT_ABS = "INIT_GIT_ABS";

import { openProject } from "app/git-abs";

const initGitAbs = project => dispatch => {
  openProject(project)
    .then(git_abs => dispatch({ type: INIT_GIT_ABS, payload: git_abs }))
    .catch(err => console.error(err));
};

export default initGitAbs;
