import addAndCommit from "./add-and-commit";
import branch from "./branch";
import createInitialCommit from "./create-initial-commit";
import repository from "./repository";
import getCurrentBranch from "./current-branch";
import getLatestCommitTime from "app/git-abs/git/latest-time";
import reset from "./reset";

/**
 * A class that makes available all the git functions
 * Initializes the git functions with the given repositry to reduce redundancy
 */
class Git {
  constructor(repo) {
    this.repo = repo;

    this.branch = {
      create: branch.create(repo),
      remove: branch.remove(repo),
      checkOut: branch.checkOut(repo),
      checkOutCommit: branch.checkOutCommit(repo),
      checkOutMasterBranch: branch.checkOutMasterBranch(repo),
      isDetachedHead: branch.isDetachedHead(repo),
      getBranchList: branch.getBranchList(repo)
    };
  }

  addAndCommit = async commitMsg => {
    return await addAndCommit(this.repo, commitMsg);
  };

  get branch() {
    return this._branch;
  }

  set branch(obj) {
    return (this._branch = obj);
  }

  createInitialCommit = async () => {
    return await createInitialCommit(this.repo);
  };

  getCurrentBranch = async () => {
    return await getCurrentBranch(this.repo);
  };

  getLatestCommitTime = async branch => {
    return getLatestCommitTime(this.repo, branch);
  };

  reset = async (branchName, commitHash) => {
    return await reset(this.repo, branchName, commitHash);
  };
}

export default {
  Git,
  repository
};
