export const INIT_GIT_ABS = "INIT_GIT_ABS";
export const LOAD_FILE_HISTORY = "LOAD_FILE_HISTORY";

import { openProject } from "app/git-abs";

const initGitAbs = project => dispatch => {
  console.log(project);
  openProject("app/TestProjects/Project1")
    .then(git_abs => dispatch({ type: INIT_GIT_ABS, payload: git_abs }))
    .catch(err => console.error("Error in initGitAbs action creator: ", err));
};

const loadFileHistory = (gitAbstractions, file) => dispatch => {
  gitAbstractions
    .getVersions(file)
    .then(commits => dispatch({ type: LOAD_FILE_HISTORY, payload: commits }))
    .catch(err => console.error("Error in loadFileHistory: ", err));
};

export { initGitAbs, loadFileHistory };
