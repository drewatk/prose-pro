import nodegit from "nodegit";
import { gitCons } from "app/git-abs/constants";

const { AUTHOR, EMAIL, HEAD_REF } = gitCons;

/**
 * Creates an empty first commit to the HEAD_REF of the current branch
 * @param {Repository (nodegit)} repo
 */
const createInitialCommit = repo => {
  const author = nodegit.Signature.now(AUTHOR, EMAIL);
  const committer = nodegit.Signature.now(AUTHOR, EMAIL);

  return repo
    .refreshIndex()
    .then(index => index.writeTree())
    .then(oid =>
      repo.createCommit(HEAD_REF, author, committer, "initial commit", oid, [])
    )
    .catch(e => {
      throw new Error(`git.createInitialCommit: ${e}`);
    });
};

export default createInitialCommit;
