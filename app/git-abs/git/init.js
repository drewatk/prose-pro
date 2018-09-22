import nodegit from 'nodegit';
import path from 'path';

const init = repoPath => {
  const pathToRepo = path.resolve(repoPath);
  const isBare = 0; /* create .git subdirectory */

  return new Promise((resolve, reject) => {
    nodegit.Repository.init(pathToRepo, isBare)
      .then(() => {
        resolve();
      })
      .catch(reject(`Error initialising repository in path: ${repoPath}`));
  });
};

export default init;
