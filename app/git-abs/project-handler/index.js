import utils from "../utils";
import gitRepo from "./git-repo";
import projectJSON from "./project-json";
import EditFile from "../edit-file";
import getProjectPath from "../projectPath";

/**
 * Creates a project folder for the given project name
 * @param {String} projectName
 */
async function createProject(projName) {
  const projPath = getProjectPath(projName);

  if (utils.pathExist(projPath)) {
    throw new Error(`Project path already exists: ${projPath}`);
  }

  try {
    await utils.createDirectory(projPath);
    await Promise.all([projectJSON.create(projPath), gitRepo.create(projPath)]);

    // create text file in repo's master branch to handle edge case
    // where add and commit is done before switching branches.
    const editFile = new EditFile(projPath);
    await editFile.createFileJson({});
  } catch (e) {
    // clean up in case of error
    try {
      utils.removeDir(projPath);
    } catch (e) {
      // Do nothing
    }
    throw e;
  }
}

export default {
  createProject
};
