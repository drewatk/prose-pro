import nodegit from 'nodegit';
import path from 'path';
import { gitCons } from 'app/git-abs/constants';

const { AUTHOR, EMAIL, HEAD_REF } = gitCons;

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

const createInitialCommit = repo => {
  const author = nodegit.Signature.now(AUTHOR, EMAIL);
  const committer = nodegit.Signature.now(AUTHOR, EMAIL);

  return repo
    .refreshIndex()
    .then(index => index.writeTree())
    .then(oid =>
      repo.createCommit(HEAD_REF, author, committer, 'initial commit', oid, [])
    );
};

export default init;
