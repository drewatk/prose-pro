import addAndCommit from "./add-and-commit";
import branch from "./branch";
import createInitialCommit from "./create-initial-commit";
import repository from "./repository";
import getCurrentBranch from "./current-branch";
import getLatestCommitTime from "app/git-abs/git/latest-time";
import reset from "./reset";

class Git {
  constructor(repo) {
    this.repo = repo;

    this.branch = {
      create: branch.create(repo),
      remove: branch.remove(repo),
      checkOut: branch.checkOut(repo),
      checkOutCommit: branch.checkOutCommit(repo),
      checkoutMasterBranch: branch.checkOutMasterBranch(repo),
      isDetachecHead: branch.isDetachedHead(repo),
      getBranchList: branch.getBranchList(repo)
    };
  }

  addAndCommit = async commitMsg => {
    return await addAndCommit(this.repo, commitMsg);
  };

  get branch() {
    return this.branch;
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
