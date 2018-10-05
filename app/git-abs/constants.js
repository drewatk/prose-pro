const projCons = {
  metadataDir: "metadata",
  gitDir: "repo",
  projFile: "metadata.json",
  editFile: "text.json"
};

const gitCons = {
  GIT_CONFIG_PATH: "app/TestProjects/Project1/repo", // TEMPORARY FOLDER FOR STORING TEST REPO.
  AUTHOR: "Linus Torvalds",
  EMAIL: "therealtorvalds@gmail.com",
  HEAD_REF: "HEAD",
  MAX_LOG_SIZE: 200
};

export default { projCons, gitCons };
