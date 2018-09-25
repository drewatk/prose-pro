import utils from "../utils";
import gitRepo from "./git-repo";
import projectJSON from "./project-json";

/**
 * Creates a project folder for the given project name
 * @param {String} projectName
 */
async function createProject(projPath) {
  if (utils.pathExist(projPath)) {
    throw new Error(`Project path already exists: ${projPath}`);
  }

  await utils.createDirectory(projPath);

  await Promise.all([projectJSON.create(projPath), gitRepo.create(projPath)]);
}

export default {
  createProject
};
