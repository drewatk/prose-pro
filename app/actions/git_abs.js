export const INIT_GIT_ABS = "INIT_GIT_ABS";

import { openProject } from "app/git-abs";
import updateFiles from "app/actions/files";

const initGitAbs = project => dispatch => {
  openProject(project)
    .then(git_abs =>
      dispatch([
        { type: INIT_GIT_ABS, payload: git_abs },
        updateFiles(git_abs.getFiles())
      ])
    )
    .catch(err => console.error(err));
};

export default initGitAbs;
