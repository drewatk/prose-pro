/**
 * Returns the time of the latest commit in the
 * given branch in he given repository
 * @param {Repository (nodegit)} repo
 * @param {Branch} branch
 */
const getLatestCommitTime = async (repo, branch) => {
  try {
    const commit = await repo.getBranchCommit(branch);
    return commit.date();
  } catch (e) {
    throw new Error(`git.getLatestCommitTime: ${e}`);
  }
};

export default getLatestCommitTime;
