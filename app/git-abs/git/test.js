const nodegit = require('nodegit');
const path = require('path');

const init = repoPath => {
  const pathToRepo = path.resolve(repoPath);
  const isBare = 0; /* create .git subdirectory */

  return new Promise((resolve, reject) => {
    nodegit.Repository.init(pathToRepo, isBare)
      .then(() => {
        resolve();
      })
      .catch(err =>
        reject(`Error initialising repository in path: ${repoPath} \n ${err}`)
      );
  });
};

init('/Users/Luffy/Desktop/GitHub/fakeGit')
  .then(() => console.log('success'))
  .catch(err => console.log(err));
