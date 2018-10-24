import { Branch } from "nodegit";

const getCurrentBranch = async repo => {
  const currentRef = await repo.getCurrentBranch();
  const name = await Branch.name(currentRef);

  return name;
};

export default getCurrentBranch;
