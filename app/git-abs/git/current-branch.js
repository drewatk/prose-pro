const getCurrentBranch = async repo => {
  const currentRef = await repo.getCurrentBranch();
  return currentRef.shortHand();
};

export default getCurrentBranch;
