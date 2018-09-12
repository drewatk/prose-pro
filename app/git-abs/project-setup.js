import path from 'path';
import utils from './utils';
import { projectConstants } from './constants';

/**
 * Creates a project folder for the given project name
 * @param {String} projectName
 */
async function createProject(projectName) {
  const projectPath = projectName; // TODO get path from electron app thingy

  // check if project name can be used
  // create directory for project
  // initialize project

  utils
    .pathExists(projectPath)
    .then(() => utils.createDirectory(projectPath))
    .then(() => initProject(projectPath))
    .catch(err => Promise.reject(err));
}

/**
 * Initializes the project for the given project name
 * @param {String} projectName
 */
async function initProject(projectPath) {
  // create project.json
  // create git repo

  Promise.all([createProjectJSON(projectPath), createGitRepo(projectPath)])
    .then(() => Promise.resolve()) // Done to remove array return from promise all
    .catch(err => Promise.reject(err));
}

/**
 * Creates a project JSON for the given project name
 * @param {String} projectName
 */
async function createProjectJSON(projectPath) {
  // create file
  const filePath = path.join(projectPath, projectConstants.projectFile);

  // TODO: set up basic obj in project.json

  return utils.createFile(filePath);
}

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function createGitRepo(projectPath) {
  // create folder
  const repoPath = path.join(projectPath, projectConstants.projectRepo);

  // TODO: init git in repo folder.
  return utils.createFile(repoPath);
}

export default createProject;
