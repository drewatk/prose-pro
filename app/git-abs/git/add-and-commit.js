import nodegit from 'nodegit';
import path from 'path';

import { gitCons } from 'app/git-abs/constants';

const { GIT_CONFIG_PATH, AUTHOR, EMAIL, HEAD_REF } = gitCons;

/**
 * Adds changes made to a file to the index, stages them, and makes a commit with the provided message.
 * @param {String} fileName
 * @param {String} commitMessage
 *
 * @return {Promise} then(commitId), catch(error)
 */

/***
Usage Example:

addAndCommit('test.js')('this commit was brought to you by the folks inside prosepro.')
  .then((commitId) => console.log('Commit made: ', commitId))
  .catch(err => console.error('Received an error: ', err))

***/

const addAndCommit = filename => commitMessage => {
  return new Promise((resolve, reject) => {
    let index = null,
      oid = null,
      repo = null;

    nodegit.Repository.open(path.resolve(__dirname, GIT_CONFIG_PATH))
      .then(repoResult => {
        repo = repoResult;
        return repoResult.refreshIndex();
      })
      .then(indexResult => {
        index = indexResult;
      })
      .then(() => index.addByPath(filename))
      .then(() => index.write())
      .then(() => {
        // writes index into file tree, retuning the OID(SHA hash)
        return index.writeTree();
      })
      .then(oidResult => {
        oid = oidResult;
        return nodegit.Reference.nameToId(repo, HEAD_REF);
      })
      .then(head => repo.getCommit(head))
      .then(parent => {
        /* TODO: When should committer be different than author? */
        const author = nodegit.Signature.now(AUTHOR, EMAIL);
        const committer = nodegit.Signature.now(AUTHOR, EMAIL);

        return repo.createCommit(
          HEAD_REF,
          author,
          committer,
          commitMessage,
          oid,
          [parent]
        );
      })
      .then(commitId => resolve(commitId))
      .catch(err => {
        console.error('Error in addAndCommit:');
        reject(err);
      });
  });
};

export default addAndCommit;
