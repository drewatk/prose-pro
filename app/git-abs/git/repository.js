import nodegit from "nodegit";
import path from "path";
import { projCons } from "app/git-abs/constants";
import createInitialCommit from "./create-initial-commit";

const { gitDir } = projCons;

/**
 * Creates a Repository (nodegit) object for the git repo in the given project
 * @param {String} projPath
 *
 */
const open = projPath => {
  return nodegit.Repository.open(path.resolve(projPath, gitDir));
};

/**
 * Initializes a git repo at the given path, and creates an initial commit
 * @param {String} repoPath
 */
const init = repoPath => {
  const pathToRepo = path.resolve(repoPath);
  const isBare = 0; /* create .git subdirectory */

  return new Promise(resolve => {
    nodegit.Repository.init(pathToRepo, isBare)
      .then(repo => createInitialCommit(repo))
      .then(() => resolve())
      .catch(err => {
        throw new Error(`git.repository.init for path: ${repoPath} \n ${err}`);
      });
  });
};

export default {
  open,
  init
};
