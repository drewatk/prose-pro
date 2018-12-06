import { Branch, Checkout, Reference } from "nodegit";

/**
 * Creates a branch with given branchName in the given Repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const create = repo => branchName => {
  return repo
    .getMasterCommit()
    .then(commit => Branch.create(repo, branchName, commit, false))
    .catch(e => {
      throw new Error(`git.branch.create: ${e}`);
    });
};

/**
 * Removes the given branch from the repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
const remove = repo => branchName => {
  return repo
    .getBranch(branchName)
    .then(ref => Branch.delete(ref))
    .catch(e => {
      throw new Error(`git.branch.remove: ${e}`);
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
    .then(reference => repo.checkoutBranch(reference))
    .catch(e => {
      throw new Error(`git.branch.checkOut: ${e}`);
    });
};

/**
 * Checks out a commit with the given commit hash in the given repo
 * @param {Repository (nodegit)} repo
 * @param {String} branchName
 */
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

/**
 * Checks out the master branch in the given repo
 * @param {Repository (nodegit)} repo
 */
const checkOutMasterBranch = repo => () => {
  return checkOut(repo)("master");
};

/**
 * Checks if the given repository is in a detatched head state
 * @param {Repository (nodegit)} repo
 */
const isDetachedHead = repo => () => {
  return repo.headDetached() ? true : false;
};

/**
 * Returns the list of branch names in the given repository
 * @param {Repository (nodegit)} repo
 */
const getBranchList = repo => async () => {
  const localRef = "refs/heads/";
  return repo
    .getReferenceNames(Reference.TYPE.LISTALL)
    .then(arr =>
      arr.reduce((acc, el) => {
        if (el.includes(localRef)) {
          acc.push(el.replace(localRef, ""));
        }
        return acc;
      }, [])
    )
    .catch(e => {
      throw new Error(`git.branch.getBranchList: ${e}`);
    });
};

export default {
  create,
  remove,
  checkOut,
  checkOutCommit,
  checkOutMasterBranch,
  isDetachedHead,
  getBranchList
};
