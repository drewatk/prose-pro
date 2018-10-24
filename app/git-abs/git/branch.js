import { Branch } from "nodegit";

/**
 * Creates a branch with given branchName in the given Repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const create = repo => branchName => {
  return repo
    .getMasterCommit()
    .then(commit => Branch.create(repo, branchName, commit, false));
};

const remove = repo => branchName => {
  return repo.getBranch(branchName).then(ref => Branch.delete(ref));
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

/* eslint-disable */
const checkOutCommit = repo => commitHash => {
  //TODO
};
/* eslint-enable */

const checkOutMasterBranch = repo => {
  return checkOut(repo)("master");
};

const isDetachedHead = repo => {
  return repo.headDetached() ? true : false;
};

export default {
  create,
  remove,
  checkOut,
  checkOutCommit,
  checkOutMasterBranch,
  isDetachedHead
};
