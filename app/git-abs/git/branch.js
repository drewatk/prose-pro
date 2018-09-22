/**
 * Creates a branch with given branchName in the given Repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const create = repo => branchName => {
  return repo
    .getHeadCommit()
    .then(commit => repo.createBranch(branchName, commit, 0));
};

/**
 * Checks out a branch with the given branchName in the given repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const checkOut = repo => branchName => {
  return repo
    .getBranch(branchName)
    .then(reference => repo.checkOutRef(reference));
};

export default {
  create,
  checkOut
};
