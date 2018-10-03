import branchName from "current-git-branch";

/**
 * Returns the branch name in the given repo path;
 * @param {String} repoPath
 */
const getCurrentBranch = repoPath => {
  const branch = branchName(repoPath);

  if (!branch) {
    throw new Error(`No branch found in path: ${repoPath}`);
  }

  return branch;
};

export default getCurrentBranch;
