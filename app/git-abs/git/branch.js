/**
 * Creates a branch with given branchName in the given Repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const create = repo => branchName => {
  console.log(repo.refreshIndex());
  return repo
    .getHeadCommit()
    .then(commit => repo.createBranch(branchName, commit, false));
};

/**
 * Checks out a branch with the given branchName in the given repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const checkOut = repo => branchName => {
  return repo
    .getBranch(branchName)
    .then(reference => repo.checkoutBranch(reference));
};

export default {
  create,
  checkOut
};
