const getLatestCommitTime = repo => async branch => {
  const commit = await repo.getBranchCommit(branch);
  return commit.date();
};

export default getLatestCommitTime;
