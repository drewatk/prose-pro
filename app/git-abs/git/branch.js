import { Branch, Checkout } from "nodegit";

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
  return repo
    .getBranch(branchName)
    .then(ref => Branch.delete(ref))
    .catch(e => {
      throw new Error(`Error in deleting branch ${e}`);
    });
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

const checkOutCommit = repo => commitHash => {
  return repo.getCommit(commitHash).then(commit =>
    Checkout.tree(repo, commit, {
      checkoutStrategy: Checkout.STRATEGY.SAFE
    }).then(() =>
      repo.setHeadDetached(
        commit,
        repo.defaultSignature,
        "Checkout: HEAD " + commit.id()
      )
    )
  );
};

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
