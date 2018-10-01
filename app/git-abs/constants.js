const projCons = {
  metadataDir: "metadata",
  gitDir: "repo",
  projFile: "settings.json",
  editFile: "text.json"
};

const gitCons = {
  GIT_CONFIG_PATH: "../../NodeGitTesting/my-git-repo/.git", // git path of local repo on Clayton's machine
  AUTHOR: "Linus Torvalds",
  EMAIL: "therealtorvalds@gmail.com",
  HEAD_REF: "HEAD",
  MAX_LOG_SIZE: 200
};

export default { projCons, gitCons };
