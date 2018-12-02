const getLatestCommitTime = async (repo, branch) => {
  try {
    const commit = await repo.getBranchCommit(branch);
    return commit.date();
  } catch (e) {
    throw new Error(`git.getLatestCommitTime: ${e}`);
  }
};

export default getLatestCommitTime;
