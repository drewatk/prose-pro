import nodegit from 'nodegit';
import path from 'path';
import createInitialCommit from './create-initial-commit';

/**
 * Initializes a git repo at the given path, and creates an initial commit
 * @param {String} repoPath
 */
const init = repoPath => {
  const pathToRepo = path.resolve(repoPath);
  const isBare = 0; /* create .git subdirectory */

  return new Promise((resolve, reject) => {
    nodegit.Repository.init(pathToRepo, isBare)
      .then(repo => createInitialCommit(repo))
      .then(() => resolve())
      .catch(err =>
        reject(`Error initialising repository in path: ${repoPath} \n ${err}`)
      );
  });
};

export default init;
