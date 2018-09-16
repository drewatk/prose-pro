import path from 'path';
import utils from './utils';
import { projCons } from './constants';
import ProjectConfig from './project-config';

/**
 * Creates a project folder for the given project name
 * @param {String} projectName
 */
async function createProject(projPath) {
  // check if project path exists
  // create directory for project
  // initialize project

  utils
    .pathExists(projPath)
    .then(() => utils.createDirectory(projPath))
    .then(() => initProject(projPath))
    .catch(err => Promise.reject(err));
}

/**
 * Initializes the project for the given project name
 * @param {String} projectName
 */
async function initProject(projPath) {
  // create project.json
  // create git repo

  Promise.all([createProjectJSON(projPath), createGitRepo(projPath)])
    .then(() => Promise.resolve()) // Done to remove array return from promise all
    .catch(err => Promise.reject(err));
}

/**
 * Creates a project JSON for the given project name
 * @param {String} projectName
 */
async function createProjectJSON(projPath) {
  // create file
  // init the config file

  const filePath = path.join(projPath, projCons.metadataDir, projCons.projFile);
  return utils
    .createFile(filePath)
    .then(() => ProjectConfig.initEmptyConfig(filePath));
}

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function createGitRepo(projPath) {
  // create folder
  const repoPath = path.join(projPath, projCons.gitDir);

  // TODO: init git in repo folder.
  return utils.createFile(repoPath);
}

export default createProject;
