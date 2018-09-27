import utils from "app/git-abs/utils";
import path from "path";
import { projCons } from "app/git-abs/constants";
import { init } from "app/git-abs/git";

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function create(projPath) {
  const repoPath = path.join(projPath, projCons.gitDir);

  return new Promise((resolve, reject) => {
    utils
      .createDirectory(repoPath)
      .then(() => init(repoPath))
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

export default { create };
