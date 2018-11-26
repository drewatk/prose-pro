import { Branch } from "nodegit";

const getCurrentBranch = async repo => {
  try {
    const currentRef = await repo.getCurrentBranch();
    const name = await Branch.name(currentRef);
    return name;
  } catch (e) {
    throw new Error(`git.getCurrentBranch: ${e}`);
  }
};

export default getCurrentBranch;
