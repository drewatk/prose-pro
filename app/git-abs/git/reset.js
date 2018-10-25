import { Commit, Reset, Oid, CheckoutOptions } from "nodegit";

/**
 * Performs a hard reset on the branchName inside the repo to the commitHash
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 * @param {String} commitHash
 */
const reset = repo => branchName => commitHash =>
  Commit.lookup(repo, Oid.fromString(commitHash))
    .then(commit =>
      Reset.reset(
        repo,
        commit,
        Reset.TYPE.HARD,
        new CheckoutOptions(),
        branchName
      )
    )
    .catch(err => console.error("Error in Commit.lookup: ", err));

export default reset;
