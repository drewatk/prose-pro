import utils from "../utils";
import gitRepo from "./git-repo";
import projectJSON from "./project-json";
import EditFile from "../edit-file";

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

  // create text file in repo's master branch to handle edge case
  // where add and commit is done before switching branches.
  const editFile = new EditFile(projPath);
  await editFile.createFileJson();
}

export default {
  createProject
};
