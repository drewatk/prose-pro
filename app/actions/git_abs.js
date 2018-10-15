export const INIT_GIT_ABS = "INIT_GIT_ABS";

/* Initialize the git abstractions object in the store */
const initGitAbs = git_abs => ({ type: INIT_GIT_ABS, payload: git_abs });

export default initGitAbs;
