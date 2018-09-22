import utils from '../utils';
import path from 'path';
import { projCons } from '../constants';
import { init } from '../git';

/**
 * Creates the git repo for the given project name
 * @param {String} projectName
 */
async function create(projPath) {
  const repoPath = path.join(projPath, projCons.gitDir);

  return new Promise((resolve, reject) => {
    utils
      .createDirectory(repoPath)
      .then(() => init(repoPath))
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

export default { create };
