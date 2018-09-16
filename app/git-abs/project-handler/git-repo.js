import utils from '../utils';
import path from 'path';
import { projCons } from '../constants';

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function create(projPath) {
  const repoPath = path.join(projPath, projCons.gitDir);

  // create folder
  // TODO: init git in repo folder.
  return utils.createDirectory(repoPath);
}

export default { create };
