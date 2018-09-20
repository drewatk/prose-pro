import utils from '../utils';
import gitRepo from './git-repo';
import projectJSON from './project-json';

/**
 * Creates a project folder for the given project name
 * @param {String} projectName
 */
async function createProject(projPath) {
  return utils
    .pathNotExist(projPath)
    .then(() => utils.createDirectory(projPath))
    .then(() =>
      Promise.all([projectJSON.create(projPath), gitRepo.create(projPath)])
    )
    .then(() => Promise.resolve())
    .catch(err => Promise.reject(err));
}

export default {
  createProject
};
