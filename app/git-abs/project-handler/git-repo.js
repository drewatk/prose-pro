import utils from "app/git-abs/utils";
import path from "path";
import { projCons } from "app/git-abs/constants";
import { repository } from "app/git-abs/git";

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function create(projPath) {
  const repoPath = path.join(projPath, projCons.gitDir);

  await utils.createDirectory(repoPath);

  await repository.init(repoPath);
}

export default { create };
