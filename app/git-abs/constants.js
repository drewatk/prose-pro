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
  AUTHOR: "Linus Torvalds",
  EMAIL: "therealtorvalds@gmail.com",
  HEAD_REF: "HEAD",
  MAX_LOG_SIZE: 200
};

const rootDir = path.join(app.getPath("userData"), "projects");
console.log("PROJECT PATHS -> ", rootDir);
export default { projCons, gitCons, rootDir };
