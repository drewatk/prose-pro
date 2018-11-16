const getLatestCommitTime = async (repo, branch) => {
  const commit = await repo.getBranchCommit(branch);
  return commit.date();
};

export default getLatestCommitTime;
