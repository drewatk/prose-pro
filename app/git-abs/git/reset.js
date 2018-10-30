import { Commit, Reset, Oid, CheckoutOptions } from "nodegit";

/**
 * Performs a hard reset on the branchName inside the repo to the commitHash
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 * @param {String} commitHash
 */
const reset = (repo, branchName, commitHash) => {
  console.log(
    `reset is being called with ${repo} ${branchName} and ${commitHash}`
  );
  return Commit.lookup(repo, Oid.fromString(commitHash))
    .then(commit =>
      Reset.reset(
        repo,
        commit,
        Reset.TYPE.HARD,
        new CheckoutOptions(),
        branchName
      )
    )
    .catch(e => {
      console.log("error in commit lookup.");
      throw new Error(`Error in checkpoint reset ${e}`);
    });
};

export default reset;
