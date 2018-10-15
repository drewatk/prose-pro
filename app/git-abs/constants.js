import path from "path";
import electron from "electron";

const app = electron.remote.app;

const projCons = {
  metadataDir: "metadata",
  gitDir: "repo",
  projFile: "metadata.json",
  editFile: "text.json"
};

const gitCons = {
  GIT_CONFIG_PATH: "../../NodeGitTesting/my-git-repo/.git", // git path of local repo on Clayton's machine
  AUTHOR: "Linus Torvalds",
  EMAIL: "therealtorvalds@gmail.com",
  HEAD_REF: "HEAD",
  MAX_LOG_SIZE: 200
};

const rootDir = path.join(app.getPath("userData"), "projects");

export default { projCons, gitCons, rootDir };
